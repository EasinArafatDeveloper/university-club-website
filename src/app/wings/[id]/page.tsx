"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Calendar, Target, Award, Play } from "lucide-react";

export default function WingDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const wingsData: Record<string, any> = {
    "human-resource": {
      name: "Human Resource Wing (HRW)",
      head: "Sarah Jenkins",
      members: 75,
      description: "Responsible for building, managing and developing the club's human capital. It oversees recruitment, onboarding, database management, and KPI evaluations.",
      details: "The HR Wing is the structural backbone of SIC. It manages overall recruitment drives, coordinates comprehensive member onboarding sessions, evaluates individual member performances through monthly KPI matrices, resolves internal conflicts, and implements strictly defined disciplinary compliance as mandated by the Core Committee.",
      activities: ["Recruitment Drives", "Member Onboarding Sessions", "Monthly KPI Performance Reviews", "Disciplinary Compliance Audits", "Leadership & Talent Management"],
      color: "bg-blue-600",
      lightColor: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    "partnership-collaboration": {
      name: "Partnership & Collaboration Wing (PCW)",
      head: "Michael Chang",
      members: 50,
      description: "Builds strategic relationships with external organizations, negotiates corporate sponsorships, drafts proposals, and maintains alumni networking.",
      details: "PCW serves as the primary liaison between Scholars Influencers Club and the corporate landscape. Members build robust networks with alumni, secure sponsorships, pitch projects to corporate partners, negotiate MoUs, and manage relationships with external student bodies.",
      activities: ["Corporate Sponsorship Pitches", "Alumni Networking Programs", "Strategic MoU Drafting", "Industry Outreach & Meetings", "Cross-University Collaborations"],
      color: "bg-indigo-600",
      lightColor: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
    },
    "marketing-branding": {
      name: "Marketing & Branding Wing (MBW)",
      head: "Emily Rodriguez",
      members: 90,
      description: "Builds public image, maintains brand identity, creates engaging social content calendars, manages public relations, media archiving, and promo campaigns.",
      details: "MBW drives the brand awareness and public representation of SIC. It manages all official social media pipelines, publishes content calendars, produces graphic designs, records official photos and videos during summits, drafts press releases, and promotes events to maximize engagement.",
      activities: ["Social Media & PR Management", "Graphic & UI/UX Design Assets", "Copywriting & Content Strategy", "Archival Photography & Videography", "Promotional Campaigns"],
      color: "bg-pink-600",
      lightColor: "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
    },
    "event-program": {
      name: "Event & Program Management Wing (EPMW)",
      head: "Tanvir Rahman",
      members: 110,
      description: "Coordinates logistics, plans concept roadmaps, manages participant registrations, schedules timelines, and executes workshops, seminars, and programs.",
      details: "EPMW is the logistical engine of SIC, planning, structuring, and executing all club programs. Members gain hands-on event planning expertise, handle venue coordination, curate operational timelines, draft budgeting requisitions, manage attendees, and write post-event reports.",
      activities: ["Concept Planning & Roadmaps", "On-Ground Venue Execution", "Participant Registration Hub", "Event Logistical Audits", "Post-Event Reporting Frameworks"],
      color: "bg-violet-600",
      lightColor: "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
    },
    "career-placement": {
      name: "Career & Placement Wing (CPW)",
      head: "Priya Patel",
      members: 80,
      description: "Prepares members for careers through structured bootcamps, resume-building clinics, mock interviews, placement support, and corporate internship pipelines.",
      details: "CPW directly addresses corporate readiness. It organizes resume refining workshops, schedules mock panels with corporate heads, establishes direct pipelines for internships, and delivers targeted training in hard and soft skills requested by employers.",
      activities: ["Resume Refining Clinics", "Mock Corporate Panel Interviews", "Exclusive Internship Pipelines", "Hard & Soft Skill Bootcamps", "Industry Mentor Partnerships"],
      color: "bg-emerald-600",
      lightColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
    },
    "finance": {
      name: "Finance Wing (FW)",
      head: "Sajjad Hossain",
      members: 40,
      description: "Structures annual budgets, records expenses and incoming funds, enforces transparency, monitors financial compliance, and audits transactions.",
      details: "Led directly under the Core Leadership's Treasurer, FW guarantees complete financial accountability. It structures and reviews event budgets, logs all transaction invoices, reconciles corporate sponsorship cashflows, conducts internal audits, and produces detailed annual reports.",
      activities: ["Annual Budget Structuring", "Transaction & Invoice Audits", "Sponsorship Reconciliation", "Financial Compliance Audits", "Detailed Annual Reporting"],
      color: "bg-yellow-600",
      lightColor: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
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
