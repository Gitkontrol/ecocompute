"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      }
    );

    if (error) {
      throw error;
    }

    setSent(true);
  } catch (error) {
    console.error("Password reset error:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-black to-zinc-900 px-4">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(16,185,129,0.15),transparent_45%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 shadow-2xl rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="text-indigo-400" />
            <h1 className="text-xl font-semibold text-white">Reset your password</h1>
          </div>

          {!sent ? (
            <>
              <p className="text-sm text-zinc-400 mb-6">
                Enter your email and we’ll send you a secure link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-zinc-400">Email address</label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-3 text-zinc-500" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium disabled:opacity-50"
                >
                  {loading ? "Sending link..." : "Send reset link"}
                </button>
              </form>

              <Link
                href="/"
                className="flex items-center justify-center gap-2 mt-6 text-sm text-zinc-400 hover:text-white"
              >
                <ArrowLeft size={16} />
                Back to login
              </Link>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-green-500/10">
                  <ShieldCheck className="text-green-400" />
                </div>
              </div>
              <h2 className="text-white text-lg font-semibold">Check your inbox</h2>
              <p className="text-sm text-zinc-400 mt-2">
                If an account exists for this email address,
                you'll receive a password reset link shortly.
              </p>

              <Link
                href="/"
                className="inline-flex items-center gap-2 mt-6 text-sm text-indigo-400 hover:text-indigo-300"
              >
                <ArrowLeft size={16} />
                Return to login
              </Link>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-zinc-600 mt-4">
          Secure reset powered by Eco authentication layer
        </p>
      </motion.div>
    </div>
  );
}
