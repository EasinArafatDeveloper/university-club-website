"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  User, Shield, Users, Calendar, Settings, Bell, FileText, 
  CheckSquare, Award, PlusCircle, Trophy, Briefcase, CheckCircle, 
  Palette, Zap, Globe, Megaphone, TrendingUp, Wallet, ShieldAlert,
  Loader2, Play, UserCheck, XCircle, Clock, Check
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loadingRegs, setLoadingRegs] = useState(true);
  
  // Interactive State
  const [selectedWing, setSelectedWing] = useState("human-resource");
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [loggedActions, setLoggedActions] = useState<any[]>([
    { text: "System Initialized under SIC Constitution", time: "Just now", wing: "System" }
  ]);
  const [actionInput, setActionInput] = useState("");

  const roleRaw = (session?.user as any)?.role || "General Member";
  const isAdmin = roleRaw === "Super Admin" || roleRaw === "Adviser";
  const isCoreLeader = roleRaw === "President" || roleRaw === "Vice President" || roleRaw === "General Secretary";
  
  // Dashboard view mapping
  const viewRole = isAdmin ? "admin" : (isCoreLeader ? "core_leader" : "member");
  const userName = session?.user?.name || "User";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (status === "authenticated") {
      // Fetch normal registrations
      fetch("/api/registrations")
        .then(res => res.json())
        .then(data => {
          setRegistrations(Array.isArray(data) ? data : []);
          setLoadingRegs(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingRegs(false);
        });

      // Fetch pending applications if Admin
      if (isAdmin) {
        fetchApplications();
      }
    }
  }, [status, router, isAdmin]);

  const fetchApplications = async () => {
    setLoadingApps(true);
    try {
      const res = await fetch("/api/applications");
      if (res.ok) {
        const data = await res.json();
        setApplications(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error loading applications:", err);
      toast.error("Failed to load applications");
    } finally {
      setLoadingApps(false);
    }
  };

  const handleApplicationStatus = async (appId: string, newStatus: string, preferredWing: string) => {
    const result = await Swal.fire({
      title: `Confirm status change?`,
      text: `Set application to ${newStatus} with assigned wing: "${preferredWing}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: `Yes, ${newStatus}!`,
      background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
      color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#0f172a',
    });

    if (!result.isConfirmed) return;

    const toastId = toast.loading("Updating status...");
    try {
      const res = await fetch("/api/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: appId, status: newStatus, preferredWing }),
      });

      if (res.ok) {
        toast.success(`Candidate successfully ${newStatus}!`, { id: toastId });
        fetchApplications();
        
        // Log action in work desk
        setLoggedActions(prev => [
          { text: `Application ${newStatus}: Assessed candidate for ${preferredWing}`, time: "Just now", wing: "System" },
          ...prev
        ]);
        setCompletedTasksCount(prev => prev + 1);
      } else {
        toast.error("Failed to update status", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred", { id: toastId });
    }
  };

  const handleLogCustomAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionInput.trim()) return;

    setLoggedActions(prev => [
      { text: actionInput, time: "Just now", wing: selectedWing },
      ...prev
    ]);
    setActionInput("");
    setCompletedTasksCount(prev => prev + 1);
    toast.success("Action logged on Work Desk!");
  };

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Real Constitution Wing specifications
  const wingDetails: Record<string, any> = {
    "human-resource": {
      name: "Human Resource Wing (HRW)",
      icon: Users,
      color: "text-blue-500 bg-blue-100/30",
      roles: ["Director - HRW", "Co-Director - HRW", "HR Executive", "HR Intern"],
      tasks: [
        "Coordinate Fall Semester Recruitment Drive",
        "Review monthly KPI performance score sheets",
        "Conduct General Member compliance and discipline audits",
        "Log registration validation of BDT 50 fee collections"
      ],
      metrics: { key: "Member Retention", val: "94%" }
    },
    "partnership-collaboration": {
      name: "Partnership & Collaboration Wing (PCW)",
      icon: Globe,
      color: "text-indigo-500 bg-indigo-100/30",
      roles: ["Director - PCW", "Co-Director - PCW", "Outreach Executive", "PCW Member"],
      tasks: [
        "Draft main sponsor proposal for the Career Summit",
        "Arrange monthly alumni collaboration workshop",
        "Pitch collaborative project to corporate industry partners",
        "Draft and execute strategic MoUs"
      ],
      metrics: { key: "Active Sponsor Leads", val: "12" }
    },
    "marketing-branding": {
      name: "Marketing & Branding Wing (MBW)",
      icon: Megaphone,
      color: "text-pink-500 bg-pink-100/30",
      roles: ["Director - MBW", "Co-Director - MBW", "Graphic Design Exec", "Media & Camera Exec"],
      tasks: [
        "Publish monthly social content calendar",
        "Generate design posters for the upcoming competition",
        "Coordinate press release & PR marketing campaign",
        "Archive high-res media files of weekly workshop"
      ],
      metrics: { key: "Reach & Engagement", val: "+24.5%" }
    },
    "event-program": {
      name: "Event & Program Management Wing (EPMW)",
      icon: Calendar,
      color: "text-violet-500 bg-violet-100/30",
      roles: ["Director - EPMW", "Co-Director - EPMW", "Logistics Executive", "EPMW Member"],
      tasks: [
        "Secure venue bookings and coordinate room layout",
        "Log logistical support timeline matrices",
        "Manage participant check-ins and registrations hub",
        "Compile and write the post-event analytics report"
      ],
      metrics: { key: "Queued Seminars", val: "3" }
    },
    "career-placement": {
      name: "Career & Placement Wing (CPW)",
      icon: TrendingUp,
      color: "text-emerald-500 bg-emerald-100/30",
      roles: ["Director - CPW", "Co-Director - CPW", "Career Exec", "Placement Intern"],
      tasks: [
        "Establish mock corporate panel schedules",
        "Sort & filter incoming resume pool entries",
        "Deliver targeted soft-skills bootcamp programs",
        "Audit corporate internship pipelines"
      ],
      metrics: { key: "Placed Members", val: "18 Internships" }
    },
    "finance": {
      name: "Finance Wing (FW)",
      icon: Wallet,
      color: "text-amber-500 bg-amber-100/30",
      roles: ["Treasurer (FW Head)", "Co-Director - Finance", "Finance Exec", "Finance Intern"],
      tasks: [
        "Enforce audit compliance on program expenditures",
        "Audit incoming registration fee logs",
        "Reconcile corporate sponsor transaction receipts",
        "Structure the comprehensive annual budget sheet"
      ],
      metrics: { key: "Audited Ratio", val: "100% Verified" }
    }
  };

  const currentWing = wingDetails[selectedWing];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden sticky top-28 text-slate-900 dark:text-white shadow-xl">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 text-center">
                <div className="w-20 h-20 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full flex items-center justify-center mx-auto mb-3 font-heading text-3xl font-bold border-2 border-brand-500">
                  {userName.charAt(0)}
                </div>
                <h3 className="font-bold text-lg">{userName}</h3>
                <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold uppercase tracking-wider mt-1">
                  {roleRaw}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <Shield size={12} className="text-brand-500" />
                  <span>SIC Member Portal</span>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 bg-brand-600 text-white rounded-xl font-bold text-sm shadow-md shadow-brand-500/20">
                  <User size={18} /> Profile Overview
                </Link>
                
                {viewRole === "member" && (
                  <>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold text-sm transition-colors">
                      <Calendar size={18} /> My Activities
                    </Link>
                    <Link href="/join" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold text-sm transition-colors">
                      <PlusCircle size={18} /> Apply for Membership
                    </Link>
                  </>
                )}

                {viewRole === "admin" && (
                  <>
                    <Link href="/dashboard/events/new" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20 rounded-xl font-bold text-sm transition-colors">
                      <PlusCircle size={18} /> Post New Event
                    </Link>
                    <Link href="/dashboard/contests/new" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20 rounded-xl font-bold text-sm transition-colors">
                      <Trophy size={18} /> Create Contest
                    </Link>
                    <Link href="/dashboard/jobs/new" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20 rounded-xl font-bold text-sm transition-colors">
                      <Briefcase size={18} /> Post New Job
                    </Link>
                    <Link href="/dashboard/notices/new" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20 rounded-xl font-bold text-sm transition-colors">
                      <Bell size={18} /> Post New Notice
                    </Link>
                    <Link href="/dashboard/manage" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20 rounded-xl font-bold text-sm transition-colors">
                      <Settings size={18} /> Manage All Content
                    </Link>
                    <Link href="/dashboard/design-lab" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20 rounded-xl font-bold text-sm transition-colors">
                      <Palette size={18} /> Design Lab
                    </Link>
                    <Link href="/dashboard/members" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold text-sm transition-colors">
                      <Users size={18} /> All Members
                    </Link>
                    <Link href="/dashboard/registrations" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold text-sm transition-colors">
                      <FileText size={18} /> Activity Registrations
                    </Link>
                  </>
                )}

                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold text-sm transition-colors">
                  <Bell size={18} /> Notifications
                </Link>
              </div>
            </div>
          </div>

          {/* MAIN Work Desk */}
          <div className="flex-1 space-y-8">
            
            {/* Header Greeting */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
              <h2 className="text-3xl font-heading font-black text-slate-900 dark:text-white mb-2 leading-none">
                Welcome back, {userName.split(' ')[0]}!
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Managing strategic operations under the Scholars Influencers Club (SIC) Constitution.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Actions Completed</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-1.5">
                  {completedTasksCount} <span className="text-xs font-medium text-emerald-500">Session</span>
                </h4>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Fee Compliance</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white">50 BDT</h4>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Validity Term</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white">3 Years</h4>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Wings</p>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white">6 Departments</h4>
              </div>
            </div>

            {/* INTERACTIVE WORK DESK (6 WINGS PREVIEW & CONTROLS) */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div>
                  <h3 className="text-2xl font-heading font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckSquare size={24} className="text-brand-500" /> SIC Work Desk & Departments
                  </h3>
                  <p className="text-xs text-slate-500">Select any department to overview roles and log constitutional actions.</p>
                </div>
                
                {/* Switcher Dropdown */}
                <select 
                  value={selectedWing} 
                  onChange={(e) => setSelectedWing(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-350 focus:ring-2 focus:ring-brand-500 w-full md:w-fit"
                >
                  <option value="human-resource">Human Resource Wing (HRW)</option>
                  <option value="partnership-collaboration">Partnership & Collaboration (PCW)</option>
                  <option value="marketing-branding">Marketing & Branding (MBW)</option>
                  <option value="event-program">Event & Program (EPMW)</option>
                  <option value="career-placement">Career & Placement (CPW)</option>
                  <option value="finance">Finance Wing (FW)</option>
                </select>
              </div>

              <div className="grid md:grid-cols-12 gap-8 items-start">
                
                {/* Specific Wing Information */}
                <div className="md:col-span-8 space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <span className={`p-2 rounded-xl ${currentWing.color} shrink-0`}>
                        <currentWing.icon size={20} />
                      </span>
                      {currentWing.name}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      Explore the real-world operational tasks and designated role structure for this department under the SIC guidelines.
                    </p>
                  </div>

                  {/* Tasks List */}
                  <div>
                    <h5 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3">Operational Tasks</h5>
                    <div className="space-y-3">
                      {currentWing.tasks.map((task: string, i: number) => (
                        <div key={i} className="flex gap-3 items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300">
                          <CheckCircle className="text-brand-500 shrink-0" size={16} />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Log Action Simulator Form */}
                  <form onSubmit={handleLogCustomAction} className="bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                    <h5 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3">Simulate / Log Departmental Action</h5>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={actionInput}
                        onChange={(e) => setActionInput(e.target.value)}
                        placeholder={`e.g., Logged KPI assessment scores for member...`}
                        className="flex-1 bg-white dark:bg-slate-900 text-sm border-none rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
                      />
                      <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 rounded-xl flex items-center gap-1">
                        <Play size={12} className="fill-white" /> Log Action
                      </button>
                    </div>
                  </form>
                </div>

                {/* Specific Roles & Stats */}
                <div className="md:col-span-4 space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
                    <h5 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3">Assigned Roles</h5>
                    <div className="space-y-2">
                      {currentWing.roles.map((role: string, i: number) => (
                        <div key={i} className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                          <span>{role}</span>
                          <span className="text-[10px] uppercase text-brand-600 dark:text-brand-400">Constitution</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div>
                      <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Key KPI Focus</h5>
                      <span className="text-sm font-bold text-slate-800 dark:text-white">{currentWing.metrics.key}</span>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 px-3 py-1.5 rounded-xl font-bold text-xs">
                      {currentWing.metrics.val}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* REAL DATABASE-BACKED CENTRAL ADMIN CONTROLS (PENDING MEMBERSHIP APPLICATIONS) */}
            {viewRole === "admin" && (
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
                <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-2xl font-heading font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <UserCheck size={24} className="text-brand-500" /> General Member Applications
                  </h3>
                  <p className="text-xs text-slate-500">Real-time control desk to assess candidate submissions, assign wings, and approve them into SIC.</p>
                </div>

                {loadingApps ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="animate-spin text-brand-600" size={32} />
                  </div>
                ) : applications.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800/40">
                          <th className="px-4 py-3">Candidate</th>
                          <th className="px-4 py-3">Dept & ID</th>
                          <th className="px-4 py-3">Requested Wing(s)</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3 text-right">Decisions & Control</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {applications.map((app) => (
                          <tr key={app._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-4 py-4">
                              <p className="font-bold text-slate-900 dark:text-white">{app.firstName} {app.lastName}</p>
                              <p className="text-xs text-slate-500">{app.email}</p>
                            </td>
                            <td className="px-4 py-4 text-xs font-medium">
                              <p className="text-slate-800 dark:text-slate-300">{app.department}</p>
                              <p className="text-slate-500">{app.studentId || "No ID"}</p>
                            </td>
                            <td className="px-4 py-4">
                              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30">
                                {app.preferredWing}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                                app.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                app.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                'bg-amber-50 text-amber-700 border-amber-200'
                              }`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-right">
                              {app.status === 'Pending' ? (
                                <div className="flex justify-end gap-2">
                                  <button 
                                    onClick={() => handleApplicationStatus(app._id, "Accepted", app.preferredWing.split(',')[0])}
                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all font-bold text-xs flex items-center gap-1 border border-emerald-100"
                                  >
                                    <Check size={14} /> Accept
                                  </button>
                                  <button 
                                    onClick={() => handleApplicationStatus(app._id, "Rejected", app.preferredWing.split(',')[0])}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold text-xs flex items-center gap-1 border border-red-100"
                                  >
                                    <XCircle size={14} /> Reject
                                  </button>
                                </div>
                              ) : (
                                <span className="text-xs text-slate-400 italic">Evaluated</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    No join applications registered yet.
                  </div>
                )}
              </div>
            )}

            {/* Live Interactive Action Logs */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-heading font-black text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                <Clock size={20} className="text-brand-500" /> Session Activity Logs
              </h3>
              
              <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
                {loggedActions.map((log, i) => (
                  <div key={i} className="flex gap-3 items-start text-xs font-semibold bg-slate-50 dark:bg-slate-800/30 p-3.5 rounded-xl border border-slate-150 dark:border-slate-800">
                    <span className="bg-brand-600 text-white px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">{log.wing}</span>
                    <p className="flex-1 text-slate-700 dark:text-slate-350">{log.text}</p>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zero-Tolerance Compliance Highlight */}
            <div className="bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-red-500 rounded-2xl p-5 flex items-start gap-4">
              <ShieldAlert className="text-red-500 shrink-0 mt-0.5" size={24} />
              <div>
                <h4 className="text-sm font-bold text-red-900 dark:text-red-400 mb-1">
                  Harassment Zero-Tolerance Compliance Warning
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  As mandated under Article VII, Section 3 of the SIC Constitution, any verified acts of harassment or misconduct dictate immediate and permanent termination by the Core Committee, enforcing a lifetime rejoin ban.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
