import Image from "next/image";
import Link from "next/link"  

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-8 text-center">
        
        <Image
          src="/success.jpg"
          alt="Success"
          width={150}
          height={150}
          className="mx-auto mb-4"
        />

        <h1 className="text-2xl font-bold text-gray-800">
          Payment Successful! 
        </h1>

        <p className="text-gray-600 mt-3">
          Thank you for subscribing! A confirmation email has been sent to you.
        </p>

        <Link href="/">
          <button          
            className="inline-block mt-6 bg-indigo-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-indigo-700 transition"
          >                 
            Go to Homepage
          </button>
        </Link>

      </div>
    </div>
  );
}
