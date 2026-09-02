import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import { STATUS } from "./CheckoutStatus";

import checkingSubStatus from "../../../public/animations/B13caK2kl2.json";
import subCheckSuccess from "../../../public/animations/check.json"

const content = {
  [STATUS.CHECKING]: {
    animation: checkingSubStatus,
    title: "Confirming Payment...",
    message: "Please wait while we verify your subscription.",
    primaryHref: null,
    primaryText: null,
  },
  [STATUS.SUCCESS]: {
    animation: subCheckSuccess,
    title: "Payment Successful!",
    message: "Thank you for subscribing! A confirmation email has been sent to you.",
    primaryHref: "/",
    primaryText: "Go to Homepage",
  },
  [STATUS.FAILED]: {
    image: "/error.png",
    title: "Payment Not Verified",
    message: "We could not verify your subscription. If you were charged, please contact support.",
    primaryHref: "/pricing",
    primaryText: "Try Again",
  },
  [STATUS.MISSING]: {
    image: "/404.png",
    title: "Checkout Not Completed",
    message: "We could not find a completed checkout session for this visit.",
    primaryHref: "/pricing",
    primaryText: "Try Again",
  },
  [STATUS.CANCELLED]: {
    image: "/cancelled.jpg",
    title: "Checkout Cancelled",
    message: "Your subscription was not completed. You can try again whenever you are ready.",
    primaryHref: "/pricing",
    primaryText: "Try Again",
  },
};

export default function CheckoutResult({ status }) {
  const result = content[status] || content[STATUS.FAILED];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-8 text-center">
        {result.animation ? (
          <Lottie
            animationData={result.animation}
            loop={status==STATUS.CHECKING}
            className="w-48 h-48 mx-auto"
          />  
        ):(        
        <Image
          src={result.image}
          alt="Cancel image"
          width={150}
          height={150}
          className="mx-auto mb-4"
        />
      )} 

        <h1 className="text-2xl font-bold text-gray-800">
          {result.title}
        </h1>

        <p className="text-gray-400 mt-3 font-roboto font-thin text-sm">
          {result.message}
        </p>

        {result.primaryHref && (
          <Link
            href={result.primaryHref}
            className="inline-block mt-6 bg-indigo-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            {result.primaryText}
          </Link>
        )}
      </div>
    </div>
  );
}
