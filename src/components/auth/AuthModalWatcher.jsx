"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuthModal } from "../context/AuthModalContext";

export function AuthModalWatcher() {
  const pathname = usePathname();
  const { closeModal } = useAuthModal();

  useEffect(() => {
    closeModal();
  }, [pathname]);

  return null;
}