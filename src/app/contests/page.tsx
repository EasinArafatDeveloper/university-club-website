"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, Clock, Users, ArrowRight } from "lucide-react";

export default function ContestsPage() {
  const contests = [
    {
      id: "national-debate-2026",
      title: "National Debate Championship",
      category: "Debate",
      status: "Registration Open",
      deadline: "May 10, 2026",
      prize: "$1,000 + Certificate",
      teams: "2-3 Members",
    },
    {
      id: "biz-case-comp",
      title: "Global Business Case Competition",
      category: "Case Study",
      status: "Upcoming",
      deadline: "July 15, 2026",
      prize: "$2,500 + Internship Interview",
      teams: "4 Members",
    },
    {
      id: "startup-pitch",
      title: "Startup Pitch Deck Challenge",
      category: "Entrepreneurship",
      status: "Closed",
      deadline: "March 01, 2026",
      prize: "Seed Funding",
      teams: "1-4 Members",
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 text-sm font-medium mb-6">
            <Trophy size={16} /> Competitions
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4">
            Test Your Limits
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-slate-600 dark:text-slate-400">
            Participate in hackathons, debates, case competitions, and pitch challenges to win prizes and recognition.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest, i) => (
            <Link 
              href={`/contests/${contest.id}`}
              key={contest.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:border-brand-500 dark:hover:border-brand-500 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  contest.status === "Registration Open" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                  contest.status === "Closed" ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" :
                  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                }`}>
                  {contest.status}
                </span>
              </div>
              
              <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-xl flex items-center justify-center mb-6 mt-4">
                <Trophy size={24} />
              </div>
              
              <p className="text-sm text-brand-600 dark:text-brand-400 font-medium mb-1">{contest.category}</p>
              <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{contest.title}</h3>
              
              <div className="space-y-3 mb-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Clock size={16} />
                  <span>Deadline: <span className="font-medium text-slate-900 dark:text-slate-300">{contest.deadline}</span></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Users size={16} />
                  <span>Team Size: <span className="font-medium text-slate-900 dark:text-slate-300">{contest.teams}</span></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Trophy size={16} />
                  <span>Prize: <span className="font-medium text-slate-900 dark:text-slate-300">{contest.prize}</span></span>
                </div>
              </div>
              
              <div 
                className={`w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                  contest.status === "Registration Open" 
                    ? "bg-brand-600 text-white hover:bg-brand-700" 
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                }`}
              >
                {contest.status === "Registration Open" ? "Register Now" : "View Details"} <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
