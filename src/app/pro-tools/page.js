'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRequireAuth } from '../hooks/requireAuth';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Import your local Lottie JSON files for Pro tools
import cloudStorageAnimation from '../../../public/animations/Cloud Computing.json';
import dataAnalyticsAnimation from '../../../public/animations/Analytics Character Animation.json';
import securityAnimation from '../../../public/animations/Security Lock - Privacy.json';
import { supabase } from '@/lib/supabaseClient';



export default function ProTools() {
const [user, setUser] = useState(null);
const [isLoading, setIsLoading] = useState(false);

useEffect(() =>{
  const getUser = async ()=>{
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  getUser();

  const{ data: { subscription }} = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user || null);
  });

  return () => subscription.unsubscribe();
}, [])

const startCheckout = async ( priceId, toolName ) => {
  if (isLoading) return;

  setIsLoading(true);

   try {
    const res = await fetch('/api/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, toolName }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe Checkout
    } else {
      console.error('No URL returned from Stripe');
      setIsLoading(false);
    }
  } catch (error) {
    console.error('Subscription error:', error);
    setIsLoading(false);
  }
 };

 const handleCheckout = async (priceId, toolName) => {
  setPendingCheckout({priceId, toolName})

  if(!user) {
    setAuthModalOpen(true);
    return;
  }

  if(!user.email_confirmed_at) {
    setVerifyModalOpen(true);
    return;
  }

  startCheckout(priceId, toolName);
};

  const [expandedSection, setExpandedSection] = useState(null);
  const { requireAuth } = useRequireAuth();

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const tools = [
    {
      title: "Cloud Storage",
      animationData: cloudStorageAnimation,
      monthlyPrice: "$15",
      description: "Secure and scalable cloud storage with advanced file management.",
      priceId: "price_1QWCloud123",
      features: [
        "1TB secure cloud storage",
        "Advanced file versioning",
        "Real-time collaboration",
        "Automated backups",
        "Cross-platform sync"
      ]
    },
    {
      title: "Data Analytics",
      animationData: dataAnalyticsAnimation,
      monthlyPrice: "$20",
      description: "Advanced data analytics and business intelligence dashboards.",
      priceId: "price_1QWCloud123",
      features: [
        "Customizable dashbonards",
        "Real-time data processing",
        "Predictive analytics",
        "Data visualization tools",
        "Export to multiple formats"
      ]
    },
    {
      title: "Enhanced Security",
      animationData: securityAnimation,
      monthlyPrice: "$14",
      description: "Enterprise-grade security features to protect your business data.",
      priceId: "price_1QWCloud123",
      features: [
        "Advanced threat detection",
        "Multi-factor authentication",
        "Data encryption at rest",
        "Compliance monitoring",
        "Security audit logs"
      ]
    }
  ];
  const paymentsEnabled = false;
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/pricing" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Pricing
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4">
            Pro Tools Package
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            $49/month - Individual tools also available
          </p>
        </div>
      </div>

      {/* Tools Sections */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {tools.map((tool, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg"
            >
              {/* Clickable Header - NO ICONS */}
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-6 group text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750 rounded-xl transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:dark:text-blue-600">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {tool.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {tool.monthlyPrice}/mo
                  </span>
                  <div className={`transform transition-transform ${expandedSection   === index ? 'rotate-180' : ''}`}>
                    ▼
                  </div>
                </div>
              </button>

              {/* Expandable Content - WITH ANIMATIONS */}
              {expandedSection === index && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-6 items-end">
                  <div className="flex flex-col lg:flex-row gap-12">
                    {/* Lottie Animation */}
                    <div className="lg:w-2/5 flex justify-center">
                      <div className="w-[250px] h-[250px]">
                        <Lottie 
                          animationData={tool.animationData}
                          loop={true}
                          autoplay={true}
                        />
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:w-3/5 items-end">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Features Included:
                      </h4>
                      <ul className="space-y-2 mb-6">
                        {tool.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                            <span className="text-green-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex space-x-4">
                        <button 
                          // onClick={paymentsEnabled ? handleCheckout:null}
                          onClick={() => requireAuth(() => startCheckout(priceId, toolName), {requireVerified: true} )} 
                          disabled={!paymentsEnabled || isLoading}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                          {/* {isLoading ? 'Redirecting...' : 'Subscribe to'}  {tool.title} - {tool.monthlyPrice}/mo */}
                          {paymentsEnabled ? 'Subscribe':'Coming soon'} 
                        </button>
                         {/* 🔐 Auth Modal
                            <GlobalModal /> */}

                        <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Full Package Subscription */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get All Pro Tools - Save 35%
          </h2>
          <p className="text-green-100 text-lg mb-2">
            Individual tools: $49/month • Package: $49/month
          </p>
          <p className="text-green-100 mb-6">
            Get all three advanced tools together and maximize your business potential
          </p>
          <button 
          disabled={!paymentsEnabled || isLoading}
          onClick={paymentsEnabled ? handleCheckout:null}
          // onClick={() => handleCheckout(priceId) } 
          // disabled={isLoading}
           className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg">
            {/* Subscribe to Pro Package - $49/month */}
            {paymentsEnabled ? 'Subscribe':'Coming soon'}
          </button>
        </div>
      </div>
    </div>
  );
}