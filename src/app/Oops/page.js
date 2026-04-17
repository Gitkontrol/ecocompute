"use client";
import Link from "next/link";
import Image from "next/image";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-8 text-center">

        <Image
          src="/payment-failed.png"
          alt="Payment Canceled"
          width={200}
          height={200}
          className="mx-auto mb-4"
        />

        <h1 className="text-2xl font-bold text-gray-800">
          Oops! Something went wrong.
        </h1>

        <p className="text-gray-600 mt-5">
          Your payment was cancelled. No charges were made.
        </p>

        {/* BUTTON ROW */}
        <div className="flex justify-center mt-8 space-x-4">

          {/* Billing Portal */}
          <button
            onClick={async () => {
              const res = await fetch("/api/stripe/portal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  customerId: "cus_123456789", // test ID
                }),
              });

              const data = await res.json();
              if (data.url) {
                window.location.href = data.url;
              }
            }}
            className="px-5 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Manage Billing
          </button>

          {/* Pricing Page */}
          <Link
            href="/pricing"
            className="px-5 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Try Again
          </Link>
        </div>

        {/* Return to Pricing (separate from row) */}
        <Link
          href="/pricing"
          className="inline-block mt-6 text-blue-600 hover:underline font-medium"
        >
          Return to Pricing
        </Link>
      </div>
    </div>
  );
}
