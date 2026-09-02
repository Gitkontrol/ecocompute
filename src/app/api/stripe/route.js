// /app/api/stripe/route.js
// Create this file to handle checkout session creation using Stripe

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { SERVICES, ACTIVE_SUBSCRIPTION_STATUSES } from '@/app/payment_success/Trials'


// Initialize Stripe with your secret key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10"
});

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function getSubscribedService(subscription) {
  return SERVICES[subscription.service_key];
}

function isSameServiceGroup(subscription, service) {
  return getSubscribedService(subscription)?.group === service.group;
}

function hasActiveEntitlement(subscription) {
  const periodEnd = subscription.current_period_end
    ? new Date(subscription.current_period_end)
    : null;

  return (
    ACTIVE_SUBSCRIPTION_STATUSES.includes(subscription.status) ||
    (periodEnd && periodEnd.getTime() > Date.now())
  );
}

function canPurchase(service, subscriptions) {
  const entitledSubscriptions = subscriptions.filter(hasActiveEntitlement);

  const hasBundle = entitledSubscriptions.some(
    (sub) => sub.plan_type === "bundle" && isSameServiceGroup(sub, service)
  );

  const activeIndividuals = entitledSubscriptions.filter(
    (sub) => sub.plan_type === "individual" && isSameServiceGroup(sub, service)
  );

  if (hasBundle && service.type === "individual") {
    return {
      allowed: false,
      reason: "already_in_bundle",
      message: "This service is already included in your Business bundle.",
    };
  }

  if (
    service.type === "individual" &&
    activeIndividuals.some((sub) => sub.service_key === service.key)
  ) {
    return {
      allowed: false,
      reason: "already_subscribed",
      message: "You already have an active subscription for this service.",
    };
  }

  if (
    service.type === "individual" && activeIndividuals.length >= 2
  ) {
    return {
      allowed: false,
      reason: "bundle_required",
      message: "You already have multiple individual subscriptions. Please choose the bundle instead",
    };
  }

  if (
    service.type === "bundle" && activeIndividuals.length > 0
  ) {
    return {
      allowed: false,
      reason: "cancel_individuals_first",
      message: "Your individual subscriptions must fully end before you can buy this bundle."
    };
  }

  return { allowed: true };
}


export async function POST(request) {
  try {
    const body = await request.json();

    console.log("Incoming body:", body);

    const { priceId, userId, serviceKey } = body;
    const service = SERVICES[serviceKey]
      ? { ...SERVICES[serviceKey], key: serviceKey }
      : null;

    console.log(process.env.NEXT_PUBLIC_SITE_URL);
    console.log("priceId:", priceId);

    console.log({
      priceId,
      serviceKey,
      userId,
    });

    // rest of your logic...
    if (!service) {
      return NextResponse.json(
        { error: "Unknown service" },
        { status: 400 }
      );
    }

    const { data: user } = await db
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

    if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { data: subscriptions, error: subscriptionError } = await db
  .from("subscriptions")
  .select("service_key, plan_type, status, current_period_end")
  .eq("user_id", userId);

  if(subscriptionError) {
    throw subscriptionError;
  }

  const purchaseCheck = canPurchase(service, subscriptions || []);

  if(!purchaseCheck.allowed) {
    return NextResponse.json(
      {
        error: purchaseCheck.message,
        reason: purchaseCheck.reason,
      },
      { status: 409 }
    );
  }

  let customerId = user.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user.id,
      },
    });

  customerId = customer.id;

  const { error } = await db
  .from("users")
  .update({
    stripe_customer_id: customerId,
  })
  .eq("id", user.id);

  if (error) {
    throw new Error(
      `Failed to save Stripe customer ID: ${error.message}`
    );
  }
}


    // Create a checkout session
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL;

    const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId, // 🔥 THIS IS THE FIX
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    subscription_data: {
      trial_period_days: service.trialDays,
      metadata: {
        userId: user.id,
        serviceKey,
        planType: service.type,
      },
    },

   success_url: `${origin}/payment_success?type=checkout&session_id={CHECKOUT_SESSION_ID}`,
   cancel_url: `${origin}/cancel?type=checkout_cancelled`,

    client_reference_id: user.id,

    metadata: {
      userId: user.id,
      priceId,
      serviceKey,
      toolName: service.name || "",
      planType: service.type,
    },
  });
  console.log("Checkout URL:", session.url);


    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}

