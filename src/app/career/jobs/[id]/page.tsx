"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Calendar, ArrowLeft, Building2, Globe, Send } from "lucide-react";

export default function JobDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching job details
    setTimeout(() => {
      setJob({
        _id: id,
        title: "Software Engineer Intern",
        company: "Google",
        location: "Mountain View, CA (Remote)",
        type: "Internship",
        deadline: "2026-06-30",
        description: "We are looking for a passionate Software Engineer Intern to join our team. You will work on cutting-edge technologies and contribute to high-impact projects that reach millions of users.",
        requirements: [
          "Currently pursuing a BS, MS, or PhD in Computer Science or related field",
          "Experience with JavaScript, TypeScript, or Python",
          "Knowledge of data structures and algorithms",
          "Excellent problem-solving skills"
        ],
        applyLink: "https://careers.google.com"
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/career" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Job Board
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-8 md:p-12 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-brand-50 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center shrink-0">
                  <Building2 size={32} className="text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-1">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm">
                    <span className="flex items-center gap-1"><Building2 size={14} /> {job.company}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                  </div>
                </div>
              </div>
              <a 
                href={job.applyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-brand-500/25 flex items-center gap-2"
              >
                Apply Externally <Send size={18} />
              </a>
            </div>
          </div>

          <div className="p-8 md:p-12 grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-4">Job Description</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-4">Key Requirements</h3>
                <ul className="space-y-3">
                  {job.requirements.map((req: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-2 shrink-0"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Job Overview</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Briefcase size={18} className="text-brand-500" />
                    <div>
                      <p className="text-xs text-slate-500">Job Type</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{job.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-brand-500" />
                    <div>
                      <p className="text-xs text-slate-500">Deadline</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{job.deadline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-brand-500" />
                    <div>
                      <p className="text-xs text-slate-500">Industry</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Technology</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
