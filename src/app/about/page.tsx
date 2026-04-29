"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Award, Users, BookOpen, Target, Lightbulb, TrendingUp } from "lucide-react";

export default function AboutPage() {
  const values = [
    { name: "Leadership", icon: Target, desc: "Fostering the ability to inspire and guide others towards a common goal." },
    { name: "Career Growth", icon: TrendingUp, desc: "Providing the tools and network to excel in professional environments." },
    { name: "Communication", icon: Users, desc: "Enhancing interpersonal skills for effective collaboration and articulation." },
    { name: "Teamwork", icon: CheckCircle2, desc: "Building strong, synergistic teams that achieve more together." },
    { name: "Innovation", icon: Lightbulb, desc: "Encouraging creative problem-solving and forward-thinking ideas." },
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
            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-6">Our History & Purpose</h2>
            <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-300">
              <p className="mb-4">
                Founded in 2015, the Career & Leadership Club emerged from a vital need: to bridge the gap between academic theory and practical corporate reality. What started as a small study group has evolved into the university's premier professional development organization.
              </p>
              <p>
                Our purpose is clear. We exist to transform students into professionals. By providing exclusive access to industry leaders, organizing skill-building workshops, and fostering a culture of continuous improvement, we equip our members with the arsenal they need to thrive in competitive environments.
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
                  "Exclusive networking events with top companies",
                  "1-on-1 mentorship from industry alumni",
                  "Leadership opportunities to build your resume",
                  "Access to proprietary career resources and workshops"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-200">
                    <CheckCircle2 className="text-brand-400 shrink-0" size={20} />
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
            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-4">Leadership Team</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Meet the passionate individuals working behind the scenes to make it all happen.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { role: "Chief Adviser", name: "Dr. Robert Chen", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
              { role: "President", name: "Sarah Jenkins", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
              { role: "Vice President", name: "Michael Chang", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
              { role: "General Secretary", name: "Emily Rodriguez", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
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
