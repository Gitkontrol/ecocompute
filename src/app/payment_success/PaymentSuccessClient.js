"use client";
import { STATUS } from "@/app/payment_success/CheckoutStatus"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CheckoutResult from "./CheckoutResult";


export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState(STATUS.CHECKING);

  useEffect(() => {
    async function verifySession() {
      if (!sessionId) {
        setStatus(STATUS.MISSING);
        return;
      }

      try {
        const res = await fetch(
          `/api/stripe/verify-session?session_id=${encodeURIComponent(sessionId)}`
        );

        const data = await res.json();

        setStatus(data.status);

        if(data.status === STATUS.CHECKING) {
          setTimeout(verifySession, 1500);
        }
        
      } catch (error) {

        console.error("Session verification failed:", error);
        setStatus(STATUS.FAILED);
      }
    }

    verifySession();
  }, [sessionId]);

  return <CheckoutResult status={status} />;
}