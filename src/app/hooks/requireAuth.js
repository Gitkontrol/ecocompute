"use client";

import { useCallback } from "react";
import { useSupabaseAuth } from "./useSupabaseSession";
import { useAuthModal } from "../../components/context/AuthModalContext";

export function useRequireAuth() {
  const { session, loading } = useSupabaseAuth();
  const { openAuthModal } = useAuthModal();
  const user = session?.user;

 const requireAuth = useCallback(
  (callback) => {
    if (!user) {
      console.log("User not logged in, opening modal");
      openAuthModal();
      return;
    }

    if (user && typeof callback === "function") {
      callback(user);
    }
  },
  
  [user, openAuthModal]
  
);
console.log("SESSION:", session);
console.log("USER:", user);

  return { requireAuth, user, session, loading };
}
