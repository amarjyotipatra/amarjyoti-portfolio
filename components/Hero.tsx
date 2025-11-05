"use client";

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { ThreeBackground } from './ThreeBackground';
import { useUISkinStore, type ThemeSkin, type UISkinState } from '@/store/uiSkin';
import { SkinSwitcher } from './SkinSwitcher';
import { WelcomeAudio } from './WelcomeAudio';
import { ContactStrip } from './ContactStrip';
import { ImageCarousel } from './ImageCarousel';

const heroCopy: Record<ThemeSkin, { heading: string; tagline: string }> = {
  cyberwave: {
    heading: "Full Stack Developer",
    tagline: 'Dynamic and results-driven Full Stack Developer with 3.3 years of experience designing, developing, and deploying scalable web applications using Java, Spring Boot, Node.js, and React.js. Proven expertise in optimizing application performance, enhancing security, and architecting microservices-based solutions.'
  },
  solarflare: {
    heading: 'Building Scalable Solutions',
    tagline: 'Adept at collaborating in agile teams, leveraging cloud platforms (AWS, Azure), and delivering robust, maintainable code. Seeking to contribute technical excellence and innovative problem-solving to a forward-thinking product team.'
  },
  stealth: {
    heading: 'Code. Deploy. Innovate.',
    tagline: 'Full Stack Developer with expertise in Java, Spring Boot, Node.js, and React.js. Specialized in microservices architecture, cloud platforms, and delivering high-performance applications.'
  }
};

type HeroProps = {
  onResumeDownload?: () => void;
};

export function Hero({ onResumeDownload }: HeroProps) {
  const skin = useUISkinStore((state: UISkinState) => state.skin);
  const [showAudio, setShowAudio] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAudio(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const copy = useMemo(() => heroCopy[skin as ThemeSkin], [skin]);

  return (
    <section className="relative overflow-hidden py-24 pt-32 sm:py-32 sm:pt-40">
      <ThreeBackground />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 flex-1"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-700 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-300">
            <span>Full Stack Developer</span>
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            <span>3.3 Years Experience</span>
          </div>
          <motion.h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-6xl dark:text-white" layout>
            {copy.heading}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-base text-slate-600 sm:text-lg dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {copy.tagline}
          </motion.p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/resume/Amarjyoti_Patra_3_4years.pdf"
              download
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-emerald-400/70 bg-emerald-100/60 px-6 py-3 text-sm font-semibold text-emerald-700 backdrop-blur transition hover:border-emerald-300 hover:bg-emerald-200/70 hover:text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:text-white"
              onClick={() => onResumeDownload?.()}
            >
              <span className="absolute inset-0 translate-y-full bg-emerald-500/30 transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative">📄 Download Resume</span>
            </a>
            {showAudio && <WelcomeAudio />}
          </div>
          <div className="mt-12">
            <SkinSwitcher />
          </div>
          <ContactStrip />
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-1 items-center justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <ImageCarousel />
        </motion.div>
      </div>
    </section>
  );
}
