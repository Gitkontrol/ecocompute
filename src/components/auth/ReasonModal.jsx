"use client";

const REASON_CONFIG = {
  already_subscribed: {
    title: "Already Subscribed",
    message: "You already have an active subscription for this service.",
    actionText: "Close",
  },

  already_in_bundle: {
    title: "Included in Your Bundle",
    message:
      "This service is already included in your Business bundle.",
    actionText: "Close",
  },

  bundle_required: {
    title: "Bundle Required",
    message:
      "You already have multiple individual subscriptions. Please choose the Business bundle instead.",
    actionText: "View Bundle",
  },

  cancel_individuals_first: {
    title: "Individual Subscriptions Active",
    message:
      "Your individual subscriptions must fully end before you can purchase the Business bundle.",
    actionText: "Close",
  },
};

export default function ReasonModal({ reason, onClose, }) {
  if (!reason) return null;

  const config = REASON_CONFIG[reason];

  console.log("ReasonModal received reason:", reason);
console.log("ReasonModal config:", config); 

  if (!config) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
          {config.title}
        </h2>

        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
          {config.message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm"
          >
            Close
          </button>

          {reason === "bundle_required" && (
            <button
              onClick={onClose}
              className="rounded-lg bg-black px-4 py-2 text-sm text-white"
            >
              {config.actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}