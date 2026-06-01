'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'
import { Loader2 } from 'lucide-react';
import { PasswordInput } from '../RevealPassword';
import { getAuthErrorMessage } from '@/lib/auth/getErrorMsg';
import { useRouter } from 'next/navigation';
import { useAuthModal } from '../context/AuthModalContext';

export default function SignInForm({ onSuccess, variant = 'modal' }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [password, setPassword] = useState('');
  const version = variant;
  const router = useRouter();

  
  // const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMsg('');

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(getAuthErrorMessage(error));
    } else if (data?.session) {
      // Session hook will automatically update UI
      onSuccess?.(); // close modal/dropdown
    }
  }


   const inputStyles = variant === "modal"
    ? "dark:bg-gray-800 border-gray-600 dark:border-gray-600 text-white dark:text-white"
    : "bg-transparent border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white";

  

return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className={`p-2 text-sm rounded-md bg-transparent w-full border dark:bg-transparent dark:border-gray-700 border-gray-300 text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 ${inputStyles}`}

      />

      <PasswordInput        
        name= "password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}          
        variant={version}
      />

      {/* Error message */}
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
      


      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 text-sm rounded-md bg-blue-600 hover:bg-blue-500 text-white"
      >
        {loading ? <Loader2 className="animate-spin text-center" /> : "Sign In"}
      </button>
      {/* <button
        className='w-full p-2 text-sm rounded-md bg-blue-600 hover:bg-blue-500 text-white'
        onClick={() => {
          router.push('/signup');
          onSuccess?.();          
        }}
      >
        Create Account
      </button> */}
      <button
        type="button"
        onClick={() => router.push("/forgot-password")}
        className="flex w-full justify-end relative bottom-3 text-xs text-primary  hover:text-red-700 text-gray-500 font-sans"
      >
        Forgot Password?
      </button>
     
    </form>
  );
}


