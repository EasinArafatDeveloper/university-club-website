"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, FileText, Download, QrCode, Type, Layout, Palette, ArrowLeft, Loader2, Sparkles, Clock, Award, Users, MapPin, Calendar, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";

type TemplateType = "contest" | "winner" | "hiring" | "coming-soon" | "letterhead";

export default function DesignLabPage() {
  const [activeTab, setActiveTab] = useState<TemplateType>("contest");
  const [loading, setLoading] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  // Common State
  const [title, setTitle] = useState("Your Event Title");
  const [date, setDate] = useState("May 25, 2026");
  const [location, setLocation] = useState("Main Auditorium");
  const [qrUrl, setQrUrl] = useState("https://clc-club.com/join");
  const [subtitle, setSubtitle] = useState("Empowering the next generation");
  const [winnerName, setWinnerName] = useState("Winner Name");
  const [position, setPosition] = useState("Executive Member");
  const [letterBody, setLetterBody] = useState("Type your letter content here...");

  const handleDownload = async () => {
    if (posterRef.current === null) return;
    setLoading(true);
    try {
      const dataUrl = await toPng(posterRef.current, { cacheBust: true, quality: 1 });
      const link = document.createElement('a');
      link.download = `${activeTab}-design.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Design downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 mb-4 transition-colors text-sm font-medium">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-heading font-bold text-slate-900 dark:text-white flex items-center gap-3">
              Design Lab <Sparkles className="text-brand-500" />
            </h1>
          </div>
          <button 
            onClick={handleDownload}
            disabled={loading}
            className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Download size={20} />}
            {loading ? "Exporting..." : "Download Design"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Editors */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Layout size={20} className="text-brand-500" /> Select Template
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "contest", label: "Contest", icon: QrCode },
                  { id: "winner", label: "Winner", icon: Award },
                  { id: "hiring", label: "Hiring", icon: Users },
                  { id: "coming-soon", label: "Upcoming", icon: Clock },
                  { id: "letterhead", label: "Letterhead", icon: FileText },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as TemplateType)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                      activeTab === t.id 
                        ? 'bg-brand-600 border-brand-600 text-white' 
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-brand-300'
                    }`}
                  >
                    <t.icon size={24} />
                    <span className="text-xs font-bold uppercase">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Palette size={20} className="text-brand-500" /> Customize Content
              </h3>
              <div className="space-y-4">
                {activeTab !== "letterhead" && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Main Title</label>
                      <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Subtitle / Tagline</label>
                      <input 
                        type="text" 
                        value={subtitle} 
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 transition-all"
                      />
                    </div>
                  </>
                )}

                {(activeTab === "contest" || activeTab === "coming-soon") && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Date</label>
                      <input 
                        type="text" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Location</label>
                      <input 
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 transition-all"
                      />
                    </div>
                  </div>
                )}

                {activeTab === "contest" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Registration Link (QR)</label>
                    <input 
                      type="text" 
                      value={qrUrl} 
                      onChange={(e) => setQrUrl(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 transition-all"
                    />
                  </div>
                )}

                {activeTab === "winner" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Winner Name</label>
                    <input 
                      type="text" 
                      value={winnerName} 
                      onChange={(e) => setWinnerName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 transition-all"
                    />
                  </div>
                )}

                {activeTab === "hiring" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Position Name</label>
                    <input 
                      type="text" 
                      value={position} 
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 transition-all"
                    />
                  </div>
                )}

                {activeTab === "letterhead" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Letter Content</label>
                    <textarea 
                      rows={12}
                      value={letterBody} 
                      onChange={(e) => setLetterBody(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 transition-all resize-none"
                    ></textarea>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Live Preview */}
          <div className="lg:col-span-8">
            <div className="sticky top-28 space-y-4">
              <div className="flex items-center justify-between px-4">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Live Preview</span>
                <span className="text-xs text-slate-400">Resolution: High Quality (PNG)</span>
              </div>
              
              <div className="bg-slate-200 dark:bg-slate-800 rounded-[32px] p-8 md:p-12 shadow-inner overflow-hidden flex justify-center">
                
                {/* POSTER CANVAS (FB SIZE: 1200x630 or 1080x1080) */}
                <div 
                  ref={posterRef}
                  className={`bg-white shadow-2xl relative overflow-hidden select-none ${
                    activeTab === "letterhead" ? "w-[595px] h-[842px]" : "w-[800px] h-[800px]"
                  }`}
                  style={{ transform: 'scale(1)', transformOrigin: 'top center' }}
                >
                  
                  {/* CONTEST TEMPLATE */}
                  {activeTab === "contest" && (
                    <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-12 text-white relative">
                      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                      <div className="absolute top-12 left-12 flex items-center gap-3">
                        <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center font-bold text-2xl">C</div>
                        <span className="font-heading font-bold text-xl tracking-tighter">CAREER & LEADERSHIP CLUB</span>
                      </div>
                      <div className="z-10 text-center">
                        <motion.span layoutId="badge" className="inline-block px-4 py-1 bg-brand-600 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">REGISTRATION OPEN</motion.span>
                        <h2 className="text-6xl font-heading font-black mb-4 leading-tight uppercase italic">{title}</h2>
                        <p className="text-xl text-slate-400 mb-12 font-medium">{subtitle}</p>
                        <div className="flex items-center justify-center gap-12 mb-16">
                          <div className="text-center">
                            <Calendar className="mx-auto mb-2 text-brand-500" size={28} />
                            <p className="text-lg font-bold">{date}</p>
                          </div>
                          <div className="w-px h-12 bg-slate-800"></div>
                          <div className="text-center">
                            <MapPin className="mx-auto mb-2 text-brand-500" size={28} />
                            <p className="text-lg font-bold">{location}</p>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-3xl inline-block shadow-2xl border-4 border-brand-600">
                           <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrUrl}`} 
                            alt="QR Code" 
                            className="w-32 h-32"
                           />
                        </div>
                        <p className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Scan to Register</p>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-600"></div>
                    </div>
                  )}

                  {/* WINNER TEMPLATE */}
                  {activeTab === "winner" && (
                    <div className="w-full h-full bg-brand-600 flex flex-col items-center justify-center p-12 text-white relative">
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                      <div className="z-10 text-center flex flex-col items-center">
                        <Award size={80} className="text-white mb-8" />
                        <h3 className="text-2xl font-black uppercase tracking-[0.3em] mb-4">CONGRATULATIONS</h3>
                        <div className="w-24 h-1 bg-white mb-12"></div>
                        <div className="w-48 h-48 rounded-full border-8 border-white p-2 mb-8 bg-slate-900 overflow-hidden">
                           <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale" />
                        </div>
                        <h2 className="text-5xl font-heading font-black mb-2 uppercase italic tracking-tighter">{winnerName}</h2>
                        <p className="text-2xl font-medium opacity-80 mb-12">Winner of {title}</p>
                        <div className="px-8 py-3 border-2 border-white/50 rounded-full font-bold uppercase tracking-widest text-sm italic">
                          Official Champion 2026
                        </div>
                      </div>
                    </div>
                  )}

                  {/* HIRING TEMPLATE */}
                  {activeTab === "hiring" && (
                    <div className="w-full h-full bg-slate-900 flex flex-col p-16 text-white relative">
                      <div className="z-10 flex flex-col justify-center h-full">
                         <span className="text-brand-500 font-black text-2xl mb-2 uppercase tracking-widest">WE ARE</span>
                         <h2 className="text-9xl font-heading font-black mb-8 leading-[0.8] uppercase italic">HIRING</h2>
                         <div className="h-2 w-32 bg-brand-600 mb-12"></div>
                         <h3 className="text-4xl font-bold mb-4">{position}</h3>
                         <p className="text-xl text-slate-400 mb-12 max-w-md">{subtitle}</p>
                         <button className="bg-brand-600 w-fit px-12 py-5 rounded-2xl font-black uppercase italic tracking-widest text-xl">APPLY NOW</button>
                      </div>
                      <div className="absolute right-0 bottom-0 w-1/2 h-full bg-brand-600 -skew-x-12 translate-x-20 z-0"></div>
                      <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" className="absolute right-0 bottom-0 w-2/3 h-2/3 object-cover z-0 grayscale mix-blend-overlay opacity-50" />
                    </div>
                  )}

                  {/* COMING SOON TEMPLATE */}
                  {activeTab === "coming-soon" && (
                    <div className="w-full h-full bg-indigo-950 flex flex-col items-center justify-center p-12 text-white relative">
                       <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-transparent"></div>
                       <div className="z-10 text-center">
                          <h3 className="text-brand-500 font-black text-xl mb-4 tracking-[0.4em]">STAY TUNED</h3>
                          <h2 className="text-8xl font-heading font-black mb-8 uppercase tracking-tighter leading-none italic">{title}</h2>
                          <div className="flex gap-8 justify-center mb-12">
                             <div className="bg-white/10 backdrop-blur-xl border border-white/20 w-32 h-32 rounded-3xl flex flex-col items-center justify-center">
                                <span className="text-4xl font-black">15</span>
                                <span className="text-xs uppercase font-bold tracking-widest text-brand-400">Days</span>
                             </div>
                             <div className="bg-white/10 backdrop-blur-xl border border-white/20 w-32 h-32 rounded-3xl flex flex-col items-center justify-center">
                                <span className="text-4xl font-black">08</span>
                                <span className="text-xs uppercase font-bold tracking-widest text-brand-400">Hours</span>
                             </div>
                          </div>
                          <p className="text-2xl font-medium opacity-60 italic">{subtitle}</p>
                       </div>
                    </div>
                  )}

                  {/* LETTERHEAD TEMPLATE */}
                  {activeTab === "letterhead" && (
                    <div className="w-full h-full bg-white p-16 flex flex-col text-slate-900 font-serif">
                       {/* Header */}
                       <div className="flex justify-between items-start border-b-2 border-brand-600 pb-8 mb-12">
                          <div className="flex items-center gap-4">
                             <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center font-bold text-white text-3xl">C</div>
                             <div>
                                <h1 className="text-2xl font-bold font-sans tracking-tighter">CAREER & LEADERSHIP CLUB</h1>
                                <p className="text-[10px] font-sans uppercase font-bold tracking-widest text-slate-500">Innovation & Excellence</p>
                             </div>
                          </div>
                          <div className="text-right font-sans text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
                             <p>University Campus, Road 04</p>
                             <p>contact@clc-club.com</p>
                             <p>+880 1234 567890</p>
                          </div>
                       </div>
                       
                       {/* Body */}
                       <div className="flex-1">
                          <div className="flex justify-between items-center mb-12 font-sans text-sm font-bold">
                             <p>Ref: CLC/DOC/2026/04</p>
                             <p>Date: {new Date().toLocaleDateString()}</p>
                          </div>
                          <div className="whitespace-pre-wrap leading-relaxed text-slate-800 text-lg">
                             {letterBody}
                          </div>
                       </div>

                       {/* Footer */}
                       <div className="mt-12 pt-12 border-t border-slate-100 flex justify-between items-end">
                          <div className="font-sans">
                             <div className="w-32 h-px bg-slate-400 mb-2"></div>
                             <p className="text-xs font-bold uppercase tracking-widest">President Signature</p>
                             <p className="text-[10px] text-slate-400">Career & Leadership Club</p>
                          </div>
                          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                             <div className="w-8 h-8 rounded-full bg-brand-600/10 border border-brand-600/20"></div>
                          </div>
                       </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-heading { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </div>
  );
}
