"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Calendar, Award, BookOpen, Target, Lightbulb, Zap, TrendingUp } from "lucide-react";
import NewsTicker from "@/components/home/NewsTicker";
import Partners from "@/components/home/Partners";

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NewsTicker />
      {/* Hero Section */}
      <section className="relative pt-12 pb-32 lg:pt-20 lg:pb-40 overflow-hidden">
        {/* Background Gradients & Grid */}
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 -z-25"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] -z-20"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-brand-400/20 via-indigo-400/20 to-transparent rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4 animate-pulse duration-7000"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-400/10 via-blue-400/10 to-transparent rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl lg:col-span-7"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 text-sm font-medium mb-6 border border-brand-200 dark:border-brand-800/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
                </span>
                Recruitment Open for Fall 2026
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-5xl lg:text-[4.8rem] xl:text-[5.5rem] font-heading font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-6">
                Scholars <br />
                <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-emerald-500 dark:from-brand-400 dark:via-indigo-400 dark:to-emerald-400 bg-clip-text text-transparent">Influencers Club</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg text-slate-600 dark:text-slate-350 mb-8 leading-relaxed max-w-lg">
                A premier student-led organization at the University of Scholars. We operate under the motto <strong className="text-brand-600 dark:text-brand-400 font-bold">“Learn. Build. Influence.”</strong> to bridge the gap between academic learning and corporate expectations.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4">
                <Link href="/join" className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 flex items-center gap-2 hover:-translate-y-0.5 transform">
                  Join the Club <ArrowRight size={18} />
                </Link>
                <Link href="/events" className="bg-white hover:bg-slate-50 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 transform">
                  Explore Events
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block h-[500px] w-full lg:col-span-5 self-center"
            >
              {/* Main Compound Image Card with Premium Shadow and Hover Lift */}
              <motion.div 
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute inset-0 w-full h-full rounded-[2rem] p-1 border-2 border-white/20 dark:border-slate-800/80 shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950"
              >
                {/* Background Unsplash Image with custom modern opacity */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-[0.95] dark:opacity-[0.45] mix-blend-normal dark:mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                
                {/* Bottom Main Glassmorphic Overlay */}
                <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 p-5 rounded-2xl flex items-center gap-4 shadow-2xl border border-white/40 dark:border-slate-805/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 shadow-inner">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">Accelerate Your Career</h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Learn. Build. Influence.</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge 1: Top-Left Overlay */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="absolute -top-6 -left-6 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 py-3.5 px-4.5 rounded-2xl flex items-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/50 dark:border-slate-800/80 z-30 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-105 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shadow-sm shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-widest leading-none mb-1">Founded</h4>
                  <p className="text-xs font-extrabold text-slate-800 dark:text-white">26 April, 2023</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Mid-Right Overlay */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="absolute top-1/4 -right-6 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 py-3.5 px-4.5 rounded-2xl flex items-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/50 dark:border-slate-800/80 z-30 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-105 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shadow-sm shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-widest leading-none mb-1">Wings</h4>
                  <p className="text-xs font-extrabold text-slate-800 dark:text-white">6 Departments</p>
                </div>
              </motion.div>

              {/* Floating Badge 3: Bottom-Right Glow Icon */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center backdrop-blur-sm border border-brand-500/30 shadow-lg -z-0"
              >
                <Zap size={20} className="animate-pulse" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Active Members", value: "450+", icon: Users },
              { label: "Yearly Activities", value: "25+", icon: Calendar },
              { label: "Functional Wings", value: "6", icon: Award },
              { label: "Founded Year", value: "2023", icon: BookOpen },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 rounded-xl flex items-center justify-center mb-4">
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-brand-600 dark:text-brand-400 font-semibold tracking-wide uppercase text-sm mb-3">Our Core Philosophy</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white">Empowering Students to Become Competent Professionals</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10 rounded-3xl h-full border border-slate-150 dark:border-slate-800"
            >
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
                <Target size={28} />
              </div>
              <h4 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">Our Vision</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                To build a dynamic student ecosystem where individuals become industry-ready professionals through practical skills, real-world experience and strong professional networks, ultimately contributing effectively to the corporate and global workforce.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10 rounded-3xl h-full border border-slate-150 dark:border-slate-800"
            >
              <div className="w-14 h-14 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb size={28} />
              </div>
              <h4 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">Our Mission</h4>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300 text-sm">
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></span>
                  <span>Develop students' technical and soft skills aligned with real corporate requirements.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></span>
                  <span>Provide hands-on experience through projects, events and real-world simulations.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></span>
                  <span>Bridge the gap between academic learning and industry expectations.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></span>
                  <span>Establish strong collaboration with alumni, organizations and industry professionals.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></span>
                  <span>Create opportunities for internships, career guidance and job placement support.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></span>
                  <span>Organize workshops, seminars, training programs and professional events for continuous learning.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></span>
                  <span>Foster leadership, teamwork and professional growth among members.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Wings */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-brand-600 dark:text-brand-400 font-semibold tracking-wide uppercase text-sm mb-3">Departments</h2>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white">Discover Our Functional Wings</h3>
            </div>
            <Link href="/wings" className="hidden md:flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium">
              View All Wings <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "human-resource", name: "Human Resource Wing", desc: "Builds, manages, and develops human capital, coordinating recruitment, onboarding, and KPI-based member management.", color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" },
              { id: "partnership-collaboration", name: "Partnership & Collaboration Wing", desc: "Forges corporate sponsorships, strategic deals, corporate networks, and initiates university collaborations.", color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400" },
              { id: "marketing-branding", name: "Marketing & Branding Wing", desc: "Develops public image, creative graphic assets, social campaigns, media production, and public relations.", color: "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400" },
              { id: "event-program", name: "Event & Program Management Wing", desc: "Plans, organizes, and seamlessly executes skill bootcamps, major competitions, and logistics.", color: "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400" },
              { id: "career-placement", name: "Career & Placement Wing", desc: "Connects students with industry mentorship, resume guidance, mock panels, and exclusive internship pipelines.", color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" },
              { id: "finance", name: "Finance Wing", desc: "Ensures accountability, structures transaction receipts, designs budgets, and secures long-term sustainability.", color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400" },
            ].map((wing, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 overflow-hidden bg-white dark:bg-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 dark:bg-slate-700 dark:text-white ${wing.color}`}>
                    <Zap size={24} />
                  </div>
                  <h4 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{wing.name}</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">{wing.desc}</p>
                </div>
                <Link href={`/wings/${wing.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  Explore Wing <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/wings" className="inline-flex items-center gap-2 text-brand-600 font-medium">
              View All Wings <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      <Partners />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-600 dark:bg-brand-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-multiply opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-brand-100 text-lg mb-10 max-w-2xl mx-auto">
            Become a part of a vibrant community that nurtures talent, promotes innovation, and builds the leaders of tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/join" className="w-full sm:w-auto bg-white text-brand-700 hover:bg-brand-50 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg">
              Apply for Membership
            </Link>
            <Link href="/contact" className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
