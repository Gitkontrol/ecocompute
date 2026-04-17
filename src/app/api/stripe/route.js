// /app/api/stripe/route.js
// Create this file to handle checkout session creation using Stripe

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10"
});

export async function POST(request) {
  try {
    const { priceId, email } = await request.json();

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email || undefined,
      billing_address_collection: 'auto',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        priceId,
        toolName: toolName || '',
        timeStamp: new Date().toISOString(),
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}

// --- Folder Structure Guide ---
// Place this file under:
//   /app/api/stripe/route.js
// This aligns with Next.js 13+ API routing using the App Router.

// --- How to Trigger Checkout ---
// Example button logic in your pricing page:
//
// const handleSubscribe = async (priceId) => {
//   const res = await fetch('/api/stripe', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ priceId, email: userEmail }),
//   });
//   const data = await res.json();
//   if (data.url) window.location.href = data.url;
// }
