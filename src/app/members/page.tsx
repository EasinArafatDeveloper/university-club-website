"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, Filter, Mail, Briefcase } from "lucide-react";

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const members = [
    { id: 1, name: "Sarah Jenkins", role: "President", wing: "Executive", batch: "Batch 23", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Michael Chang", role: "Vice President", wing: "Executive", batch: "Batch 23", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Emily Rodriguez", role: "General Secretary", wing: "Executive", batch: "Batch 24", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Alex Johnson", role: "Wing Head", wing: "Career Development", batch: "Batch 24", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "Samantha Lee", role: "Wing Head", wing: "Leadership", batch: "Batch 24", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "David Chen", role: "General Member", wing: "Event Management", batch: "Batch 25", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { id: 7, name: "Maria Garcia", role: "General Member", wing: "Media & Content", batch: "Batch 25", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { id: 8, name: "James Wilson", role: "General Member", wing: "Public Relations", batch: "Batch 26", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
  ];

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.wing.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4">
            Members Directory
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-slate-600 dark:text-slate-400">
            Connect with the bright minds that make our club extraordinary.
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-10 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, role, or wing..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex gap-4">
            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-brand-500 min-w-[150px]">
              <option value="">All Roles</option>
              <option value="executive">Executive</option>
              <option value="head">Wing Head</option>
              <option value="member">General Member</option>
            </select>
            <button className="px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
              <Filter size={20} /> Filters
            </button>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden group hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 text-center"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-3">
                  <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-500 transition-colors">
                    <Mail size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-500 transition-colors">
                    <Briefcase size={14} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{member.name}</h3>
                <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 mb-1">{member.role}</p>
                <div className="flex justify-center items-center gap-2 text-xs text-slate-500 mt-3">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{member.wing}</span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{member.batch}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredMembers.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-heading font-medium text-slate-900 dark:text-white mb-2">No members found</h3>
            <p className="text-slate-500">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
