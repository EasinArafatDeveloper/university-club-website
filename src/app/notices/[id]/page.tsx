"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, Calendar, User, ArrowLeft, Share2, Clock } from "lucide-react";
import Link from "next/link";

export default function NoticeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [notice, setNotice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await fetch("/api/notices");
        const data = await res.json();
        const found = data.find((n: any) => n._id === id);
        if (found) {
          setNotice(found);
        } else {
          router.push("/notices");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNotice();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!notice) return null;

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/notices" className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to All Notices
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xl relative overflow-hidden"
        >
          {notice.category === "Urgent" && (
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
          )}

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              notice.category === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {notice.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar size={16} />
              {new Date(notice.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <User size={16} />
              {notice.postedBy}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-8 leading-tight">
            {notice.title}
          </h1>

          <div 
            className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 quill-content mb-12"
            dangerouslySetInnerHTML={{ __html: notice.content }}
          />

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <p className="text-sm text-slate-400 italic">
              * This is an official notice from the Career & Leadership Club.
            </p>
            <button className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full hover:bg-amber-100 hover:text-amber-600 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
