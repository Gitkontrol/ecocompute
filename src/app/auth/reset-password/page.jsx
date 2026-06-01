"use client";

import { useState } from "react";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { getAuthErrorMessage } from "@/lib/auth/getErrorMsg";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      throw error;
    }

    setSuccess(true);
  } catch (err) {
    const errMsg = getAuthErrorMessage(err);
    setError(errMsg || "Password update failed.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-black">
      <div className="w-full max-w-md">
        
        {/* Card */}
        <div className="rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl p-8">
          
          {/* Header */}
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Reset your password
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Choose a strong password you haven’t used before.
          </p>

          {/* Success */}
          {success ? (
            <div className="text-green-700 text-sm">
              Password updated successfully. Please sign in.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              
              {/* Password */}
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  New password
                </label>
                <input
                  type={
                    showPassword? "text":"password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-lg px-3 py-2 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-12 translate-y-4 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Confirm password
                </label>
                <input
                  type={
                    showPassword? "text":"password"
                  }
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 w-full rounded-lg px-3 py-2 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-12 translate-y-4 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              

              {/* Error */}
              {error && (
                <div className="text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg py-2.5 font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}