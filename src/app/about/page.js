import { Mail, Phone, MapPin, Users, Info } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <Info className="w-12 h-12 mx-auto text-blue-500 mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">About Servana</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
          Servana is an innovative SaaS platform providing essential IT and business solutions to help
          organizations thrive in a digital-first world. From CRM systems to cloud and cybersecurity
          tools, we’re committed to empowering growth with technology that’s both scalable and secure.
        </p>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-400">
              To simplify technology adoption for businesses by offering reliable, user-friendly, and
              scalable solutions that drive efficiency and innovation.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Our Team</h3>
            <p className="text-gray-700 dark:text-gray-400">
              Our team is made up of skilled engineers, designers, and business experts dedicated to
              creating seamless and powerful software experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
