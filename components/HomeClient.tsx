"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTelemetry } from '@/hooks/useTelemetry';
import { Hero } from './Hero';
import { SolarSystemProjects } from './SolarSystemProjects';
import { ExperienceTimeline } from './ExperienceTimeline';
import { ClientStats } from './ClientStats';
import { personalProfile } from '@/lib/personal';
import { AboutSection } from './AboutSection';
import { Navigation } from './Navigation';
import { CelebrationIntro } from './BalloonIntro';
import { ContactSection } from './ContactSection';
import { ParallaxBackground } from './ParallaxBackground';
import { ScrollToTop } from './ScrollToTop';

export function HomeClient() {
  const { track, fingerprint } = useTelemetry();
  const [showAdmin, setShowAdmin] = useState(false);
  const [showBalloon, setShowBalloon] = useState(true);
  const adminFingerprint = personalProfile.adminFingerprint;

  useEffect(() => {
    let revealTimeout: ReturnType<typeof setTimeout> | undefined;
    if (fingerprint && adminFingerprint && fingerprint === adminFingerprint) {
      revealTimeout = setTimeout(() => setShowAdmin(true), 400);
    } else {
      setShowAdmin(false);
    }

    return () => {
      if (revealTimeout) {
        clearTimeout(revealTimeout);
      }
    };
  }, [fingerprint, adminFingerprint]);

  useEffect(() => {
    const timeout = setTimeout(() => setShowBalloon(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const handleResumeDownload = () => track('resume', { interactionType: 'resume-download' });

  return (
    <div className="relative">
      <ScrollToTop />
      <ParallaxBackground />
      <Navigation />
      {showBalloon ? <CelebrationIntro /> : null}
      <Hero onResumeDownload={handleResumeDownload} />
      <AboutSection />
      <SolarSystemProjects />
      <ExperienceTimeline />
      <ClientStats />
      <ContactSection />
      <footer id="footer" className="border-t border-slate-200 bg-slate-50/50 py-12 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                © {new Date().getFullYear()} <strong className="text-slate-900 dark:text-slate-100">Amarjyoti Patra</strong>
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                Crafted with Next.js, Three.js, Framer Motion & lots of ☕
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {showAdmin ? (
                <Link
                  href="/admin"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-emerald-500/60 bg-emerald-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700 shadow-sm transition hover:border-emerald-400 hover:bg-emerald-100 hover:shadow-md dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:bg-emerald-500/20 dark:hover:text-white"
                >
                  <span className="absolute inset-0 -translate-x-full bg-emerald-400/20 transition-transform duration-300 group-hover:translate-x-0" />
                  <span className="relative">🔐</span>
                  <span className="relative">Admin Dashboard</span>
                </Link>
              ) : null}
              <a
                href="https://github.com/amarjyotipatra"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-300 bg-white px-5 py-2 text-xs font-medium uppercase tracking-[0.3em] text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800/60"
              >
                ⭐ Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
