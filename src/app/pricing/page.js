import { CheckCircle, Cloud, Shield, Database } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';


export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Pricing Plans</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-8 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Basic</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Basic tools to get started</p>
             
            <p className="text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100">$280<span className="text-lg font-medium">/Wk</span></p>
            <div className="relative left-52 bottom-10 whitespace-nowrap text-wrap rounded-full h-24 w-24 transition dark:text-green-300 dark:bg-blue-700 bg-green-300 px-3 py-1 text-lg font-medium text-blue-700">
              <div className='absolute top-5 font-shadows font-bold'>Try FREE! for 3 days</div>
            </div>
            <ul className="absolute top-[450px] space-y-3">
              <li className="flex items-center gap-2"><CheckCircle className="text-blue-500" /> Email Hosting</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-blue-500" /> Project Tracker</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-blue-500" /> CRM Access</li>
            </ul>
            
            <Link href="/basic-tools">
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md transition mt-12">
                View Basic Tools
              </button>
            </Link>

          </div>
          

          {/* Pro Plan */}
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-8 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Pro</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Advanced tools for growing businesses</p>
            <p className="text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100">$330<span className="text-lg font-medium">/Wk</span></p>
             <div className="relative text-wrap left-52 bottom-10 z-10 transition whitespace-nowrap rounded-full h-24 w-24 dark:border-purple-300 dark:bg-blue-700 dark:text-yellow-400 bg-yellow-400 px-3 py-1 text-lg font-medium text-blue-700">
              <div className='absolute top-5 font-shadows font-bold'>Try FREE! for 3 days </div>
            </div>
            <ul className="absolute space-y-3 top-[450px]">
              <li className="flex items-center gap-2"><Cloud className="text-blue-500" /> Cloud Storage</li>
              <li className="flex items-center gap-2"><Database className="text-blue-500" /> Data Analytics</li>
              <li className="flex items-center gap-2"><Shield className="text-blue-500" /> Enhanced Security</li>
            </ul>
            
            <Link href="/pro-tools">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md transition mt-12">
              Subscribe Now
            </button>
            </Link>           
          </div>

          {/* Enterprise Plan */}
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-8 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Enterprise</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Comprehensive solutions for large teams</p>
            <p className="text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100">$500<span className="text-lg font-medium">/Wk</span></p>
            <ul className="space-y-3 mb-6 pt-6">
              <li className="flex items-center gap-2"><Cloud className="text-blue-500" /> Cloud Integration</li>
              <li className="flex items-center gap-2"><Database className="text-blue-500" /> Business Intelligence</li>
              <li className="flex items-center gap-2"><Shield className="text-blue-500" /> Premium Support</li>
            </ul>

            <Link href="/contact">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md transition">
              Contact Sales
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// New page for Basic Tools
export function BasicTools() {
  const tools = [
    { name: 'Team Chat', icon: Cloud, price: '$5/mo' },
    { name: 'Email Service', icon: Shield, price: '$7/mo' },
    { name: 'CRM Mini', icon: Database, price: '$9/mo' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Basic SaaS Tools</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center">
              <tool.icon className="text-blue-500 w-10 h-10 mb-3" />
              <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{tool.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{tool.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
