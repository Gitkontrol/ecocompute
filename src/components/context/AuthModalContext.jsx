"use client";
import { createContext, useContext, useState } from "react";

const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'auth' | 'verify'
    payload: null,
  });

  const openAuthModal = (payload = null) => {
    console.log("AUTH MODAL OPENED");
    setModalState({
      isOpen: true,
      type: "auth",
      payload,
    });
  };

  const openVerifyModal = (payload = null) => {
    console.log("VERIFY MODAL OPENED");
    setModalState({
      isOpen: true,
      type: "verify",
      payload,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      payload: null,
    });
  };

  return (
    <AuthModalContext.Provider
      value={{
        modalState,
        isOpen: modalState.isOpen,
        modalType: modalState.type,
        payload: modalState.payload,
        openAuthModal,
        openVerifyModal,
        closeModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export const useAuthModal = () => useContext(AuthModalContext);