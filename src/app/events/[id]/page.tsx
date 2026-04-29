"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Tag, ArrowLeft, Users, Share2 } from "lucide-react";

export default function EventDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // In a real app, this fetches from /api/events/:id
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (res.ok) {
          const data = await res.json();
          setEvent(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <h1 className="text-4xl font-heading font-bold mb-4 text-slate-900 dark:text-white">Event Not Found</h1>
        <Link href="/events" className="bg-brand-600 text-white px-6 py-3 rounded-xl font-medium">
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 bg-slate-50 dark:bg-slate-950">
      
      {/* Hero Header */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <Image 
          src={event.image} 
          alt={event.title} 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <Link href="/events" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors text-sm font-medium">
              <ArrowLeft size={16} /> Back to Events
            </Link>
            <div className="flex gap-2 mb-4">
              <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">{event.type}</span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">{event.status === "upcoming" ? "Open for Registration" : "Completed"}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">{event.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Event Details</h2>
              <div 
                className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 quill-content"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </motion.div>
          </div>

          {/* Sidebar / Actions */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl sticky top-28"
            >
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0 text-brand-600 dark:text-brand-400">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Date</p>
                    <p className="text-slate-900 dark:text-white font-semibold">{new Date(event.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0 text-brand-600 dark:text-brand-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Time</p>
                    <p className="text-slate-900 dark:text-white font-semibold">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0 text-brand-600 dark:text-brand-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Location</p>
                    <p className="text-slate-900 dark:text-white font-semibold">{event.location}</p>
                  </div>
                </div>
              </div>

              {event.status === "upcoming" ? (
                <Link href={`/events/${event._id}/register`} className="block w-full bg-brand-600 hover:bg-brand-700 text-white text-center font-bold py-4 rounded-xl transition-colors shadow-lg shadow-brand-500/30">
                  Register Now
                </Link>
              ) : (
                <button disabled className="w-full bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed font-bold py-4 rounded-xl">
                  Registration Closed
                </button>
              )}

              <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium">
                <Share2 size={18} /> Share Event
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
