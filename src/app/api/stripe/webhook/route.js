import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { Welcome } from "@/emails/WelcomeEmail";
import { Failed } from "@/emails/FailedEmail";
import { Canceled } from "@/emails/CanceledEmail";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log(
  "SUPABASE_SERVICE_ROLE_KEY exists:",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY
);

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getUserByStripeCustomerId(db, customerId) {
  const { data, error } = await db
    .from("users")
    .select("*")
    .eq("stripe_customer_id", customerId)
    .single();

  if (error) return null;
  return data;
}

function getSubscriptionPriceId(subscription) {
  return subscription.items.data?.[0]?.price?.id || null;
}

function getStripeId(value) {
  return typeof value === "string" ? value : value?.id;
}

async function syncStripeSubscription(subscriptionId) {
  const stripeSubscriptionId = getStripeId(subscriptionId);
  if (!stripeSubscriptionId) return;

  const subscription =
    typeof subscriptionId === "string"
      ? await stripe.subscriptions.retrieve(stripeSubscriptionId)
      : subscriptionId;

  const user = await getUserByStripeCustomerId(db, subscription.customer);
  if (!user) {
    console.log(
      "No user found for Stripe customer:",
      subscription.customer
    );
    return;
  }

  await upsertSubscription(db, {
    user_id: user.id,
    stripe_customer_id: subscription.customer,
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    price_id: getSubscriptionPriceId(subscription),
    current_period_end: subscription.current_period_end,
  });

  return { user, subscription };
}

async function upsertSubscription(db, subscriptionData) {
  const { data: upsertedSubscription, error } = await db
    .from("subscriptions")
    .upsert(subscriptionData, {
      onConflict: "stripe_subscription_id",
    })
    .select()
    console.log("UPSERT RESULT:", upsertedSubscription)

  if (error) {
    console.error("UPSERT ERROR:", error);
    throw error;
  }
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

      // =========================
      // CHECKOUT COMPLETED
      // =========================
      case "checkout.session.completed": {
        const session = event.data.object;
        const result = await syncStripeSubscription(session.subscription);
        

        // Send welcome email using Resend
        if (result?.user) {
          await resend.emails.send({
            from: "Ecocompute <noreply@ecocompute.tech>",
            to: result.user.email,
            subject: "Welcome to our service!",
            react: <Welcome userName={result.user.full_name} />
          });
        }

        break;
      }

      // =========================
      // SUB CREATED / UPDATED (SOURCE OF TRUTH)
      // =========================
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object;
        await syncStripeSubscription(sub);

        break;
      }

      // =========================
      // SUB DELETED
      // =========================
      case "customer.subscription.deleted": {
        const sub = event.data.object;

        const user = await getUserByStripeCustomerId(db, sub.customer);
        if (!user) break;

        await upsertSubscription(db, {
          user_id: user.id,
          stripe_customer_id: sub.customer,
          stripe_subscription_id: sub.id,
          status: "canceled",
          price_id: sub.items.data?.[0]?.price?.id || null,
          current_period_end: sub.current_period_end,
        });

        // Send cancellation email      
      if (user) {
        await resend.emails.send({
          from: "Ecocompute <noreply@ecocompute.tech>",
          to: user.email,
          subject: "Your subscription has been canceled",
          react: <Canceled userName={user.full_name} />
        });
      }

        break;
      }

      // =========================
      // INVOICE PAID
      // =========================
      case "invoice.paid":
      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        await syncStripeSubscription(invoice.subscription);

        break;
      }

      // Stripe newer API versions can emit InvoicePayment events separately.
      case "invoice_payment.paid": {
        const invoicePayment = event.data.object;
        const invoiceId = getStripeId(invoicePayment.invoice);

        if (invoiceId) {
          const invoice = await stripe.invoices.retrieve(invoiceId);
          await syncStripeSubscription(invoice.subscription);
        }

        break;
      }

      case "invoice.payment_failed": {
      const failedInvoice = event.data.object;
      const failedUser = await getUserByStripeCustomerId(db, failedInvoice.customer);
      await syncStripeSubscription(failedInvoice.subscription);
      
      if (failedUser) {
        await resend.emails.send({
          from: "Ecocompute <noreply@ecocompute.tech>",
          to: failedUser.email,
          subject: "Payment failed",
          react: <Failed userName={failedUser.full_name} />
        });
      }
      break;
    }  

      // Customer creation is expected during Checkout setup. The customer ID
      // is saved in /api/stripe when the Checkout Session is created.
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
