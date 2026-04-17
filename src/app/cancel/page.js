'use client';
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-6">
      <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
        Payment Cancelled
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Your payment was cancelled. You can try again anytime.
      </p>

      <div className="space-x-4">
        <Link 
          href="/pricing"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Return to Pricing
        </Link>
        <Link 
          href="/"
          className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Back to Home
        </Link>

        <button
          onClick={async () => {
            const res = await fetch("/api/stripe/portal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerId: "cus_123456789", // <-- test using a customer from Stripe dashboard
            }),
          });

            const data = await res.json();
            if (data.url) {
              window.location.href = data.url;
            }
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Manage Billing
        </button>

      </div>
    </div>
  );
}
