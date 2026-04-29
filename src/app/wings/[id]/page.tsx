"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Calendar, Target, Award, Play } from "lucide-react";

export default function WingDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const wingsData: Record<string, any> = {
    "career-development": {
      name: "Career Development Wing",
      head: "Alex Johnson",
      members: 120,
      description: "Focuses on resume building, interview preparation, and connecting students with top-tier corporate opportunities.",
      details: "Our Career Development Wing is dedicated to bridging the gap between academia and the professional world. We partner with industry leaders to provide exclusive internships, full-time job placements, and personalized career coaching.",
      activities: ["Resume Revamp Workshops", "Mock Interview Sessions", "Corporate Networking Dinners", "1-on-1 Career Counseling"],
      color: "bg-blue-600",
      lightColor: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    "leadership": {
      name: "Leadership Wing",
      head: "Samantha Lee",
      members: 85,
      description: "Organizes workshops, bootcamps, and seminars aimed at building strong, resilient, and visionary leaders.",
      details: "The Leadership Wing focuses on soft skills, emotional intelligence, and strategic thinking. We train the next generation of executives and founders through intensive bootcamps and mentorship from experienced industry veterans.",
      activities: ["Annual Leadership Summit", "Executive Coaching", "Public Speaking Mastery", "Conflict Resolution Workshops"],
      color: "bg-indigo-600",
      lightColor: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
    },
    "event-management": {
      name: "Event Management Wing",
      head: "David Chen",
      members: 150,
      description: "The backbone of our operations, responsible for seamlessly executing summits, seminars, and large-scale competitions.",
      details: "From logistics and vendor management to on-the-ground execution, the Event Management Wing handles the A to Z of our club's activities. Members gain hands-on project management and operational experience.",
      activities: ["Logistics Planning", "Vendor Negotiations", "On-site Execution", "Budget Management"],
      color: "bg-violet-600",
      lightColor: "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
    },
    "media-content": {
      name: "Media & Content Wing",
      head: "Maria Garcia",
      members: 65,
      description: "Creative minds driving our digital presence through stunning graphics, engaging videos, and compelling copy.",
      details: "Our creative powerhouse. The Media & Content Wing manages our social media channels, website content, and promotional materials. We produce high-quality videos, graphics, and articles to amplify the club's impact.",
      activities: ["Video Production", "Graphic Design", "Social Media Management", "Content Strategy"],
      color: "bg-pink-600",
      lightColor: "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
    },
    "public-relations": {
      name: "Public Relations Wing",
      head: "James Wilson",
      members: 45,
      description: "Managing external communications, securing sponsorships, and building relationships with industry partners.",
      details: "The face of our club to the corporate world. PR members negotiate sponsorships, manage media relations, and build lasting partnerships with companies and other student organizations nationwide.",
      activities: ["Sponsorship Acquisition", "Corporate Communications", "Partnership Building", "Media Relations"],
      color: "bg-orange-600",
      lightColor: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
    },
    "entrepreneurship": {
      name: "Entrepreneurship Wing",
      head: "Priya Patel",
      members: 70,
      description: "Nurturing startup ideas, providing incubation resources, and hosting business pitch competitions.",
      details: "For the builders and innovators. We provide resources, mentorship, and funding opportunities for student founders. The wing hosts incubators and pitch competitions to turn ideas into viable businesses.",
      activities: ["Startup Incubator", "Pitch Deck Clinics", "Founder Networking", "VC Panels"],
      color: "bg-yellow-500",
      lightColor: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
    },
    "research-innovation": {
      name: "Research & Innovation Wing",
      head: "Robert Taylor",
      members: 55,
      description: "Driving forward-thinking projects, publishing papers, and exploring cutting-edge industry trends.",
      details: "We explore the future. This wing conducts deep-dive research into emerging tech, market trends, and economic shifts. Members publish thought leadership pieces and work on innovative tech projects.",
      activities: ["Trend Analysis", "Whitepaper Publication", "Tech Prototypes", "Industry Research Seminars"],
      color: "bg-emerald-600",
      lightColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
    }
  };

  const wing = wingsData[id];

  if (!wing) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <h1 className="text-4xl font-heading font-bold mb-4 text-slate-900 dark:text-white">Wing Not Found</h1>
        <p className="text-slate-500 mb-8">The department you are looking for does not exist.</p>
        <Link href="/wings" className="bg-brand-600 text-white px-6 py-3 rounded-xl font-medium">
          Back to All Wings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className={`${wing.color} text-white pt-16 pb-24 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -z-0 translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/wings" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Back to Wings
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{wing.name}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
              {wing.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl"
            >
              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">About the Wing</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                {wing.details}
              </p>

              <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                Core Activities
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {wing.activities.map((activity: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${wing.lightColor}`}>
                      <Play size={10} className="ml-0.5" />
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{activity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-brand-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div>
                <h3 className="text-2xl font-heading font-bold mb-2">Want to join this wing?</h3>
                <p className="text-brand-100">Recruitment is currently open for the Fall semester.</p>
              </div>
              <Link href="/join" className="shrink-0 bg-white text-brand-700 px-8 py-3 rounded-xl font-bold hover:bg-brand-50 transition-colors shadow-md">
                Apply Now
              </Link>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl"
            >
              <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-6">Wing Overview</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${wing.lightColor}`}>
                    <Target size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Wing Head</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{wing.head}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${wing.lightColor}`}>
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Active Members</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{wing.members}+</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${wing.lightColor}`}>
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Weekly Meetings</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">Every Thursday</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
