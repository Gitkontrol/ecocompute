
const LAST_UPDATED = "Jun 14, 2025";
const SUPPORT_EMAIL = "support@ecocompute.tech";

export const metadata = {
  title: "Privacy Policy | Ecocompute",
  description: "How Ecocompute collects, uses, and protects personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-full bg-white text-slate-800">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8">
        {/* Main heading — centered */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm font-medium uppercase tracking-wide text-blue-600">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        {/* Intro */}
        <p className="mb-10 text-lg leading-8 text-slate-700">
          This Privacy Policy describes how Ecocompute, operated as a sole
          proprietorship in New Jersey, United States, collects, uses, shares,
          and protects personal information when you visit our website or use
          our online technology services.
        </p>

        <article className="space-y-10">
          <Section number="1" title="Information we collect">
            <P>
              <strong className="font-semibold text-slate-900">Account information:</strong>{" "}
              such as your name, email address, authentication details, and
              account identifiers.
            </P>
            <P>
              <strong className="font-semibold text-slate-900">
                Subscription and transaction information:
              </strong>{" "}
              such as the plan selected, subscription status, billing events,
              invoices, and payment status. Payment card details are generally
              processed by Stripe rather than stored directly by Ecocompute.
            </P>
            <P>
              <strong className="font-semibold text-slate-900">Service content:</strong>{" "}
              information or files you choose to upload, store, transmit, or
              process through a Service.
            </P>
            <P>
              <strong className="font-semibold text-slate-900">Communications:</strong>{" "}
              support requests and messages you send us, and records of
              transactional emails.
            </P>
            <P>
              <strong className="font-semibold text-slate-900">Technical information:</strong>{" "}
              information such as device/browser details, log data, IP address,
              security events, and basic usage information where collected by
              the website or its providers.
            </P>
            <P>
              The exact information collected depends on which Services and
              features you use. Do not submit sensitive personal information
              unless a Service specifically supports it and you have a lawful
              basis to do so.
            </P>
          </Section>

          <Section number="2" title="How we use information">
            <P>
              We may use information to create and manage accounts and authenticate
              users; provide, operate, maintain, and secure the Services; process
              subscriptions, payments, invoices, cancellations, and refunds; send account
              verification, security, billing, and service-related emails; respond to
              support requests and communicate important changes; detect fraud, abuse,
              security incidents, and violations of our Terms; meet legal obligations and
              establish, exercise, or defend legal claims; and understand and improve
              service reliability, where permitted.
            </P>
          </Section>

          <Section number="3" title="Service providers and sharing">
            <P>
              We may share information with service providers that help us
              operate Ecocompute, subject to appropriate contractual and security
              arrangements where required:
            </P>
            <P>
              <strong className="font-semibold text-slate-900">Supabase:</strong>{" "}
              authentication, account management, and database services.
            </P>
            <P>
              <strong className="font-semibold text-slate-900">Stripe:</strong>{" "}
              payment processing, checkout, subscriptions, and billing records.
            </P>
            <P>
              <strong className="font-semibold text-slate-900">Resend:</strong>{" "}
              delivery of transactional and account-related emails.
            </P>
            <P>
              <strong className="font-semibold text-slate-900">
                Hosting and infrastructure providers:
              </strong>{" "}
              to host, secure, and deliver the website and Services.
            </P>
            <P>
              We may also disclose information when reasonably necessary to
              comply with law, respond to valid legal process, protect rights or
              safety, investigate fraud or security issues, or support a business
              transfer. We do not sell personal information for money. If we use
              advertising, analytics, or other tracking services that trigger
              additional disclosure or consent requirements, we will update this
              Policy and provide required choices.
            </P>
          </Section>

          <Section number="4" title="Cookies and similar technologies">
            <P>
              The website and its providers may use essential cookies or similar
              technologies for authentication, session management, security, and
              core functionality. If non-essential analytics or advertising
              technologies are enabled, we will provide any notices and choices
              required by applicable law. You can also manage cookies through your
              browser, though disabling essential cookies may affect sign-in or
              other features.
            </P>
          </Section>

          <Section number="5" title="Retention">
            <P>
              We retain personal information for as long as reasonably necessary
              to provide the Services, maintain account and transaction records,
              resolve disputes, enforce agreements, meet legal obligations, and
              protect the Services. Retention periods vary by information type and
              purpose. When information is no longer needed, we will delete it or
              de-identify it where reasonably practicable, subject to lawful
              retention requirements and backup cycles.
            </P>
          </Section>

          <Section number="6" title="Security">
            <P>
              We use reasonable administrative, technical, and organizational
              measures designed to protect information. No system or transmission
              method is completely secure, and we cannot guarantee absolute
              security. You should use a strong, unique password and notify us
              promptly if you believe your account has been compromised.
            </P>
          </Section>

          <Section number="7" title="Your choices and privacy rights">
            <P>
              Depending on where you live and the laws that apply, you may have
              rights to request access to, correction of, deletion of, or a copy
              of certain personal information, or to object to or restrict certain
              processing. You may also be able to withdraw consent where
              processing relies on consent. To submit a request, contact{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-medium text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
              >
                {SUPPORT_EMAIL}
              </a>
              . We may need to verify your identity before responding. We will
              handle requests in accordance with applicable law.
            </P>
            <P>
              Marketing preferences, where applicable, can be changed using the
              instructions in the message. Transactional messages needed to
              operate your account or provide paid Services may still be sent.
            </P>
          </Section>

          <Section number="8" title="International processing">
            <P>
              Ecocompute is based in the United States, but our providers may
              process information in other countries. Where required, we will use
              appropriate safeguards for cross-border transfers.
            </P>
          </Section>

          <Section number="9" title="Children">
            <P>
              The Services are not directed to children under 13, and we do not
              knowingly collect personal information from children under 13
              without legally required authorization. If you believe a child has
              provided personal information to us, contact us so we can review and
              take appropriate action.
            </P>
          </Section>

          <Section number="10" title="Third-party services">
            <P>
              Links to third-party websites or integrations may be governed by
              those providers’ own privacy policies. We encourage you to review
              those policies. This Policy does not describe practices of third
              parties acting independently of Ecocompute.
            </P>
          </Section>

          <Section number="11" title="Changes to this Policy">
            <P>
              We may update this Policy as our Services or legal obligations
              change. We will revise the date above and provide notice of material
              changes where required.
            </P>
          </Section>

          <Section number="12" title="Contact">
            <P>
              Privacy questions or requests:{" "}
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

        {/* Footer accent */}
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