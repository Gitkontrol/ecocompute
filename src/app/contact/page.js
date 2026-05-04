import { Mail, Phone, MapPin, Users } from "lucide-react";


export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Users className="w-12 h-12 mx-auto text-blue-500 mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Contact Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
          Have questions or need support? Reach out and our team will respond as soon as possible.
        </p>
        <div className="space-y-6 text-left bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
          <div className="flex items-center gap-3">
            <Mail className="text-blue-500" />
            <span className="text-gray-800 dark:text-gray-200">support@ecocompute.tech</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-blue-500" />
            <span className="text-gray-800 dark:text-gray-200">+1 (925) 727-3169</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-blue-500" />
            <span className="text-gray-800 dark:text-gray-200"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
