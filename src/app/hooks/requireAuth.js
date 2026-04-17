"use client";

import { useCallback } from "react";
import { useSupabaseAuth } from "./useSupabaseSession";
import { useAuthModal } from "../../components/context/AuthModalContext";

export function useRequireAuth() {
  const { user, loading } = useSupabaseAuth();
  const { openAuthModal } = useAuthModal();

 const requireAuth = useCallback(
  (callback) => {
    if (!user) {
      console.log("User not logged in, opening modal");
      openAuthModal();
      return;
    }

    if (typeof callback === "function") {
      callback(user);
    }
  },
  [user, openAuthModal]
);


  return { requireAuth, user, loading };
}
