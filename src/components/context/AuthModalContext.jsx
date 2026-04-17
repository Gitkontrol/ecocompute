"use client";
import { createContext, useContext, useState } from "react";


const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <AuthModalContext.Provider
      value={{
        open,
        openAuthModal: () =>{console.log("AUTH MODAL OPENED"); setOpen(true)},
        closeAuthModal: () => setOpen(false),
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export const useAuthModal = () => useContext(AuthModalContext);