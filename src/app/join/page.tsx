"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2, Award, ShieldAlert, Sparkles } from "lucide-react";
import Link from "next/link";

export default function JoinPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    studentId: "",
    department: "",
    semester: "Freshman",
    preferredWing1: "Human Resource Wing (HRW)",
    preferredWing2: "None",
    whyJoin: "",
    experience: "",
    portfolio: ""
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert("You must agree to the Club Constitution & Code of Conduct.");
      return;
    }
    setLoading(true);

    const submissionPayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      studentId: formData.studentId,
      department: formData.department,
      semester: formData.semester,
      preferredWing: formData.preferredWing2 !== "None" 
        ? `${formData.preferredWing1}, ${formData.preferredWing2}` 
        : formData.preferredWing1,
      whyJoin: formData.whyJoin,
      experience: formData.experience,
      portfolio: formData.portfolio
    };

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionPayload),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert("Submission failed. Please check fields and try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 text-center shadow-2xl border border-slate-100 dark:border-slate-800"
        >
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-4">Application Received!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed text-sm">
            Thank you for applying to the <strong>Scholars Influencers Club (SIC)</strong>. Our HR team will review your application. Please note selected members pay a BDT 50 registration fee.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-brand-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/25">
            Return Home <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  const wingOptions = [
    "Human Resource Wing (HRW)",
    "Partnership & Collaboration Wing (PCW)",
    "Marketing & Branding Wing (MBW)",
    "Event & Program Management Wing (EPMW)",
    "Career & Placement Wing (CPW)",
    "Finance Wing (FW)"
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-slate-50 dark:bg-slate-950 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 dark:text-white mb-4">
            Join the <span className="text-brand-600">Influencers</span> <Sparkles className="inline text-brand-500 animate-pulse" size={24} />
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Become a general member of Scholars Influencers Club (SIC)</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 py-10 px-6 shadow-2xl sm:rounded-[2.5rem] sm:px-12 border border-slate-200 dark:border-slate-800"
        >
          {/* Policy Information Box */}
          <div className="bg-indigo-50/50 dark:bg-slate-800/50 border border-indigo-100 dark:border-slate-700 rounded-2xl p-6 mb-6 text-sm text-slate-700 dark:text-slate-300">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 text-base">
              <Award size={18} className="text-brand-500" /> Membership Policy Highlights
            </h3>
            <ul className="space-y-2 list-disc pl-4 text-xs md:text-sm">
              <li>Selected members must pay a <strong>one-time registration fee of 50 BDT</strong>.</li>
              <li>Membership is valid for a period of <strong>3 years</strong> from the registration date.</li>
              <li>General members can work in a <strong>maximum of two (2) departments</strong> based on interest.</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First Name</label>
                <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
                <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white outline-none" placeholder="example@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white outline-none" placeholder="+8801XXXXXXXXX" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Student ID</label>
                <input type="text" name="studentId" required value={formData.studentId} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white outline-none" placeholder="2023-XXXX-XX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Department</label>
                <input type="text" name="department" required value={formData.department} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white outline-none" placeholder="CSE, Textile, BBA, EEE, English..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Primary Wing Choice</label>
                <select name="preferredWing1" value={formData.preferredWing1} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white outline-none">
                  {wingOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Secondary Wing Choice (Optional)</label>
                <select name="preferredWing2" value={formData.preferredWing2} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white outline-none">
                  <option value="None">None (Only interested in one wing)</option>
                  {wingOptions.filter(opt => opt !== formData.preferredWing1).map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Why do you want to join SIC? (Describe your goal)</label>
              <textarea name="whyJoin" required value={formData.whyJoin} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white outline-none resize-none" placeholder="Describe your expectations and how you can contribute..."></textarea>
            </div>

            {/* Zero Tolerance Warning */}
            <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl p-5 text-sm text-slate-700 dark:text-slate-350">
              <h3 className="font-bold text-red-900 dark:text-red-400 mb-2 flex items-center gap-2">
                <ShieldAlert size={18} className="text-red-500 shrink-0" /> Harassment & Misconduct Clause
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                SIC enforces a zero-tolerance policy against gender-based harassment, bullying, or any general misconduct. Involved members face immediate and permanent termination and a lifetime rejoining ban.
              </p>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="agreeToTerms"
                checked={agreeToTerms} 
                onChange={(e) => setAgreeToTerms(e.target.checked)} 
                className="mt-1 w-4 h-4 rounded text-brand-600 border-slate-300 focus:ring-brand-500" 
              />
              <label htmlFor="agreeToTerms" className="text-xs text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                I hereby declare that I read the SIC Preamble, and I agree to strictly abide by the Scholars Influencers Club Constitution, the BDT 50 registration fee policy, and the code of conduct.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Submitting...
                </>
              ) : (
                <>
                  Submit Join Application <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
