'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Portal } from '../PortalWrapper'
import SignIn from './SignInForm'
import AuthButtons from './OAuthButtons'
import Signup from './SignupLink'

export default function AuthModal({ variant = "modal", onClose }) {
  
  const inputStyles = variant === "modal"
    ? "dark:bg-gray-800 border-gray-600 dark:border-gray-600 text-white dark:text-white"
    : "bg-transparent border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white";

  return (
    <AnimatePresence>
      
        <Portal>
          {/* ROOT */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* CLICK CATCHER */}
            <div
              className="absolute inset-0"
              onClick={onClose}
            />

            {/* MODAL */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-xl bg-[#0b0b0b] border border-neutral-800 shadow-2xl p-6 text-white"
            >
              {/* CLOSE */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                ✕
              </button>

              {/* HEADER (luminous, NOT container glow) */}
              <div className="relative mb-6 text-center">
                <div className="absolute inset-0 blur-xl bg-white/10 rounded-lg" />
                <h2 className="relative text-xl font-semibold">
                  Welcome Back
                </h2>
              </div>

              {/* FORM */}
              <div className="space-y-4">
                {/* EMAIL */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-md bg-transparent pointer-events-none" />
                  <SignIn onSuccess={onClose} />
                </div>

                {/* DIVIDER */}
                <div className="relative flex items-center my-4">
                  <div className="flex-grow border-t border-neutral-700" />
                  <span className="mx-3 text-xs text-neutral-400">or</span>
                  <div className="flex-grow border-t border-neutral-700" />
                </div>

                {/* OAUTH */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-lg bg-white/5 blur-sm pointer-events-none" />
                  <AuthButtons />
                </div>
              </div>

              {/* SIGNUP
              <div className="mt-6 text-center">
                <Signup />
              </div> */}
            </motion.div>
          </motion.div>
        </Portal>      
    </AnimatePresence>
  )
}












































































