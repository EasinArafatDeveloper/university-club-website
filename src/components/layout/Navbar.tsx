"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Wings", path: "/wings" },
  { name: "Career", path: "/career" },
  { name: "Events", path: "/events" },
  { name: "Contests", path: "/contests" },
  { name: "Members", path: "/members" },
  { name: "Alumni", path: "/alumni" },
  { name: "Gallery", path: "/gallery" },
  { name: "Notice", path: "/notices" },
  { name: "Contact", path: "/contact" },
];

const wingsList = [
  { name: "Career Development", path: "/wings/career-development" },
  { name: "Leadership", path: "/wings/leadership" },
  { name: "Event Management", path: "/wings/event-management" },
  { name: "Media & Content", path: "/wings/media-content" },
  { name: "Public Relations", path: "/wings/public-relations" },
  { name: "Entrepreneurship", path: "/wings/entrepreneurship" },
  { name: "Research & Innovation", path: "/wings/research-innovation" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasNewNotice, setHasNewNotice] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Check for new notices
    const checkNotices = async () => {
      try {
        const res = await fetch("/api/notices");
        const data = await res.json();
        if (data && data.length > 0) {
          const latestNoticeDate = new Date(data[0].createdAt).getTime();
          const lastReadDate = localStorage.getItem("lastReadNotice");
          
          if (!lastReadDate || latestNoticeDate > new Date(lastReadDate).getTime()) {
            setHasNewNotice(true);
          }
        }
      } catch (err) {
        console.error("Notice check failed", err);
      }
    };

    checkNotices();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm dark:bg-slate-900/80"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white font-heading font-bold text-xl">
                C
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Career & <span className="text-brand-600">Leadership</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navLinks.slice(0, 8).map((link) => {
              if (link.name === "Wings") {
                return (
                  <div key={link.name} className="relative group">
                    <Link
                      href={link.path}
                      className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname.startsWith(link.path)
                          ? "text-brand-600 bg-brand-50 dark:bg-brand-900/20 dark:text-brand-400"
                          : "text-slate-600 hover:text-brand-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      {link.name} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                    </Link>
                    <div className="absolute left-0 w-56 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                      {wingsList.map((wing) => (
                        <Link
                          key={wing.name}
                          href={wing.path}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                          {wing.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    pathname === link.path
                      ? "text-brand-600 bg-brand-50 dark:bg-brand-900/20 dark:text-brand-400"
                      : "text-slate-600 hover:text-brand-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.name}
                  {link.name === "Notice" && hasNewNotice && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
                  )}
                </Link>
              );
            })}
            
            {/* Dropdown for remaining links to save space */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 relative">
                More <ChevronDown size={16} />
                {hasNewNotice && (
                   <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
                )}
              </button>
              <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                {navLinks.slice(8).map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-700 relative"
                  >
                    {link.name}
                    {link.name === "Notice" && hasNewNotice && (
                      <span className="absolute top-2 right-4 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
            
            {session ? (
              <div className="relative group ml-4">
                <button className="flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs">
                    {session.user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="hidden sm:inline">{session.user?.name}</span>
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                  <Link href="/dashboard" className="block px-4 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-700">
                    Dashboard
                  </Link>
                  <button onClick={() => signOut()} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-4 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-md shadow-brand-500/20"
              >
                Login / Join
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-slate-700 focus:outline-none p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-base font-medium relative ${
                    pathname === link.path
                      ? "text-brand-600 bg-brand-50 dark:bg-brand-900/20 dark:text-brand-400"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.name}
                  {link.name === "Notice" && hasNewNotice && (
                    <span className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                {session ? (
                  <div className="space-y-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center bg-brand-50 text-brand-700 px-5 py-3 rounded-md text-base font-medium hover:bg-brand-100"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { setIsOpen(false); signOut(); }}
                      className="block w-full text-center bg-red-50 text-red-600 px-5 py-3 rounded-md text-base font-medium hover:bg-red-100"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-brand-600 text-white px-5 py-3 rounded-md text-base font-medium hover:bg-brand-700"
                  >
                    Login / Join
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
