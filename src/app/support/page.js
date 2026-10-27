
const LAST_UPDATED = "May 25, 2026";
const SUPPORT_EMAIL = "support@ecocompute.tech";

export const metadata = {
  title: "Billing, Cancellations & Support Policy | Ecocompute",
  description:
    "How to cancel Ecocompute subscriptions, request billing reviews, file complaints, and resolve account issues.",
};

export default function RefundsPage() {
  return (
    <main className="min-h-screen w-full bg-white text-slate-800">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8">
        {/* Main heading — centered */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Billing, Cancellations &amp; Support 
          </h1>
          <p className="mt-4 text-sm font-medium uppercase tracking-wide text-blue-600">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        {/* Intro */}
        <p className="mb-10 text-lg leading-8 text-slate-700">
          This Policy explains how to cancel an Ecocompute subscription, how we
          review refund and billing requests, and how we handle complaints and
          account-related issues. It should be read with our{" "}
          <a
            href="/terms"
            className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
          >
            Privacy Policy
          </a>
          .
        </p>

        <article className="space-y-10">
          <Section number="1" title="Free trial and first charge">
            <P>
              Where offered, the free trial lasts three (3) days. Unless the
              offer at checkout says otherwise, the subscription automatically
              converts to a paid weekly subscription when the trial ends if you
              have not canceled. The weekly amount and currency will be shown
              before you confirm the subscription. The first charge is made
              according to the billing schedule shown at checkout and in your
              subscription details.
            </P>
            <P>
              If you do not want to be charged, cancel before the trial ends.
              Because the exact trial end time can depend on when you
              subscribed, check the date and time shown in your account or
              confirmation messages rather than assuming the trial ends at
              midnight.
            </P>
          </Section>

          <Section number="2" title="How to cancel">
            <P>
              Use the subscription-management or cancellation option in your
              Ecocompute account, if available. If you cannot access it, email{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              from your account email and write “Subscription cancellation” in
              the subject. Include the name of the subscribed service. Do not
              email full payment card details.
            </P>
            <P>
              We will process cancellation requests promptly and in accordance
              with applicable law. Keep any on-screen or email confirmation for
              your records. Cancellation stops future renewals; unless the
              offer or applicable law says otherwise, paid access continues
              until the end of the current paid period. Canceling after a
              weekly renewal normally prevents the next renewal and does not
              automatically reverse a charge already made.
            </P>
          </Section>

          <Section number="3" title="Refund requests">
            <P>
              Subscription payments are not automatically refundable for unused
              time after a billing period begins. However, you may request a
              review if you believe you were charged in error, charged after
              cancellation, charged more than the amount disclosed at checkout,
              experienced a duplicate charge, or could not use a material part
              of the paid Service because of a significant issue attributable
              to Ecocompute.
            </P>
            <P>
              Send your request to{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
              >
                {SUPPORT_EMAIL}
              </a>
              . Include the account email, service name, transaction date,
              amount, and a short explanation. Please do not send full card
              numbers or security codes. We will review the available records
              and respond. Where we approve a refund, it will generally be
              returned to the original payment method through Stripe and may
              take additional time to appear depending on the payment provider
              and bank.
            </P>
            <P>
              This Policy does not waive or limit consumer rights or remedies
              that cannot legally be excluded. If applicable law requires a
              refund or other remedy, that law will apply.
            </P>
          </Section>

          <Section number="4" title="Billing disputes and unauthorized charges">
            <P>
              If you believe a charge was unauthorized, made without your
              consent, or resulted from a compromised account, contact us
              immediately at{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              with the account email, transaction date, and amount. Where
              appropriate, change your password and review your account
              activity. We may ask you to complete identity verification before
              we can discuss account or billing details. We will investigate
              and respond in accordance with applicable law.
            </P>
            <P>
              If you have already raised the issue with your bank or card
              issuer, please let us know so we can coordinate. Raising a charge
              dispute does not prevent you from contacting us, and contacting us
              does not prevent you from exercising any rights you have with your
              payment provider.
            </P>
          </Section>

          <Section number="5" title="Complaints">
            <P>
              If you are unhappy with the Services or how we have handled an
              issue, you may file a complaint by emailing{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              with “Complaint” in the subject line. Please describe the issue,
              include relevant dates and any reference numbers, and tell us what
              outcome you are seeking. Do not include full payment card details
              or sensitive personal information.
            </P>
            <P>
              We will acknowledge your complaint, review the available records,
              and respond within a reasonable time and in accordance with any
              timelines required by applicable law. We may ask for additional
              information to understand and resolve the issue. Filing a
              complaint does not limit any legal rights or remedies available to
              you.
            </P>
          </Section>

          <Section number="6" title="Account access and account issues">
            <P>
              If you cannot sign in, believe your account has been compromised,
              need to update account details, or want to request deletion of
              your account, contact{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              from the email address associated with your account where
              possible. We may need to verify your identity before making
              account changes. Account deletion requests are handled in
              accordance with our{" "}
              <a
                href="/privacy"
                className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
              >
                Privacy Policy
              </a>{" "}
              and applicable law, and some records may be retained where
              required for legal, tax, or security purposes.
            </P>
          </Section>

          <Section number="7" title="Service interruptions and account termination">
            <P>
              If Ecocompute suspends or terminates a paid Service, we will
              handle any unused prepaid period or refund eligibility in
              accordance with the Terms of Service and applicable law. No
              provision in this Policy guarantees a refund where the law does
              not require one. If a Service interruption affects your paid
              access, contact us so we can review the issue and any appropriate
              remedy.
            </P>
          </Section>

          <Section number="8" title="How to reach us and what to expect">
            <P>
              You can reach us for cancellations, refunds, billing disputes,
              complaints, and account issues at{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
              >
                {SUPPORT_EMAIL}
              </a>
              . To help us respond efficiently, use a clear subject line (for
              example, “Subscription cancellation,” “Refund request,”
              “Complaint,” or “Account access”), write from your account email
              where possible, and include relevant dates and reference numbers.
              We aim to respond within a reasonable time and within any
              timelines required by applicable law. Response times may vary
              depending on the complexity of the request and the volume of
              inquiries.
            </P>
          </Section>

          <Section number="9" title="Contact">
            <P>
              For any billing, cancellation, complaint, or account assistance,
              email{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </P>
          </Section>
        </article>

        <footer className="mt-16 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Ecocompute. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}

function Section({ number, title, children }) {
  return (
    <section>
      <h2 className="mb-4 text-left text-2xl font-bold tracking-tight text-slate-900">
        <span className="mr-2 text-blue-600">{number}.</span>
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function P({ children }) {
  return <p className="leading-7 text-slate-700">{children}</p>;
}