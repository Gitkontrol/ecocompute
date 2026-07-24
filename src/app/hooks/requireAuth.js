"use client";

import { useCallback } from "react";
import { useSupabaseAuth } from "./useSupabaseSession";
import { useAuthModal } from "../../components/context/AuthModalContext";

export function useRequireAuth() {
  const { session, loading } = useSupabaseAuth();
  const { openModal } = useAuthModal();

  const user = session?.user;

  console.log("SESSION:", session);
  console.log("USER:", user);

  const requireAuth = useCallback(
    (callback, options = {}) => {
      if (loading) return;

      if (!user) {
        openModal("auth");
        return;
      }

      if (options.requireVerified && !user.email_confirmed_at) {
        openModal("verify");
        return;
      }

      if (typeof callback === "function") {
        callback(user);
      }
    },
    [user, loading, openModal]
  );

  return { requireAuth, user, session, loading };
}