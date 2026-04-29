"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Trophy, Calendar, Target, Type, Award, ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Editor from "@/components/Editor";
import toast from "react-hot-toast";

export default function EditContestPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Programming",
    deadline: "",
    teams: "Solo",
    prize: "",
    description: "",
  });

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const res = await fetch(`/api/contests`);
        if (res.ok) {
          const all = await res.json();
          const item = all.find((n: any) => n.id === id || n._id === id);
          
          if (item) {
            setFormData({
              title: item.title || "",
              category: item.category || "Programming",
              deadline: item.deadline || "",
              teams: item.teams || "Solo",
              prize: item.prize || "",
              description: item.description || "",
            });
          } else {
            toast.error("Contest not found");
            router.push("/dashboard/manage");
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchContest();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Note: I need to make sure I have a PUT route for contests
      const res = await fetch(`/api/contests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Contest updated!");
        router.push("/dashboard/manage");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-600" size={32} /></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard/manage" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-6 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="bg-brand-600 px-6 py-8 text-white">
            <h1 className="text-3xl font-heading font-bold">Edit Contest</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none" required />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Deadline</label>
                <input type="text" value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Editor value={formData.description} onChange={(val) => setFormData({...formData, description: val})} />
            </div>

            <button type="submit" disabled={saving} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2">
              {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              {saving ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
