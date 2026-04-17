'use client';
import { supabase } from '../../lib/supabaseClient'; // Import Supabase
import Image from "next/image"

export default function OAuthButtons() {  
  // Supabase OAuth login function

  const customScopes = 'email profile'
  const handleOAuthLogin = async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`, // Important!
          // You can also add scopes if needed
          scopes: customScopes,
        }
      });
      
      if (error) {
        console.error('OAuth error:', error);
        // Handle error (show toast, etc.)
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };


  return (
    <div className="w-full p-2 text-sm rounded-md dark:bg-transparent bg-transparent space-y-1 text-gray-800 transition">
      <button
        onClick={() => handleOAuthLogin("google")}
        className="w-full p-2 flex justify-around items-center rounded transition bg-white border dark:hover:bg-black dark:bg-black/10 dark:border-gray-700 dark:text-white hover:bg-gray-100 border-gray-300 text-black"
      >
        <Image
          src="/google.svg"
          alt="google logo"
          width={20}
          height={20}         
        />
        Continue with Google
        
      </button>

       <button
        onClick={() => handleOAuthLogin("azure")}
        className="w-full p-2 flex justify-around items-center rounded transition hover:bg-gray-100 dark:bg-blue-500 dark:hover:bg-blue-600 dark:border-gray-700 dark:text-white bg-white border border-gray-300 text-black"
      >
        <Image
          src="/microsoft-outlook.svg"
          alt="outlook logo"
          width={20}
          height={20}
         />
        Continue with Microsoft
        
      </button>

      <button
        onClick={() => handleOAuthLogin("github")}
        className="w-full p-2 flex justify-around items-center rounded border transition hover:bg-gray-100 dark: dark:border-gray-700 dark:hover:bg-gray-200 border-gray-300 bg-white text-black"
      >
         <Image
          src="/github.svg"
          alt="github logo"
          height={20}
          width={20}
        />
        Continue with GitHub
       
      </button>
    </div>
  );
}
