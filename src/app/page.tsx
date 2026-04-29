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
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 -z-20"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-400/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 text-sm font-medium mb-6 border border-brand-200 dark:border-brand-800/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
                </span>
                Recruitment Open for Fall 2026
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-heading font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                Shape Your <br />
                <span className="text-gradient">Future Today</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-lg">
                Join the premier university club dedicated to empowering students through leadership, career growth, and innovation. Build your network, develop your skills, and lead with purpose.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4">
                <Link href="/join" className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 flex items-center gap-2">
                  Join the Club <ArrowRight size={18} />
                </Link>
                <Link href="/events" className="bg-white hover:bg-slate-50 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-full font-medium transition-all">
                  Explore Events
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block h-[600px] w-full"
            >
              {/* Abstract Hero Image Representation using geometric shapes/glassmorphism */}
              <div className="absolute inset-0 w-full h-full glass-card rounded-3xl border-white/40 shadow-2xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-brand-100 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-80 mix-blend-overlay dark:opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                <div className="absolute bottom-8 left-8 right-8 glass-card !bg-white/90 dark:!bg-slate-900/90 p-6 rounded-2xl flex items-center gap-4 shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-slate-900 dark:text-white">Accelerate Your Career</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Join 5,000+ alumni at top companies</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Active Members", value: "850+", icon: Users },
              { label: "Yearly Events", value: "45+", icon: Calendar },
              { label: "Specialized Wings", value: "7", icon: Award },
              { label: "Alumni Network", value: "5k+", icon: BookOpen },
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
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white">Empowering the Next Generation of Leaders</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10 rounded-3xl"
            >
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
                <Target size={28} />
              </div>
              <h4 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">Our Mission</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                To foster a dynamic environment where students can discover their potential, develop critical professional skills, and connect with industry leaders. We bridge the gap between academic learning and corporate requirements.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10 rounded-3xl"
            >
              <div className="w-14 h-14 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb size={28} />
              </div>
              <h4 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">Our Vision</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                To be the most impactful student organization nationwide, producing visionary leaders, successful entrepreneurs, and outstanding professionals who make meaningful contributions to society.
              </p>
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
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white">Discover Our Wings</h3>
            </div>
            <Link href="/wings" className="hidden md:flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium">
              View All Wings <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Career Development", desc: "Resume building, interview prep, and corporate networking.", color: "bg-blue-50 text-blue-600" },
              { name: "Leadership", desc: "Workshops and bootcamps to build strong, resilient leaders.", color: "bg-indigo-50 text-indigo-600" },
              { name: "Event Management", desc: "Organizing seminars, summits, and large-scale competitions.", color: "bg-violet-50 text-violet-600" },
            ].map((wing, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 overflow-hidden bg-white dark:bg-slate-800"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 dark:bg-slate-700 dark:text-white ${wing.color}`}>
                  <Zap size={24} />
                </div>
                <h4 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{wing.name} Wing</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{wing.desc}</p>
                <Link href={`/wings/${wing.name.toLowerCase().replace(' ', '-')}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  Explore <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
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
