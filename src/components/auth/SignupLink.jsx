import Link from "next/link";


export default function SignupLink({ variant = "dropdown" }) {

  const linkStyles =
  variant === "dropdown"
    ? "text-gray-400 hover:underline mt-3"
    : "text-base hover:underline text-blue-700";
    

  return (
    <p className={`text-xs text-center text-gray-300 mt-3 ${linkStyles}`}>
        <Link href="/signup">Don’t have an account?{" "}</Link>
        <Link href="/signup" className={`text-blue-600 hover:underline${linkStyles}`}>
          Sign up →
        </Link>
    </p>

  );
}
