"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Award, Users, BookOpen, Target, Lightbulb, TrendingUp } from "lucide-react";

export default function AboutPage() {
  const values = [
    { name: "Integrity", icon: Target, desc: "Maintaining the highest moral and ethical standards in all club undertakings." },
    { name: "Collaboration", icon: Users, desc: "Fostering cross-departmental synergy and a supportive environment for all members." },
    { name: "Innovation", icon: Lightbulb, desc: "Encouraging creative problem-solving, structured development, and modern industry workflows." },
    { name: "Professionalism", icon: CheckCircle2, desc: "Developing strong work ethics, compliance with guidelines, and career readiness." },
  ];

  return (
    <div className="min-h-screen pt-10 pb-24">
      {/* Page Header */}
      <div className="bg-brand-50 dark:bg-slate-900 py-16 md:py-24 border-b border-brand-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4"
          >
            About The Club
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Learn about our history, purpose, and the dedicated individuals driving our mission forward.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Purpose and History */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-6">Preamble & History</h2>
            <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-300 text-[15px]">
              <p className="mb-4 font-semibold italic text-slate-700 dark:text-slate-350">
                “We, the members of the Scholars Influencers Club (SIC), establish this Constitution to create a structured, transparent and professional platform dedicated to student development and leadership excellence.”
              </p>
              <p className="mb-4">
                Scholars Influencers Club (SIC) is a student-led, non-profit organization established on <strong>26 April, 2023</strong> at the <strong>University of Scholars</strong>. Recognizing the growing gap between academic learning and industry requirements, we aim to build an environment where students can acquire practical skills, real-world exposure and a strong sense of responsibility.
              </p>
              <p>
                SIC works with motivated students from diverse academic backgrounds including <strong>Textile, CSE, EEE, BBA and English</strong>, who are eager to enhance their skills, explore professional opportunities and prepare themselves for future careers.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-brand-600/20 mix-blend-overlay z-10"></div>
            <Image 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Students in a meeting" 
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">These principles guide our actions, shape our culture, and define what it means to be a member of the club.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-xl flex items-center justify-center mb-6">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3">{value.name}</h3>
                <p className="text-slate-600 dark:text-slate-400">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Join */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 mb-24 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/20 rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Why You Should Join</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Joining the club isn't just an extracurricular activity; it's an investment in your future. Our members consistently secure top tier internships and graduate roles.
              </p>
              <ul className="space-y-4">
                {[
                  "Skill Development: Technical and soft skills aligned with corporate requirements.",
                  "Corporate Readiness: Real work experience through projects and simulations.",
                  "Internship & Job Support: Placement assistance and recruiter networking.",
                  "Alumni Collaboration: Mentorship and career insights from club alumni.",
                  "Industry Engagement: Partnering and connecting with diverse organizations.",
                  "Workshops & Seminars: Continuous learning programs and professional events."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-200 text-sm">
                    <CheckCircle2 className="text-brand-400 shrink-0 mt-0.5" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center">
                  <h4 className="text-3xl font-bold text-brand-400 mb-1">95%</h4>
                  <p className="text-sm text-slate-300">Placement Rate</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center">
                  <h4 className="text-3xl font-bold text-brand-400 mb-1">200+</h4>
                  <p className="text-sm text-slate-300">Partner Companies</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center">
                  <h4 className="text-3xl font-bold text-brand-400 mb-1">5k+</h4>
                  <p className="text-sm text-slate-300">Alumni Network</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center">
                  <h4 className="text-3xl font-bold text-brand-400 mb-1">50+</h4>
                  <p className="text-sm text-slate-300">Annual Workshops</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Committee */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-4">Core Leadership Panel</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Meet the strategic leadership coordinating overall operations.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { role: "President", name: "Sarah Jenkins", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
              { role: "Vice President", name: "Michael Chang", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
              { role: "General Secretary", name: "Emily Rodriguez", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
              { role: "Joint Secretary", name: "Tanvir Rahman", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
              { role: "Treasurer (Finance Head)", name: "Sajjad Hossain", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
            ].map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4">
                  <Image 
                    src={person.image} 
                    alt={person.name} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-xl font-heading font-bold text-slate-900 dark:text-white">{person.name}</h4>
                <p className="text-brand-600 dark:text-brand-400 font-medium text-sm">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
