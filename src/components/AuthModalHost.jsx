"use client";

import { useAuthModal } from "./context/AuthModalContext";
import AuthModal from "./auth/AuthModal";

export default function AuthModalHost() {
  const { open, closeAuthModal } = useAuthModal();

  if (!open) return null;

  return <AuthModal onClose={closeAuthModal} />;
}


