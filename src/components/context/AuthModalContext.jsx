"use client";

import { createContext, useContext, useState } from "react";

const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [open, setOpen] = useState(false);

  // open modal
  const openModal = () => setOpen(true);

  // close modal
  const closeModal = () => setOpen(false);

  return (
    <AuthModalContext.Provider
      value={{
        open,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error(
      "useAuthModal must be used within an AuthModalProvider"
    );
  }

  return context;
}