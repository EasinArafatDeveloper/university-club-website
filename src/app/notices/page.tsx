"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Calendar, User, ArrowRight, Info, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notices")
      .then(res => res.json())
      .then(data => {
        setNotices(Array.isArray(data) ? data : []);
        setLoading(false);
        // Clear new notice dot logic can be added here (e.g. set last read time in localStorage)
        localStorage.setItem("lastReadNotice", new Date().toISOString());
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-sm font-medium mb-6">
            <Bell size={16} /> Official Board
          </motion.div>
          <h1 className="text-4xl font-heading font-bold text-slate-900 dark:text-white mb-4">Notice Board</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Stay updated with the latest club announcements and official news.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full"></div>
          </div>
        ) : notices.length > 0 ? (
          <div className="space-y-6">
            {notices.map((notice, i) => (
              <motion.div
                key={notice._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
              >
                {notice.category === "Urgent" && (
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
                )}
                
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      notice.category === 'Urgent' ? 'bg-red-100 text-red-700' : 
                      notice.category === 'Meeting' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {notice.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar size={14} />
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <User size={14} />
                    Posted by: <span className="font-medium text-slate-700 dark:text-slate-300">{notice.postedBy}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{notice.title}</h2>
                <div 
                  className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 mb-6"
                  dangerouslySetInnerHTML={{ __html: notice.content }}
                />

                <div className="flex justify-end">
                   <button className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors">
                     Share Notice <ArrowRight size={16} />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <AlertCircle size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No notices posted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
