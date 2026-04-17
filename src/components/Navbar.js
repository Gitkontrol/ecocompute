'use client';
import Link from 'next/link';
import React, { useEffect, useState, } from 'react';
import Image from 'next/image';
import { useSupabaseAuth } from '../app/hooks/useSupabaseSession';


const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false); 
  const { session } = useSupabaseAuth();

  // const emailVerified = session?.user?.email_confirmed_at !== null


  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialDarkMode = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    setDarkMode(initialDarkMode);
    
    // Apply to document
    if (initialDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className="bg-white relative z-50 max-h-20 px-7 dark:bg-gray-900 dark:shadow-md dark:shadow-black shadow-md transition-colors duration-300">
      <div className="relative">
      <div className="w-full px-3 py-4 flex items-center">
        {/* LOGO */}
        <div className="logo-container flex items-center h-10 overflow-hidden">
          <Image
            src="/ecocompute-transparent.png"
            alt="ecocompute logo"
            width={140}
            height={20}
            className="object-contain logo"
          />
        </div>        
        <div className="flex justify-between ml-auto items-center space-x-4">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span className="h-5 w-px bg-gray-500 dark:bg-white/50" />

          <Link href="/services" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Services
          </Link>
          <span className="h-5 w-px bg-gray-500 dark:bg-white/50" />

          <Link href="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Pricing
          </Link>
          <span className="h-5 w-px bg-gray-500 dark:bg-white/50" />

          <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            About
          </Link>
          <span className="h-5 w-px bg-gray-500 dark:bg-white/50" />

          <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Contact
          </Link>

          <span className="h-5 w-px bg-gray-500 dark:bg-white/50" />
          
          
          <button
            onClick={toggleDarkMode}
            className="ml-4 px-3 py-1 transition-colors"
          >
            {darkMode ? (
              <Image 
                src="/light_mode.png"
                alt="light mode"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/dark_mode.png"
                alt='dark mode'
                width={15}
                height={15}
              />
            )}
          </button>            
        </div>

       
      </div>
     </div>     
      
    </nav>
  );
}

export default Navbar;