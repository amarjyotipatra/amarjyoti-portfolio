"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { ThreeBackground } from "@/components/ThreeBackground";
import { SolarSystemProjects } from "@/components/SolarSystemProjects";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { useUISkinStore } from "@/store/uiSkin";
import { FooterAnalytics } from './FooterAnalytics';
import { ContactSection } from './ContactSection';
import { useTelemetry } from '@/hooks/useTelemetry';
import { ScrollToTop } from './ScrollToTop';
import { CyberIntro } from './CyberIntro';
import { ScrollEndCelebration } from './ScrollEndCelebration';
import { ResumeCounterBadge } from './ResumeCounterBadge';

// --- Components ---

const GlassCard = ({ children, className = "", hoverEffect = true }: { children: React.ReactNode; className?: string; hoverEffect?: boolean }) => (
  <motion.div
    whileHover={hoverEffect ? { y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" } : {}}
    className={`
      relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl
      transition-colors duration-300
      ${className}
    `}
  >
    {/* Noise Texture Overlay */}
    <div className="pointer-events-none absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const PillNav = ({ onScroll, activeSection }: { onScroll: (id: string) => void, activeSection: string }) => (
  <motion.nav
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="fixed top-6 left-1/2 z-50 -translate-x-1/2 w-fit max-w-[95vw]"
  >
    <div className="flex items-center gap-0.5 sm:gap-1 rounded-full border border-white/10 bg-black/50 p-1 backdrop-blur-md shadow-xl shadow-black/20 overflow-x-auto no-scrollbar">
      {[
        { label: "Home", id: "home" },
        { label: "Work", id: "projects" },
        { label: "Journey", id: "experience", mobileLabel: "Exp" },
        { label: "Contact", id: "contact" }
      ].map((item) => (
        <button
          key={item.label}
          onClick={() => onScroll(item.id)}
          className={`
            rounded-full px-2 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-sm font-medium transition-all whitespace-nowrap
            ${activeSection === item.id ? "bg-white text-black shadow-sm" : "text-slate-400 hover:text-white hover:bg-white/10"}
          `}
        >
          {item.mobileLabel ? (
            <>
              <span className="sm:hidden">{item.mobileLabel}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </>
          ) : (
            item.label
          )}
        </button>
      ))}
    </div>
  </motion.nav>
);

export function HomeClient() {
  const setSkin = useUISkinStore((state) => state.setSkin);
  const { track } = useTelemetry();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Set skin to 'cyberwave' for the blue/purple aesthetic
    setSkin('cyberwave');
  }, [setSkin]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleResumeDownload = () => track('resume', { interactionType: 'resume-download' });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    } else if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-blue-500/30 relative">
      <CyberIntro />
      <ScrollToTop />
      <ScrollEndCelebration />
      {/* 3D Background Layer */}
      <div className="fixed inset-0 z-0">
        <ThreeBackground />
      </div>

      {/* Gradient Overlays to blend 3D with new dark theme */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/90" />
      
      <PillNav onScroll={scrollToSection} activeSection={activeSection} />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section id="home" className="text-center mb-32 min-h-[80vh] flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400 backdrop-blur-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Open to work
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white mb-8">
              Crafting <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Digital Reality
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed">
              I'm Amarjyoti, a Full Stack Architect focused on building intuitive, 
              high-performance web experiences that feel like magic.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
              >
                View Projects
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Contact Me
              </button>
              <a
                href="/resume/Amarjyoti_Patra_3_4years.pdf"
                download="Amarjyoti_Patra_Resume.pdf"
                onClick={handleResumeDownload}
                className="group relative inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
              >
                Resume
                <ResumeCounterBadge />
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </motion.div>
        </section>

        {/* Solar System Projects - Wrapped in Glass Container */}
        <section id="projects" className="mb-32">
          <div className="flex items-center justify-between mb-8 px-4">
            <h2 className="text-2xl font-semibold text-white">Interactive Projects</h2>
            <span className="text-sm text-slate-400">Scroll to explore &rarr;</span>
          </div>
          
          <GlassCard className="!p-0 !bg-black/20 !border-white/5">
             {/* We render the original SolarSystemProjects here. 
                 It has its own internal padding/layout, so we just wrap it. */}
             <div className="scale-90 origin-top">
                <SolarSystemProjects />
             </div>
          </GlassCard>
        </section>

        {/* Experience Timeline - Wrapped */}
        <section id="experience">
          <div className="flex items-center justify-between mb-8 px-4">
            <h2 className="text-2xl font-semibold text-white">Journey</h2>
          </div>
          <div className="relative">
             {/* Custom styling override for the timeline to fit dark theme better */}
             <div className="[&_h2]:text-white [&_p]:text-slate-400 [&_article]:bg-white/5 [&_article]:border-white/10 [&_article]:backdrop-blur-md">
                <ExperienceTimeline />
             </div>
          </div>
        </section>

        <ContactSection />

      </main>

      <footer id="footer" className="relative mt-32 py-20 overflow-hidden">
        {/* Gradient Background to blend with 3D scene */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#050505]/90 to-transparent pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Amarjyoti Patra</h3>
                <p className="text-sm text-slate-400 max-w-xs">
                  Building digital experiences that merge creativity with engineering precision.
                </p>
              </div>
              
              <div className="flex flex-col gap-2">
                <p className="text-xs text-slate-500">
                  © {new Date().getFullYear()} All rights reserved.
                </p>
                <p className="text-[10px] text-slate-600 font-mono">
                  SYSTEM_ID: AP-PORTFOLIO-V4 // STATUS: ONLINE
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/amarjyotipatra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Star on GitHub
                </a>
              </div>
            </div>
            
            <FooterAnalytics />
          </div>

          {/* End of File Marker */}
          <div className="mt-16 flex items-center justify-center gap-4 opacity-30">
            <div className="h-px w-12 bg-white"></div>
            <span className="font-mono text-xs tracking-[0.5em] text-white">END OF TRANSMISSION</span>
            <div className="h-px w-12 bg-white"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
