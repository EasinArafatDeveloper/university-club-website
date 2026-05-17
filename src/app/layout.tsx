import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Scholars Influencers Club (SIC)",
  description: "A centralized digital platform for the Scholars Influencers Club (SIC) at the University of Scholars. Empowering students through practical skills, industrial exposure, and the motto: Learn. Build. Influence.",
  openGraph: {
    title: "Scholars Influencers Club (SIC)",
    description: "A centralized digital platform for the Scholars Influencers Club (SIC) at the University of Scholars. Empowering students through practical skills, industrial exposure, and the motto: Learn. Build. Influence.",
    url: "https://scholars-influencers-club.vercel.app",
    siteName: "Scholars Influencers Club (SIC)",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
