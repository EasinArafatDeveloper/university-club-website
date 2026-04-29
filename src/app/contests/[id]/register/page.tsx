"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Users, Trophy } from "lucide-react";

export default function ContestRegistrationPage() {
  const params = useParams();
  const id = params.id as string;
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 text-center max-w-md w-full mx-4"
        >
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-2">Registration Sent!</h2>
          <p className="text-slate-500 mb-8">Your application for the contest has been submitted. We will review it and get back to you shortly.</p>
          <Link href="/dashboard" className="block w-full bg-brand-600 text-white font-bold py-4 rounded-xl transition-all hover:bg-brand-700">
            Go to Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href={`/contests/${id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Contest Details
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="bg-brand-600 px-8 py-10 text-center">
            <Trophy size={48} className="text-white/30 mx-auto mb-4" />
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Contest Registration</h1>
            <p className="text-brand-100">Step up to the challenge and showcase your skills.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Team Name (Optional)</label>
                <input type="text" className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" placeholder="e.g. Innovators" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Team Size</label>
                <select className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none">
                  <option>Solo</option>
                  <option>2 Members</option>
                  <option>3 Members</option>
                  <option>4 Members</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Why do you want to participate?</label>
              <textarea rows={4} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none resize-none" placeholder="Share your motivation..."></textarea>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/50">
              <p className="text-xs text-amber-800 dark:text-amber-400">
                <strong>Important:</strong> Your registered club member details (Name, ID, Email) will be automatically submitted with this application.
              </p>
            </div>

            <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand-500/25">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
