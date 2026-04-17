import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { Welcome } from "@/emails/WelcomeEmail";
import { Failed } from "@/emails/FailedEmail";
import { Canceled } from "@/emails/CanceledEmail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const email = session.customer_email;
        const planName = session.metadata?.toolName || "your Servana plan";
        const customerName = session.customer_details?.name;

        // Only send welcome email on the first successful payment
        if (session.mode === "subscription") {
          await resend.emails.send({
            from: "Servana <no-reply@servana.com>",
            to: email,
            subject: "🎉 Welcome to Servana!",
            react: <Welcome customerName={customerName} planName={planName} />,
          });
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const email = invoice.customer_email;
        const planName = invoice.lines?.data[0]?.description || "your Servana plan";

        await resend.emails.send({
          from: "Servana Billing <no-reply@servana.com>",
          to: email,
          subject: "⚠️ Payment Failed - Servana",
          react: <Failed customerName="" planName={planName} />,
        });
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object;
        const email = sub.customer_email || sub.metadata?.email;
        const planName = sub.metadata?.toolName || "your Servana plan";

        await resend.emails.send({
          from: "Servana <no-reply@servana.com>",
          to: email,
          subject: "Your Subscription Has Been Canceled",
          react: <Canceled customerName="" planName={planName} />,
        });
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return new NextResponse("Webhook handler error", { status: 500 });
  }
}
