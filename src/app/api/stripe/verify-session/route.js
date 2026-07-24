import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { STATUS } from "@/app/payment_success/CheckoutStatus"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

    // 1. Stripe Checkout Session
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
    const stripeCustomerId = checkoutSession.customer;
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

    // 2. Stripe Subscription
    const validSubscriptionStatuses = ["active", "trialing"];

    if (!validSubscriptionStatuses.includes(subscription.status)) {
      return NextResponse.json({
        status: STATUS.FAILED,
        message: `Subscription status is ${subscription.status}`,
      });
    }

    // 3. Supabase subscriptions table
    const { data: dbSubscription, error: dbError } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("stripe_customer_id", stripeCustomerId)
      .eq("stripe_subscription_id", subscription.id)
      .maybeSingle();

    if (dbError) {
      console.error("Supabase subscription lookup failed:", dbError);

      return NextResponse.json({
        status: STATUS.FAILED,
        message: "Database lookup failed",
        
      },
       { status: 500 } 
    );
  }

    if (!dbSubscription) {
      return NextResponse.json({
        status: STATUS.CHECKING,
        message: "waiting for webhook to finish.",
      });
    }

    // 4. Return success
    return NextResponse.json({
      status: STATUS.SUCCESS,      
      userId,
      customerId: stripeCustomerId,
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
    });
  } catch (error) {
    console.error("Verify session error:", error);

    return NextResponse.json({
        status: STATUS.CANCELLED,
        message: "Unable to verify checkout session",
      },
      { status: 500 }
    );
  }
}