"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Trophy, Calendar, Target, Type, Award, ArrowLeft, Loader2, Info } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Editor from "@/components/Editor";

export default function NewContestPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const roleRaw = (session?.user as any)?.role || "General Member";
  if (session && roleRaw !== "Super Admin" && roleRaw !== "Adviser") {
    router.push("/dashboard");
    return null;
  }

  const [formData, setFormData] = useState({
    title: "",
    category: "Debate",
    deadline: "",
    prize: "",
    description: "",
    eligibility: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Failed to create contest");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-6 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          <div className="bg-brand-600 px-6 py-8 sm:px-10 text-center">
            <Trophy size={48} className="text-white/30 mx-auto mb-4" />
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Create New Contest</h1>
            <p className="text-brand-100">Launch a new competition to challenge our club members.</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-10 space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Contest Title</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Type size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="e.g. National Business Case Competition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                >
                  <option>Debate</option>
                  <option>Case Study</option>
                  <option>Entrepreneurship</option>
                  <option>Hackathon</option>
                  <option>Public Speaking</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Registration Deadline</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="date"
                    name="deadline"
                    required
                    value={formData.deadline}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Prizes</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Award size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  name="prize"
                  required
                  value={formData.prize}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="e.g. $1,000 + Certificate"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Eligibility</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Target size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  name="eligibility"
                  required
                  value={formData.eligibility}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="e.g. All university students"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Contest Description</label>
              <Editor
                value={formData.description}
                onChange={(content) => setFormData({ ...formData, description: content })}
                placeholder="Detail the rules, rounds, and judging criteria..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand-500/25 flex justify-center items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Creating Contest...
                </>
              ) : (
                "Launch Contest"
              )}
            </button>
            
          </form>
        </motion.div>
      </div>
    </div>
  );
}
