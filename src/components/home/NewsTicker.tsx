"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Trophy, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NewsTicker() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [noticesRes, eventsRes, contestsRes] = await Promise.all([
          fetch("/api/notices"),
          fetch("/api/events"),
          fetch("/api/contests"),
        ]);

        const notices = await noticesRes.json();
        const events = await eventsRes.json();
        const contests = await contestsRes.json();

        const combined = [
          ...(notices.slice(0, 3).map((n: any) => ({ ...n, type: "notice", path: `/notices/${n._id}` }))),
          ...(events.slice(0, 3).map((e: any) => ({ ...e, type: "event", path: `/events/${e._id}` }))),
          ...(contests.slice(0, 3).map((c: any) => ({ ...c, type: "contest", path: `/contests/${c.id || c._id}` }))),
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setNews(combined);
      } catch (err) {
        console.error("Failed to fetch news ticker data", err);
      }
    };

    fetchNews();
  }, []);

  if (news.length === 0) return null;

  return (
    <div className="bg-brand-600 dark:bg-brand-700 py-3 overflow-hidden relative border-y border-brand-500">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          animate={{ x: ["0%", "-100%"] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex whitespace-nowrap gap-16"
        >
          {[...news, ...news, ...news].map((item, index) => (
            <Link 
              key={index} 
              href={item.path}
              className="flex items-center gap-3 text-white hover:text-brand-100 transition-colors group"
            >
              <span className="p-1 px-2 rounded-md bg-white/20 text-[10px] font-bold uppercase tracking-wider">
                {item.type}
              </span>
              <span className="text-sm font-medium">{item.title}</span>
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
