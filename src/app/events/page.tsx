"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, Filter } from "lucide-react";

export default function EventsPage() {
  const [filter, setFilter] = useState("upcoming");

  const events = [
    {
      id: "leadership-summit-2026",
      title: "National Leadership Summit 2026",
      type: "Summit",
      date: "May 15, 2026",
      time: "09:00 AM - 05:00 PM",
      location: "University Main Auditorium",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "upcoming",
      category: "Leadership"
    },
    {
      id: "career-fair-spring",
      title: "Spring Career Fair & Networking",
      type: "Career",
      date: "May 28, 2026",
      time: "10:00 AM - 04:00 PM",
      location: "Student Center Atrium",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "upcoming",
      category: "Career"
    },
    {
      id: "tech-innovation-hackathon",
      title: "Tech Innovation Hackathon",
      type: "Competition",
      date: "June 10-12, 2026",
      time: "48 Hours",
      location: "Innovation Lab",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "upcoming",
      category: "Innovation"
    },
    {
      id: "alumni-mixer-25",
      title: "Annual Alumni Mixer 2025",
      type: "Networking",
      date: "December 20, 2025",
      time: "06:00 PM - 09:00 PM",
      location: "Grand Hotel Downtown",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "past",
      category: "Networking"
    },
    {
      id: "resume-workshop",
      title: "Advanced Resume Building Workshop",
      type: "Workshop",
      date: "November 05, 2025",
      time: "02:00 PM - 04:00 PM",
      location: "Room 302, Business Building",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      status: "past",
      category: "Career"
    }
  ];

  const filteredEvents = events.filter(e => e.status === filter);

  return (
    <div className="min-h-screen pt-10 pb-24 bg-slate-50 dark:bg-slate-950">
      {/* Page Header */}
      <div className="bg-brand-600 dark:bg-brand-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            Events & Programs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-100 max-w-2xl mx-auto"
          >
            Discover and register for upcoming workshops, summits, competitions, and networking sessions.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
                filter === "upcoming" 
                  ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter("past")}
              className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
                filter === "past" 
                  ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Past Events
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700">
            <Filter size={16} /> Filter by Category
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 px-3 py-1 rounded-full text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  {event.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-4 line-clamp-2">
                  {event.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Calendar size={18} className="text-brand-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Clock size={18} className="text-brand-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin size={18} className="text-brand-500" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link 
                    href={`/events/${event.id}`}
                    className="flex items-center justify-between w-full text-sm font-semibold text-brand-600 dark:text-brand-400 group-hover:text-brand-700 dark:group-hover:text-brand-300"
                  >
                    {filter === "upcoming" ? "Register Now" : "View Gallery & Details"}
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-heading font-medium text-slate-900 dark:text-white mb-2">No events found</h3>
            <p className="text-slate-500">Check back later for more updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
