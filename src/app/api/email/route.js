import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Welcome } from "../../../emails/WelcomeEmail";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ecocompute.tech";
const emailFrom =
  process.env.RESEND_FROM_EMAIL || "Ecocompute <noreply@ecocompute.tech>";

export async function POST(req) {
  try {
    const { email, userName, planName } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Missing recipient email" }, { status: 400 });
    }

    const html = await render(
      <Welcome userName={userName} planName={planName} siteUrl={siteUrl} />
    );

    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: `Welcome to Servana - ${planName || "Subscription"} Activated`,
      html,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
