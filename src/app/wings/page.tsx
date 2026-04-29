"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Lightbulb, Users, Calendar, Megaphone, Presentation, Zap, Globe } from "lucide-react";

export default function WingsPage() {
  const wings = [
    {
      id: "career-development",
      name: "Career Development Wing",
      icon: TrendingUpIcon,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      description: "Focuses on resume building, interview preparation, and connecting students with top-tier corporate opportunities.",
      head: "Alex Johnson",
      members: 120,
    },
    {
      id: "leadership",
      name: "Leadership Wing",
      icon: Users,
      color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
      description: "Organizes workshops, bootcamps, and seminars aimed at building strong, resilient, and visionary leaders.",
      head: "Samantha Lee",
      members: 85,
    },
    {
      id: "event-management",
      name: "Event Management Wing",
      icon: Calendar,
      color: "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
      description: "The backbone of our operations, responsible for seamlessly executing summits, seminars, and large-scale competitions.",
      head: "David Chen",
      members: 150,
    },
    {
      id: "media-content",
      name: "Media & Content Wing",
      icon: Presentation,
      color: "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
      description: "Creative minds driving our digital presence through stunning graphics, engaging videos, and compelling copy.",
      head: "Maria Garcia",
      members: 65,
    },
    {
      id: "public-relations",
      name: "Public Relations Wing",
      icon: Megaphone,
      color: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
      description: "Managing external communications, securing sponsorships, and building relationships with industry partners.",
      head: "James Wilson",
      members: 45,
    },
    {
      id: "entrepreneurship",
      name: "Entrepreneurship Wing",
      icon: Zap,
      color: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
      description: "Nurturing startup ideas, providing incubation resources, and hosting business pitch competitions.",
      head: "Priya Patel",
      members: 70,
    },
    {
      id: "research-innovation",
      name: "Research & Innovation Wing",
      icon: Lightbulb,
      color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
      description: "Driving forward-thinking projects, publishing papers, and exploring cutting-edge industry trends.",
      head: "Robert Taylor",
      members: 55,
    },
  ];

  function TrendingUpIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    );
  }

  return (
    <div className="min-h-screen pt-10 pb-24 bg-slate-50 dark:bg-slate-950">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4"
          >
            Our Departments
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            The club operates through specialized wings, each focusing on a distinct area to provide comprehensive development opportunities for our members.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wings.map((wing, i) => (
            <motion.div
              key={wing.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${wing.color}`}>
                <wing.icon size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {wing.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                {wing.description}
              </p>
              
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider font-semibold mb-1">Wing Head</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-300">{wing.head}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider font-semibold mb-1">Members</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-300">{wing.members}+</p>
                </div>
              </div>
              
              <Link 
                href={`/wings/${wing.id}`}
                className="mt-6 w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium flex items-center justify-center gap-2 group-hover:bg-brand-600 group-hover:text-white transition-colors"
              >
                View Details <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
