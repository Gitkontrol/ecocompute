// /app/api/stripe/route.js
// Create this file to handle checkout session creation using Stripe

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';


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

export async function POST(request) {
  try {
    const body = await request.json();

    console.log("Incoming body:", body);

    const { priceId, userId, toolName } = body;
    console.log(process.env.NEXT_PUBLIC_SITE_URL);
    console.log("priceId:", priceId);

    console.log({
      priceId,
      userId,
      toolName,
    });

    // rest of your logic...

    const { data: user } = await db
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

    if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
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

   success_url: `${origin}/payment_success?type=checkout&session_id={CHECKOUT_SESSION_ID}`,
   cancel_url: `${origin}/cancel?type=checkout_cancelled`,

    client_reference_id: user.id,

    metadata: {
      userId: user.id,
      priceId,
      toolName: toolName || "",
    },
  });
  console.log("Checkout URL:", session.url);

   
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}

