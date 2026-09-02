import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { STATUS } from "@/app/payment_success/CheckoutStatus";
import { SERVICES } from "@/app/payment_success/Trials";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function getStripeId(value) {
  return typeof value === "string" ? value : value?.id;
}

function getPeriodDate(value) {
  return value ? new Date(value * 1000) : null;
}

async function upsertVerifiedSubscription({ userId, customerId, subscription }) {
  const item = subscription.items.data?.[0];

  if (!item?.price) {
    throw new Error(`Subscription ${subscription.id} has no price item`);
  }

  const serviceKey = subscription.metadata?.serviceKey || null;
  const productId = getStripeId(item.price.product);
  const product = productId ? await stripe.products.retrieve(productId) : null;

  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .upsert(
      {
        user_id: userId,
        stripe_customer_id: customerId,
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
      },
      {
        onConflict: "stripe_subscription_id",
      }
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({
        status: STATUS.MISSING,
        message: "Missing session_id",
      });
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    if (
      checkoutSession.mode !== "subscription" ||
      checkoutSession.payment_status !== "paid" ||
      checkoutSession.status !== "complete"
    ) {
      return NextResponse.json({
        status: STATUS.CANCELLED,
        message: "Checkout session is not complete",
      });
    }

    const userId = checkoutSession.client_reference_id;
    const stripeCustomerId = getStripeId(checkoutSession.customer);
    const subscription =
      typeof checkoutSession.subscription === "string"
        ? await stripe.subscriptions.retrieve(checkoutSession.subscription)
        : checkoutSession.subscription;

    if (!userId || !stripeCustomerId || !subscription) {
      return NextResponse.json({
        status: STATUS.MISSING,
        message: "Checkout session is missing required data",
      });
    }

    const validSubscriptionStatuses = ["active", "trialing"];

    if (!validSubscriptionStatuses.includes(subscription.status)) {
      return NextResponse.json({
        status: STATUS.FAILED,
        message: `Subscription status is ${subscription.status}`,
      });
    }

    const { data: dbSubscription, error: dbError } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("stripe_customer_id", stripeCustomerId)
      .eq("stripe_subscription_id", subscription.id)
      .maybeSingle();

    if (dbError) {
      console.error("Supabase subscription lookup failed:", dbError);

      return NextResponse.json(
        {
          status: STATUS.FAILED,
          message: "Database lookup failed",
        },
        { status: 500 }
      );
    }

    const verifiedSubscription =
      dbSubscription ||
      (await upsertVerifiedSubscription({
        userId,
        customerId: stripeCustomerId,
        subscription,
      }));

    return NextResponse.json({
      status: STATUS.SUCCESS,
      userId,
      customerId: stripeCustomerId,
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      serviceKey: verifiedSubscription.service_key,
      planType: verifiedSubscription.plan_type,
    });
  } catch (error) {
    console.error("Verify session error:", error);

    return NextResponse.json(
      {
        status: STATUS.FAILED,
        message: "Unable to verify checkout session",
      },
      { status: 500 }
    );
  }
}
