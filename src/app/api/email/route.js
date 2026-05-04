import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Welcome } from "../../../emails/WelcomeEmail";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email, userName, planName } = await req.json();

    const html = render(<Welcome userName={userName} planName={planName} />);

    await resend.emails.send({
      from: "Servana <noreply@yourdomain.com>",
      to: email,
      subject: `Welcome to Servana — ${planName} Plan Activated`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
