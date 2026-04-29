"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function EventRegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to save registration
    setTimeout(() => {
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-center max-w-md w-full mx-4"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-2">Registration Successful!</h2>
          <p className="text-slate-500 mb-8">You have successfully registered for the event. A confirmation email has been sent to you.</p>
          <Link href="/dashboard" className="block w-full bg-brand-600 text-white font-bold py-3 rounded-xl transition-colors hover:bg-brand-700">
            Go to Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`/events/${id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-6 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Event Details
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="bg-brand-600 px-6 py-6 sm:px-10">
            <h1 className="text-2xl font-heading font-bold text-white mb-1">Event Registration</h1>
            <p className="text-brand-100 text-sm">Please confirm your details to register.</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-10 space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                You are registering as the currently logged-in user. Your name, email, and department details will be automatically attached to this registration.
              </p>
            </div>

            <div>
              <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <input type="checkbox" required className="w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                <span className="text-sm text-slate-700 dark:text-slate-300">I agree to abide by the club's code of conduct during this event.</span>
              </label>
            </div>

            <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl transition-colors shadow-md">
              Confirm Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
