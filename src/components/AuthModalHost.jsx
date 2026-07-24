"use client";

import { useAuthModal } from "./context/AuthModalContext";
import AuthModal from "./auth/AuthModal";

export default function AuthModalHost() {
  const { open, modalType, payload, closeModal } = useAuthModal();

  console.log("HOST OPEN:", open);

  if (!open) return null;

  if (modalType === "auth") {
    return (
      <AuthModal
        onClose={closeModal}
        payload={payload}
      />
    );
  }

  return null;
}