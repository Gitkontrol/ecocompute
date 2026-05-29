"use client";

import { useCallback } from "react";
import { useSupabaseAuth } from "./useSupabaseSession";
import { useAuthModal } from "../../components/context/AuthModalContext";

export function useRequireAuth() {
  const { session, loading } = useSupabaseAuth();
  const { openAuthModal } = useAuthModal();
  const user = session?.user;
  

 const requireAuth = useCallback(
   (callback, options = {}) => {
    if (!user) {
      openAuthModal();
      return;
    }

    if (options.requireVerified && !user.email_confirmed_at) {
      openVerifyModal();
      return;
    }

    if (typeof callback === "function") {
      callback(user);
    }
  },
  [user, openAuthModal]
  
);
console.log("SESSION:", session);
console.log("USER:", user);

  return { requireAuth, user, session, loading };
}
