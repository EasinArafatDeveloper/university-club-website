"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, Trophy, Briefcase, Bell, Edit2, Trash2, 
  ExternalLink, ArrowLeft, Loader2, Search, Filter 
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import toast from "react-hot-toast";

import Swal from "sweetalert2";

export default function ManageContentPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("events");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const roleRaw = (session?.user as any)?.role || "General Member";
  const isAdmin = roleRaw === "Super Admin" || roleRaw === "Adviser";

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [activeTab, isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${activeTab}`);
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
      color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#0f172a',
    });

    if (result.isConfirmed) {
      const toastId = toast.loading("Deleting...");
      try {
        const res = await fetch(`/api/${activeTab}/${id}`, { method: "DELETE" });
        if (res.ok) {
          setData(data.filter(item => (item._id || item.id) !== id));
          toast.success("Item deleted successfully", { id: toastId });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            confirmButtonColor: "#4f46e5",
            background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
            color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#0f172a',
          });
        } else {
          toast.error("Delete failed", { id: toastId });
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred", { id: toastId });
      }
    }
  };

  if (!isAdmin) return <div className="p-20 text-center">Unauthorized</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-2 transition-colors text-sm font-medium">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-heading font-bold text-slate-900 dark:text-white">Manage Content</h1>
          </div>
          
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <button 
              onClick={() => setActiveTab("events")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'events' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              Events
            </button>
            <button 
              onClick={() => setActiveTab("contests")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'contests' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              Contests
            </button>
            <button 
              onClick={() => setActiveTab("jobs")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'jobs' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              Jobs
            </button>
            <button 
              onClick={() => setActiveTab("notices")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'notices' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              Notices
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Title / Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date Posted</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center">
                      <Loader2 className="animate-spin mx-auto text-brand-600" size={32} />
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item._id || item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.title}</span>
                          <span className="text-xs text-slate-500">{item.location || item.company || 'Club Board'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400">
                          {item.type || item.category || 'General'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link 
                            href={activeTab === 'jobs' ? `/career/jobs/${item._id || item.id}` : `/${activeTab}/${item._id || item.id}`} 
                            className="p-2 text-slate-400 hover:text-brand-600 transition-colors"
                            target="_blank"
                          >
                            <ExternalLink size={18} />
                          </Link>
                          <Link 
                            href={`/dashboard/${activeTab}/edit/${item._id || item.id}`}
                            className="p-2 text-slate-400 hover:text-amber-600 transition-colors"
                          >
                            <Edit2 size={18} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(item._id || item.id)}
                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center text-slate-500">
                      No items found in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
