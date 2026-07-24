"use client";

import { createContext, useContext, useState } from "react";

const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('auth');
  const [payload, setPayload] = useState(null);

  // open modal
  const openModal = (type='auth', data=null) => {
    console.log("OPEN MODAL CALLED");
    setOpen(true);
    setModalType(type);
    setPayload(data);
  };

  // close modal
  const closeModal = () => {
    setOpen(false);
    setModalType('auth');
    setPayload(null);

  };

  return (
    <AuthModalContext.Provider
      value={{
        open,
        openModal,
        closeModal,
        modalType,
        payload,
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