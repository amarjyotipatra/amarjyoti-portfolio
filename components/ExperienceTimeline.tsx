"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

type Mission = {
  title: string;
  timeframe: string;
  location: string;
  summary: string;
  stack: string[];
  achievements: string[];
};

const missions = [
  {
    title: 'Software Developer · Knoxpo',
    timeframe: 'Feb 2023 — Jun 2025',
    location: 'Surat, Gujarat',
    summary:
      'Developed and integrated enterprise-grade security solutions, optimized SEO performance, and engineered role-based authorization systems. Pioneered Azure logging infrastructure and upgraded microservice architecture.',
    stack: ['React.js', 'Next.js', 'Node.js', 'JWT', 'Redis', 'Azure', 'TypeScript', 'Kontent.ai'],
    achievements: [
      'Developed and integrated IP-based rate limiting on both frontend and backend systems to mitigate potential DDoS attacks, enhancing overall application security and performance.',
      'Improved website SEO by 30% via integrating a headless CMS (Kontent.ai) and optimizing site structure.',
      'Engineered a React.js role authorization system with JWT, boosting application security by 60% across all roles.',
      'Designed RESTful APIs and implemented caching with Redis, improving API response time by 28%.',
      'Pioneered a centralized Azure logging stream, enhancing observability and accelerating issue diagnosis by 50%.',
      'Upgraded microservice-based frontend application from Next.js v12.2.15 to v14.2.15 (LTS).'
    ]
  },
  {
    title: 'Software Engineer - Full Stack · Sheshi',
    timeframe: 'May 2022 — Jan 2023',
    location: 'Bangalore, Karnataka',
    summary:
      'Optimized page load times, revamped dashboard UI based on design specifications, and developed modular component architecture to reduce code duplication and improve maintainability.',
    stack: ['React', 'Figma', 'JavaScript', 'CSS', 'Component Architecture', 'PageSpeed'],
    achievements: [
      'Reduced page load time by 400ms through lazy image loading, verified via PageSpeed Insights.',
      'Revamped dashboard UI based on Figma specifications, improving visual consistency and reducing user-reported bugs by 40%.',
      'Developed a modular modal component architecture with reusable logic, reducing frontend code duplication by 60%.'
    ]
  },
  {
    title: 'Bachelor of Technology · Electrical Engineering',
    timeframe: '2015 — 2019',
    location: 'Indira Gandhi Institute Of Technology, Sarang',
    summary:
      'Completed B.Tech in Electrical Engineering with strong foundation in circuit design, power systems, and programming. Developed analytical thinking and problem-solving skills through hands-on projects and coursework.',
    stack: ['Circuit Design', 'Power Systems', 'C Programming', 'MATLAB', 'Control Systems',],
    achievements: [
      'Completed major projects in power electronics and control systems',
      'Participated in technical workshops and seminars',
      'Built strong foundation in mathematics and programming'
    ]
  }
];

export function ExperienceTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="relative mx-auto mt-24 max-w-6xl scroll-mt-20 px-6 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Professional Journey 🚀</h2>
          <p className="mt-2 max-w-xl text-base text-slate-600 dark:text-slate-400">
            3+ years of building production-ready applications and delivering value to users and businesses.
          </p>
        </div>
      </div>
      <div className="mt-12 space-y-8">
        {missions.map((mission, index) => (
          <motion.article
            key={mission.title}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm transition-all hover:shadow-2xl hover:scale-[1.02] dark:border-slate-800 dark:bg-slate-900/50 backdrop-blur-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -5 }}
          >
            {/* Animated Gradient Background on Hover */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            </div>

            {/* Content */}
            <div className="relative">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {mission.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      📅 {mission.timeframe}
                    </span>
                    <span className="flex items-center gap-1">
                      📍 {mission.location}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {mission.summary}
              </p>

              {/* Tech Stack */}
              <div className="mb-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em]">
                {mission.stack.map((item, idx) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * idx }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="rounded-full border border-slate-300/80 bg-slate-50 px-3 py-1 text-slate-600 transition-all cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-300"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              {/* Achievements - Expandable */}
              <div>
                <motion.button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-600 transition-all hover:text-emerald-500 hover:gap-3 dark:text-emerald-400 dark:hover:text-emerald-300"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Key Achievements</span>
                  <motion.svg
                    className="h-4 w-4"
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>

                <motion.ul
                  initial={false}
                  animate={{
                    height: expandedIndex === index ? 'auto' : 0,
                    opacity: expandedIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden space-y-2"
                >
                  {mission.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={expandedIndex === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                    >
                      <span className="mt-1 text-emerald-500">✓</span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>

            {/* Decorative Floating Elements */}
            <motion.div 
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 blur-2xl transition-all duration-300 group-hover:scale-150"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
