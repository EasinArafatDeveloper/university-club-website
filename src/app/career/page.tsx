"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, FileText, Video, Users, Bookmark, ExternalLink, ArrowRight } from "lucide-react";

export default function CareerPage() {
  const resources = [
    { title: "CV Writing Guide 2026", type: "PDF Guide", icon: FileText, color: "text-blue-500 bg-blue-50" },
    { title: "Mastering the Technical Interview", type: "Video Course", icon: Video, color: "text-red-500 bg-red-50" },
    { title: "LinkedIn Profile Optimization", type: "Workshop Recording", icon: Bookmark, color: "text-brand-500 bg-brand-50" },
  ];

  const jobPosts = [
    { title: "Software Engineering Intern", company: "TechNova Solutions", location: "Remote", type: "Internship", date: "Posted 2 days ago" },
    { title: "Marketing Associate", company: "Global Reach Agency", location: "New York, NY", type: "Full-time", date: "Posted 3 days ago" },
    { title: "Business Analyst Trainee", company: "Quantum Finance", location: "Chicago, IL", type: "Entry Level", date: "Posted 1 week ago" },
  ];

  return (
    <div className="min-h-screen pt-10 pb-24 bg-slate-50 dark:bg-slate-950">
      {/* Page Header */}
      <div className="bg-slate-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/30 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            Career Resource Center
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Elevate your professional trajectory with our curated resources, job postings, and mentorship programs.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {/* Job Board */}
            <div>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Briefcase className="text-brand-500" /> Latest Opportunities
                  </h2>
                </div>
                <Link href="/career/jobs" className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">
                  View All Jobs
                </Link>
              </div>
              
              <div className="space-y-4">
                {jobPosts.map((job, i) => (
                  <Link 
                    href={`/career/jobs/${i + 1}`}
                    key={i}
                    className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 transition-all hover:shadow-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{job.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{job.location}</span>
                        <span className="bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 px-2 py-1 rounded">{job.type}</span>
                        <span>{job.date}</span>
                      </div>
                    </div>
                    <div className="md:shrink-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-5 py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2">
                      View Details <ArrowRight size={14} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mentorship */}
            <div className="bg-gradient-to-br from-brand-600 to-indigo-700 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                <Users size={200} />
              </div>
              <div className="relative z-10 max-w-lg">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                  <Users size={24} className="text-white" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-4">Alumni Mentorship Program</h2>
                <p className="text-brand-100 mb-8 leading-relaxed">
                  Get paired with successful alumni in your target industry. Receive personalized guidance on your career path, resume reviews, and mock interview practice.
                </p>
                <Link href="/career/mentorship" className="inline-block bg-white text-brand-700 hover:bg-brand-50 px-6 py-3 rounded-xl font-bold transition-colors">
                  Apply for Mentorship
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Resources Toolkit */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                Career Toolkit
              </h3>
              <div className="space-y-4">
                {resources.map((res, i) => (
                  <Link href="#" key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${res.color} dark:bg-opacity-20`}>
                      <res.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 text-sm mb-1">{res.title}</h4>
                      <p className="text-xs text-slate-500">{res.type}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/career/resources" className="block text-center mt-6 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                Browse All Resources
              </Link>
            </div>

            {/* Success Stories Promo */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-2">Read Success Stories</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                See how our alumni leveraged the club's resources to land jobs at Google, Goldman Sachs, and McKinsey.
              </p>
              <Link href="/alumni/stories" className="block w-full py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Read Stories
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
