'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Portal } from '../PortalWrapper'
import SignIn from './SignInForm'
import AuthButtons from './OAuthButtons'
import Signup from './SignupLink'

export default function AuthModal({ variant = "modal" }) {
  
  const inputStyles = variant === "modal"
    ? "dark:bg-gray-800 border-gray-600 dark:border-gray-600 text-white dark:text-white"
    : "bg-transparent border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white";

  return (
    <AnimatePresence>
      {open && (
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
              onClick={closeAuthModal}
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
                onClick={closeAuthModal}
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
                  <SignIn onSuccess={closeAuthModal} />
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
      )}
    </AnimatePresence>
  )
}












































































// 'use client';
// import { motion, AnimatePresence } from "framer-motion";
// import SignIn from "./SignInForm";
// import AuthButtons from "./OAuthButtons";
// import Signup from "./SignupLink";
// import { useAuthModal } from "../context/AuthModalContext";
// import { Portal } from "../PortalWrapper";

// export default function AuthModal() {
//   const { open, closeAuthModal } = useAuthModal();

//   return (
//     <AnimatePresence>
//       {open && (
//         <Portal>
//           <motion.div
//             key="auth-modal-root"
//             className="fixed inset-0 z-[9999] flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             {/* MODAL */}
//             <motion.div
//               key="auth-modal"
//               initial={{ scale: 0.92, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.92, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 280, damping: 24 }}
//               onClick={(e) => e.stopPropagation()}
//               className="relative w-full max-w-sm rounded-xl border border-neutral-800 backdrop-blur-xl shadow-2xl overflow-hidden"
//             >
//               {/* GLASS LAYERS */}
//               <div className="absolute inset-0 bg-black" />

//               <div
//                 className="absolute inset-0 opacity-25 pointer-events-none"
//                 style={{
//                   background:
//                     "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 55%)",
//                 }}
//               />

//               {/* OPTIONAL GRAIN (comment out if you don’t want it) */}
//               <div
//                 className="absolute inset-0 opacity-[0.08] pointer-events-none"
//                 style={{
//                   backgroundImage:
//                     "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22 viewBox=%220 0 120 120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.4%22/%3E%3C/svg%3E')",
//                 }}
//               />

//               {/* CONTENT */}
//               <div className="relative p-6 text-white">
//                 {/* CLOSE */}
//                 <button
//                   onClick={closeAuthModal}
//                   className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
//                   aria-label="Close modal"
//                 >
//                   ✕
//                 </button>

//                 <h2 className="text-xl font-semibold text-center mb-4">
//                   Welcome Back
//                 </h2>

//                 <div className="space-y-4">
//                   <SignIn onSuccess={closeAuthModal} variant="modal" />

//                   <div className="flex items-center gap-3">
//                     <div className="flex-grow border-t border-neutral-700" />
//                     <span className="text-xs text-neutral-400">or</span>
//                     <div className="flex-grow border-t border-neutral-700" />
//                   </div>

//                   <AuthButtons />
//                 </div>

//                 <Signup variant="modal" />
//               </div>
//             </motion.div>
//           </motion.div>
//         </Portal>
//       )}
//     </AnimatePresence>
//   );
// }
