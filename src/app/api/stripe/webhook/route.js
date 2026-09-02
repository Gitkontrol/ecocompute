import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { Welcome } from "@/emails/WelcomeEmail";
import { Failed } from "@/emails/FailedEmail";
import { Canceled } from "@/emails/CanceledEmail";
import { SERVICES } from "@/app/payment_success/Trials";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ecocompute.tech";
const emailFrom =
  process.env.RESEND_FROM_EMAIL || "Ecocompute <noreply@ecocompute.tech>";

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function getStripeId(value) {
  return typeof value === "string" ? value : value?.id;
}

function getPeriodDate(value) {
  return value ? new Date(value * 1000) : null;
}

async function getUserByStripeCustomerId(customerId) {
  const { data, error } = await db
    .from("users")
    .select("*")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (error) {
    console.error("User lookup failed:", error);
    return null;
  }

  return data;
}

async function upsertSubscription(subscriptionData) {
  const { data, error } = await db
    .from("subscriptions")
    .upsert(subscriptionData, {
      onConflict: "stripe_subscription_id",
    })
    .select();

  if (error) {
    console.error("UPSERT ERROR:", error);
    throw error;
  }

  console.log("UPSERT RESULT:", data);
  return data?.[0] || null;
}

async function subscriptionToRow(subscription) {
  const item = subscription.items.data?.[0];

  if (!item?.price) {
    throw new Error(`Subscription ${subscription.id} has no price item`);
  }

  const productId = getStripeId(item.price.product);
  const product = productId ? await stripe.products.retrieve(productId) : null;
  const serviceKey = subscription.metadata?.serviceKey || null;

  return {
    stripe_customer_id: getStripeId(subscription.customer),
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    stripe_product_id: product?.id || productId,
    product_name: product?.name || SERVICES[serviceKey]?.name || null,
    price_id: item.price.id || null,
    current_period_start: getPeriodDate(
      item.current_period_start || subscription.current_period_start
    ),
    current_period_end: getPeriodDate(
      item.current_period_end || subscription.current_period_end
    ),
    service_key: serviceKey,
    plan_type: subscription.metadata?.planType || SERVICES[serviceKey]?.type || null,
  };
}

async function syncStripeSubscription(subscriptionOrId) {
  const stripeSubscriptionId = getStripeId(subscriptionOrId);
  if (!stripeSubscriptionId) return null;

  const subscription =
    typeof subscriptionOrId === "string"
      ? await stripe.subscriptions.retrieve(stripeSubscriptionId)
      : subscriptionOrId;

  const customerId = getStripeId(subscription.customer);
  const user = await getUserByStripeCustomerId(customerId);

  if (!user) {
    console.log("No user found for Stripe customer:", customerId);
    return null;
  }

  const row = await subscriptionToRow(subscription);
  await upsertSubscription({
    ...row,
    user_id: user.id,
  });

  return { user, subscription, row };
}

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new NextResponse(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const result = await syncStripeSubscription(session.subscription);

        if (result?.user?.email) {
          const serviceName =
            SERVICES[result.row.service_key]?.name || result.row.product_name || "Subscription";
          const { data, error } = await resend.emails.send({
            from: emailFrom,
            to: result.user.email,
            subject: "Welcome to Servana",
            react: (
              <Welcome
                userName={result.user.full_name}
                planName={serviceName}
                siteUrl={siteUrl}
              />
            ),
          });

          console.log("RESEND DATA:", data);
          console.log("RESEND ERROR:", error);
        }

        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        await syncStripeSubscription(event.data.object);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object;
        const result = await syncStripeSubscription(sub);

        if (result?.user?.email) {
          await resend.emails.send({
            from: emailFrom,
            to: result.user.email,
            subject: "Your subscription has been canceled",
            react: <Canceled userName={result.user.full_name} />,
          });
        }

        break;
      }

      case "invoice.paid":
      case "invoice.payment_succeeded": {
        await syncStripeSubscription(event.data.object.subscription);
        break;
      }

      case "invoice_payment.paid": {
        const invoiceId = getStripeId(event.data.object.invoice);

        if (invoiceId) {
          const invoice = await stripe.invoices.retrieve(invoiceId);
          await syncStripeSubscription(invoice.subscription);
        }

        break;
      }

      case "invoice.payment_failed": {
        const failedInvoice = event.data.object;
        const failedUser = await getUserByStripeCustomerId(
          getStripeId(failedInvoice.customer)
        );

        await syncStripeSubscription(failedInvoice.subscription);

        if (failedUser?.email) {
          await resend.emails.send({
            from: emailFrom,
            to: failedUser.email,
            subject: "Payment failed",
            react: <Failed userName={failedUser.full_name} />,
          });
        }

        break;
      }

      case "customer.created":
      case "checkout.session.expired":
        break;

      default:
        console.log("Unhandled event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return new NextResponse("Webhook error", { status: 500 });
  }
}
