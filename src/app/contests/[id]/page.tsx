"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Calendar, Target, ArrowLeft, Users, Award, Info } from "lucide-react";

export default function ContestDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [contest, setContest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching contest details
    setTimeout(() => {
      setContest({
        _id: id,
        title: "National Business Case Competition",
        category: "Business",
        deadline: "2026-06-15",
        status: "Open",
        prize: "$5,000 Total Prize Pool",
        description: "Showcase your strategic thinking and analytical skills in our flagship Business Case Competition. Work in teams to solve real-world business challenges and pitch your solutions to a panel of expert judges.",
        eligibility: "Open to all undergraduate and graduate students currently enrolled in a recognized university.",
        image: "https://images.unsplash.com/photo-1523240715639-963c6a0289cc?q=80&w=2070&auto=format&fit=crop"
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/contests" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Contests
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src={contest.image} 
                alt={contest.title} 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">{contest.category}</span>
                <h1 className="text-4xl font-heading font-bold text-white mb-2">{contest.title}</h1>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-6">About the Contest</h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                {contest.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4">
                    <Target size={20} className="text-brand-500" /> Eligibility
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    {contest.eligibility}
                  </p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4">
                    <Award size={20} className="text-brand-500" /> Prizes
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    {contest.prize}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl sticky top-28">
              <h4 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-6">Contest Info</h4>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center shrink-0">
                    <Calendar size={24} className="text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Deadline</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{contest.deadline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center shrink-0">
                    <Trophy size={24} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Status</p>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{contest.status}</p>
                  </div>
                </div>
              </div>

              {contest.status === "Open" ? (
                <Link 
                  href={`/contests/${contest._id}/register`}
                  className="block w-full bg-brand-600 hover:bg-brand-700 text-white text-center font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand-500/25 mb-4"
                >
                  Register Now
                </Link>
              ) : (
                <button disabled className="w-full bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold py-4 rounded-xl mb-4 cursor-not-allowed">
                  Registration Closed
                </button>
              )}

              <p className="text-xs text-slate-400 flex items-center gap-1 justify-center">
                <Info size={12} /> Make sure to read the rules before applying.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
