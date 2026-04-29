"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Shield, Users, Calendar, Settings, Bell, FileText, CheckSquare, Award, PlusCircle, Trophy, Briefcase, CheckCircle, Palette } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (status === "authenticated") {
      fetch("/api/registrations")
        .then(res => res.json())
        .then(data => {
          setRegistrations(Array.isArray(data) ? data : []);
          setLoadingData(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingData(false);
        });
    }
  }, [status, router]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Get role from session or default to 'General Member'
  const roleRaw = (session.user as any)?.role || "General Member";
  
  // Map our DB roles to the dashboard layout states
  let role = "member";
  if (roleRaw === "Super Admin" || roleRaw === "Adviser") {
    role = "admin";
  } else if (roleRaw === "Wing Head" || roleRaw === "President" || roleRaw === "Vice President" || roleRaw === "General Secretary") {
    role = "wing_head";
  }

  const userName = session.user?.name || "User";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden sticky top-28 text-slate-900 dark:text-white">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 text-center">
                <div className="w-20 h-20 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full flex items-center justify-center mx-auto mb-3 font-heading text-3xl font-bold">
                  {userName.charAt(0)}
                </div>
                <h3 className="font-bold">{userName}</h3>
                <p className="text-sm text-brand-600 dark:text-brand-400 font-medium capitalize mt-1">
                  {roleRaw}
                </p>
              </div>
              <div className="p-4 space-y-1">
                <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400 rounded-lg font-medium text-sm">
                  <User size={18} /> Profile Overview
                </Link>
                
                {role === "member" && (
                  <>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors">
                      <Calendar size={18} /> My Activities
                    </Link>
                    <Link href="/join" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors">
                      <PlusCircle size={18} /> Apply for Membership
                    </Link>
                  </>
                )}

                {role === "admin" && (
                  <>
                    <Link href="/dashboard/events/new" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20 rounded-lg font-medium text-sm transition-colors">
                      <PlusCircle size={18} /> Post New Event
                    </Link>
                    <Link href="/dashboard/contests/new" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20 rounded-lg font-medium text-sm transition-colors">
                      <Trophy size={18} /> Create Contest
                    </Link>
                    <Link href="/dashboard/jobs/new" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20 rounded-lg font-medium text-sm transition-colors">
                      <Briefcase size={18} /> Post New Job
                    </Link>
                    <Link href="/dashboard/notices/new" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20 rounded-lg font-medium text-sm transition-colors">
                      <Bell size={18} /> Post New Notice
                    </Link>
                    <Link href="/dashboard/manage" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20 rounded-lg font-medium text-sm transition-colors">
                      <Settings size={18} /> Manage All Content
                    </Link>
                    <Link href="/dashboard/design-lab" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20 rounded-lg font-medium text-sm transition-colors">
                      <Palette size={18} /> Design Lab
                    </Link>
                    <Link href="/dashboard/members" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors">
                      <Users size={18} /> All Members
                    </Link>
                    <Link href="/dashboard/registrations" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors">
                      <FileText size={18} /> Activity Registrations
                    </Link>
                  </>
                )}

                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors">
                  <Bell size={18} /> Notifications
                </Link>
              </div>
            </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 space-y-6">
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-2">
                    Welcome back, {userName.split(' ')[0]}!
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Here's what's happening with your account today.
                  </p>
                </div>
              </div>

              {role === "admin" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Link href="/dashboard/events/new" className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50 flex flex-col items-center text-center group transition-all hover:shadow-lg">
                    <PlusCircle className="text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-300">New Event</span>
                  </Link>
                  <Link href="/dashboard/contests/new" className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800/50 flex flex-col items-center text-center group transition-all hover:shadow-lg">
                    <Trophy className="text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300">Create Contest</span>
                  </Link>
                  <Link href="/dashboard/jobs/new" className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50 flex flex-col items-center text-center group transition-all hover:shadow-lg">
                    <Briefcase className="text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Post Job</span>
                  </Link>
                  <Link href="/dashboard/notices/new" className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/50 flex flex-col items-center text-center group transition-all hover:shadow-lg">
                    <Bell className="text-amber-600 dark:text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-300">New Notice</span>
                  </Link>
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center">
                      {role === "admin" ? <Users size={16} /> : <Calendar size={16} />}
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {role === "admin" ? "Total Members" : "Registered Activities"}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {role === "admin" ? "856" : registrations.length}
                  </h4>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center justify-center">
                      <CheckSquare size={16} />
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {role === "admin" ? "Pending Approvals" : "Tasks Completed"}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {role === "admin" ? "12" : "0"}
                  </h4>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center">
                      <Award size={16} />
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {role === "admin" ? "Active Campaigns" : "Points Earned"}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {role === "admin" ? "4" : "0"}
                  </h4>
                </div>
              </div>

              {/* Role Specific Content Area */}
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                {loadingData ? (
                   <div className="py-8 text-center text-slate-500">Loading activities...</div>
                ) : registrations.length > 0 ? (
                  registrations.map((reg, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle size={18} className="text-brand-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            Registered for {reg.type}
                          </p>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            reg.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                            reg.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {reg.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Applied on {new Date(reg.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-slate-500 mb-4">You haven't participated in any events or contests yet.</p>
                    <Link href="/events" className="text-brand-600 font-bold hover:underline">Explore Events</Link>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
