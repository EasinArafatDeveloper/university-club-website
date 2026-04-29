"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Search, Filter, Calendar, Trophy, User, Mail, Clock, ArrowLeft, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function RegistrationsManagementPage() {
  const { data: session } = useSession();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "Event" | "Contest">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const roleRaw = (session?.user as any)?.role || "General Member";
  const isAdmin = roleRaw === "Super Admin" || roleRaw === "Adviser";

  useEffect(() => {
    if (isAdmin) {
      fetchRegistrations();
    }
  }, [isAdmin]);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch("/api/registrations");
      if (res.ok) {
        const data = await res.json();
        setRegistrations(Array.isArray(data) ? data : []);
      } else {
        toast.error("Failed to load registrations");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = registrations.filter(reg => {
    const matchesSearch = 
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || reg.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Group by Event/Contest Title
  const groupedData = filteredData.reduce((acc: any, reg: any) => {
    if (!acc[reg.title]) {
      acc[reg.title] = {
        title: reg.title,
        type: reg.type,
        registrations: []
      };
    }
    acc[reg.title].registrations.push(reg);
    return acc;
  }, {});

  const groups = Object.values(groupedData);

  if (!isAdmin) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-red-500">Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-heading font-bold text-slate-900 dark:text-white mb-2">Activity Registrations</h1>
            <p className="text-slate-600 dark:text-slate-400">View participants for specific events and contests.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search participant or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 transition-all w-full md:w-64"
              />
            </div>
            
            <div className="flex bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-1">
               <button 
                onClick={() => setFilterType("all")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === 'all' ? 'bg-brand-600 text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilterType("Event")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === 'Event' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                Events
              </button>
              <button 
                onClick={() => setFilterType("Contest")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === 'Contest' ? 'bg-purple-600 text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                Contests
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-600" size={40} />
          </div>
        ) : (
          <div className="space-y-6">
            {groups.map((group: any, idx: number) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
              >
                <button 
                  onClick={() => setExpandedId(expandedId === group.title ? null : group.title)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${group.type === 'Event' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                      {group.type === 'Event' ? <Calendar size={20} /> : <Trophy size={20} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{group.title}</h3>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">
                        {group.type} &bull; {group.registrations.length} Participants
                      </p>
                    </div>
                  </div>
                  {expandedId === group.title ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                </button>

                <AnimatePresence>
                  {expandedId === group.title && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-slate-100 dark:border-slate-800"
                    >
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            <tr>
                              <th className="px-6 py-4">Participant Name</th>
                              <th className="px-6 py-4">Email Address</th>
                              <th className="px-6 py-4">Department</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4 text-right">Registered On</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {group.registrations.map((reg: any) => (
                              <tr key={reg._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                                      {reg.name.charAt(0)}
                                    </div>
                                    <span className="font-medium text-slate-900 dark:text-white">{reg.name}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{reg.email}</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{reg.department}</td>
                                <td className="px-6 py-4">
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                    reg.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                                    reg.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                  }`}>
                                    {reg.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right text-xs text-slate-500 font-medium">
                                  {new Date(reg.createdAt).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && groups.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <ClipboardList size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No registrations found</h3>
            <p className="text-slate-500">Wait for participants to sign up for your activities.</p>
          </div>
        )}
      </div>
    </div>
  );
}
