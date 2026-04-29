"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, ArrowLeft, Loader2, Save, Type } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Editor from "@/components/Editor";
import toast from "react-hot-toast";

export default function EditNoticePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    content: "",
  });

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await fetch(`/api/notices`);
        if (res.ok) {
          const allNotices = await res.json();
          const notice = allNotices.find((n: any) => n._id === id);
          
          if (notice) {
            setFormData({
              title: notice.title || "",
              category: notice.category || "General",
              content: notice.content || "",
            });
          } else {
            toast.error("Notice not found");
            router.push("/dashboard/manage");
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNotice();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Notice updated successfully!");
        router.push("/dashboard/manage");
      } else {
        toast.error("Failed to update notice");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-500" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/dashboard/manage" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-6 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Management
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          <div className="bg-amber-500 px-6 py-8 sm:px-10 text-white">
            <h1 className="text-3xl font-heading font-bold mb-2">Edit Notice</h1>
            <p className="text-amber-100">Modify the announcement details.</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-10 space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Notice Title</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Type size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="pl-10 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
              >
                <option>General</option>
                <option>Urgent</option>
                <option>Event Update</option>
                <option>Meeting</option>
                <option>Holiday</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Content</label>
              <Editor
                value={formData.content}
                onChange={(val) => setFormData({ ...formData, content: val })}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2"
            >
              {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              {saving ? "Updating..." : "Save Changes"}
            </button>
            
          </form>
        </motion.div>
      </div>
    </div>
  );
}
