import Link from "next/link";

const LAST_UPDATED = "September 22, 2025";
const SUPPORT_EMAIL = "support@ecocompute.tech";
const OPERATOR_NAME = "Ecocompute"; // Replace with the proprietor's legal name if required.

export const metadata = {
  title: "Terms of Service | Ecocompute",
  description: "Terms governing use of Ecocompute services and subscriptions.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen w-full bg-white text-slate-800">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8">
        {/* Main heading — centered */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm font-medium uppercase tracking-wide text-blue-600">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        {/* Intro */}
        <div className="mb-10 space-y-4">
          <p className="text-lg leading-8 text-slate-700">
            These Terms of Service (“Terms”) govern your access to and use of
            Ecocompute’s website, software, and related services (“Services”).
            The Services are operated under the Ecocompute business name by a
            sole proprietor based in New Jersey, United States (“Ecocompute,”
            “we,” “us,” or “our”).
          </p>
          <p className="text-lg leading-8 text-slate-700">
            By creating an account, starting a trial, purchasing a subscription,
            or using the Services, you agree to these Terms. If you do not agree,
            do not use the Services.
          </p>
        </div>

        <article className="space-y-10">
          <Section number="1" title="Eligibility and accounts">
            <P>
              You must be legally able to enter into a binding agreement to use
              the Services. You agree to provide accurate account information,
              keep your credentials secure, and promptly notify us if you
              suspect unauthorized access. You are responsible for activity
              under your account, except where applicable law provides
              otherwise.
            </P>
          </Section>

          <Section number="2" title="Services and changes">
            <P>
              Ecocompute provides online technology tools and services, which
              may include email hosting, communications, customer relationship
              management, project management, collaboration, data management
              and analytics, cloud storage, and security-related tools.
              Features, availability, and plan limits may change. We will handle
              material changes as required by applicable law and will not use
              this section to remove rights that the law gives you.
            </P>
          </Section>

          <Section number="3" title="Free trials and weekly subscriptions">
            <P>
              Where offered, a trial lasts three (3) days unless the checkout
              page clearly states a different period for a specific offer. You
              must review the offer shown at checkout before subscribing. At
              the end of the trial, your subscription will automatically begin
              paid weekly billing unless you cancel before the trial ends. The
              exact first charge date depends on the trial start time and the
              billing details shown during checkout.
            </P>
            <P>
              The weekly price, currency, applicable taxes, trial terms, and
              other material charges will be shown at checkout before you
              confirm your subscription. After the trial, you authorize
              Ecocompute and its payment processor, Stripe, to charge your
              selected payment method for the displayed weekly amount on a
              recurring basis until you cancel. We do not intend this clause to
              authorize charges that were not disclosed to you.
            </P>
            <P>
              If a particular plan does not include a trial, the checkout page
              will state the billing terms that apply to that plan. If the
              checkout terms conflict with a general description on this page,
              the specific offer presented to you at checkout controls for that
              transaction, subject to applicable law.
            </P>
          </Section>

          <Section number="4" title="Payments, taxes, and failed payments">
            <P>
              You authorize the recurring charges described at checkout. Prices
              may exclude taxes unless checkout says otherwise. You are
              responsible for taxes applicable to your purchase, except taxes
              based on our income. If a payment fails, we or Stripe may retry
              it or ask you to update your payment method. We may restrict paid
              features while an amount remains overdue, subject to applicable
              law and any notice required.
            </P>
            <P>
              We will give notice of material price changes before they take
              effect where required by law. A price change will not
              retroactively change a charge already completed.
            </P>
          </Section>

          <Section number="5" title="Cancellation">
            <P>
              You may cancel through the subscription-management option made
              available in your Ecocompute account or by contacting{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              if self-service cancellation is unavailable. Cancellation stops
              future renewals; unless the checkout page or applicable law says
              otherwise, access to paid features continues through the current
              paid billing period. To avoid a trial-ending charge, cancel
              before the trial ends. Please retain the cancellation
              confirmation for your records.
            </P>
            <P>
              We will process cancellation requests in accordance with
              applicable law. We will not require an unnecessary or
              unreasonable obstacle to canceling a subscription.
            </P>
          </Section>

          <Section number="6" title="Refunds">
            <P>
              Unless required by law or expressly stated in the offer,
              subscription charges are not automatically refundable merely
              because you cancel partway through a billing period. This does
              not limit any non-waivable rights you may have. If you believe
              you were charged in error, charged after cancellation, or
              experienced a material billing issue, contact{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              with the account email, charge date, and a brief explanation. We
              will review the request and respond.
            </P>
            <P>
              See our{" "}
              <a
                href="/refunds"
                className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
              >
                Refund &amp; Cancellation Policy
              </a>{" "}
              for more details.
            </P>
          </Section>

          <Section number="7" title="Acceptable use">
            <P>
              You may not use the Services to violate law or others’ rights,
              distribute malware, attempt unauthorized access, interfere with
              systems, send unlawful or unsolicited communications, infringe
              intellectual property, or disrupt other users. You must have the
              rights and permissions needed for data you upload or process. We
              may investigate suspected abuse and take proportionate action.
            </P>
          </Section>

          <Section number="8" title="Your content and data">
            <P>
              As between you and Ecocompute, you retain rights you hold in
              content you submit. You grant us permission to host, process,
              transmit, and display that content only as reasonably needed to
              provide, secure, maintain, and support the Services, and as
              otherwise described in our{" "}
              <a
                href="/privacy"
                className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
              >
                Privacy Policy
              </a>
              . You are responsible for maintaining appropriate backups of your
              content where the Services do not expressly provide backup
              guarantees.
            </P>
          </Section>

          <Section number="9" title="Third-party providers">
            <P>
              Some parts of the Services rely on third-party providers,
              including Stripe for payment processing, Supabase for
              authentication and database functionality, and Resend for
              transactional email. Their services may be subject to their own
              terms and privacy notices. Ecocompute does not control
              third-party services and is not responsible for their independent
              actions, except where applicable law provides otherwise.
            </P>
          </Section>

          <Section number="10" title="Intellectual property and feedback">
            <P>
              Ecocompute and its licensors retain rights in the Services,
              branding, and related materials, except for content and rights
              belonging to users or third parties. You may not copy, resell,
              reverse engineer, or misuse the Services except to the extent
              applicable law permits. If you provide suggestions, you permit us
              to use them without restriction or compensation, provided we do
              not thereby acquire ownership of your confidential information.
            </P>
          </Section>

          <Section number="11" title="Suspension and termination">
            <P>
              You may stop using the Services at any time and cancel
              subscriptions as described above. We may suspend or terminate
              access for material violations, security risks, nonpayment, or
              legal requirements. Where appropriate and legally permitted, we
              will provide notice and an opportunity to address the issue.
              Sections that by their nature should survive termination will
              survive.
            </P>
          </Section>

          <Section number="12" title="Disclaimers">
            <P>
              To the maximum extent permitted by law, the Services are provided
              “as is” and “as available,” without warranties not expressly made
              in writing. We do not guarantee uninterrupted or error-free
              operation, or that the Services will meet every particular
              requirement. Nothing in these Terms excludes a warranty or right
              that cannot lawfully be excluded.
            </P>
          </Section>

          <Section number="13" title="Limitation of liability">
            <P>
              To the maximum extent permitted by law, Ecocompute will not be
              liable for indirect, incidental, special, consequential,
              exemplary, or punitive damages, or loss of profits, revenue,
              data, or goodwill, arising from use of the Services. To the
              maximum extent permitted by law, Ecocompute’s aggregate liability
              for claims relating to the Services will not exceed the amount
              you paid to Ecocompute for the affected Service during the three
              months before the event giving rise to the claim. These
              limitations do not apply where prohibited by law, including
              liability that cannot legally be limited.
            </P>
          </Section>

          <Section number="14" title="Governing law and disputes">
            <P>
              These Terms are governed by the laws of the State of New Jersey,
              United States, without regard to conflict-of-law principles,
              except where mandatory law requires otherwise. Courts with
              jurisdiction in New Jersey will be the venue for disputes,
              subject to applicable law and any rights to bring a claim
              elsewhere that cannot be waived.
            </P>
          </Section>

          <Section number="15" title="Updates to these Terms">
            <P>
              We may update these Terms from time to time. We will update the
              date above and provide additional notice when required. Continued
              use after updated Terms take effect means you accept them to the
              extent permitted by law.
            </P>
          </Section>

          <Section number="16" title="Contact">
            <P>
              Questions about these Terms:{" "}
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