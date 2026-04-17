"use client";

import { useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import ServiceCard from "../components/ServiceCard";
import AuthModal from "../components/auth/AuthModal";
import { useSupabaseAuth } from "./hooks/useSupabaseSession"; // ← CHANGE THIS
import AuthController from "../components/AuthController"
import { useRequireAuth } from "./hooks/requireAuth";



export default function Home() {
  
  const dropdownRef = useRef(null);
  const { session, loading } = useSupabaseAuth(); // ← CHANGE THIS
  const router = useRouter()
  const { requireAuth } = useRequireAuth();

  console.log("SESSION:", session);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Add to both page components
useEffect(() => {
  const bodyBg = getComputedStyle(document.body).backgroundColor;
  const htmlBg = getComputedStyle(document.documentElement).backgroundColor;
  console.log('Page backgrounds:', { body: bodyBg, html: htmlBg });
}, []);


  const handleClick = () => {
    requireAuth(() => {
      router.push("/dashboard");
    });
  };
  

  if (loading) { // ← CHANGE THIS
    return (
      <button className="px-6 py-3 rounded-md bg-gray-400 text-white cursor-not-allowed">
        Loading…
      </button>
    )
  }

  const isSignedIn = !!session // ← This stays the same

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      <AuthController />

      <main>         
                
        {/* Center Banner Section */}

        <section className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Eco-compute
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your complete SaaS solution
          </p>
        </section>

        {/* Get Started Button — opens Auth Modal */}
        <div className="flex justify-center mt-0">
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-400 dark:hover:bg-blue-600 transition text-white font-shadows font-bold text-2xl px-6 py-3 rounded-xl"
          >
            {isSignedIn ? 'Go to Dashboard' : 'Get Started'}
          </button>
        </div>

        {/* Modal */}
        <AuthModal />

        {/* Services Section */}
        <section className="max-w-6xl mx-auto pt-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              title="CRM Solutions"
              description="Manage customers efficiently with our powerful CRM tools"
            />
            <ServiceCard
              title="Analytics"
              description="Get insights from your data with advanced analytics"
            />
            <ServiceCard
              title="Automation"
              description="Automate your workflows and save time"
            />
          </div>
        </section>               
      </main>
      
    </div>
  );
}

