"use client";

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import useSWR from 'swr';
import type { PinnedRepository } from '@/lib/github';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return (await res.json()) as { repos: PinnedRepository[] };
};

const planetColors = [
  { primary: '#3b82f6', secondary: '#60a5fa', shadow: 'rgba(59, 130, 246, 0.3)' }, // Blue
  { primary: '#10b981', secondary: '#34d399', shadow: 'rgba(16, 185, 129, 0.3)' }, // Green
  { primary: '#f59e0b', secondary: '#fbbf24', shadow: 'rgba(245, 158, 11, 0.3)' }, // Amber
  { primary: '#8b5cf6', secondary: '#a78bfa', shadow: 'rgba(139, 92, 246, 0.3)' }, // Purple
  { primary: '#ec4899', secondary: '#f472b6', shadow: 'rgba(236, 72, 153, 0.3)' }, // Pink
  { primary: '#ef4444', secondary: '#f87171', shadow: 'rgba(239, 68, 68, 0.3)' } // Red
];

function Planet({
  repo,
  index,
  smoothProgress
}: {
  repo: PinnedRepository;
  index: number;
  smoothProgress: any;
}) {
  const color = planetColors[index % planetColors.length];
  const orbitRadius = 120 + index * 60; // Reduced from 150 + index * 80
  const orbitSpeed = 0.3 + index * 0.15;
  const baseAngle = (index * 360) / 6;

  // Use useTransform for smooth interpolation
  const angle = useTransform(
    smoothProgress,
    [0, 1],
    [baseAngle, baseAngle + orbitSpeed * 360]
  );
  
  const x = useTransform(angle, (a) => Math.cos((a * Math.PI) / 180) * orbitRadius);
  const y = useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * orbitRadius * 0.5);

  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      {/* Orbit Ring */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-400/20 dark:border-slate-600/30"
        style={{
          width: orbitRadius * 2,
          height: orbitRadius,
          opacity: 0.4
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ delay: index * 0.15, duration: 0.8, ease: 'easeOut' }}
      />

      {/* Planet */}
      <motion.div
        className="absolute left-1/2 top-1/2 cursor-pointer"
        style={{
          x,
          y,
          zIndex: 10 + index
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
        onHoverStart={() => setShowInfo(true)}
        onHoverEnd={() => setShowInfo(false)}
        onClick={() => window.open(repo.url, '_blank')}
      >
        {/* Planet Body */}
        <motion.div
          className="relative"
          whileHover={{ 
            scale: 1.3,
            rotate: 360,
            transition: { duration: 0.6, ease: 'easeOut' }
          }}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            rotate: { duration: 20 + index * 5, repeat: Infinity, ease: 'linear' }
          }}
        >
          <motion.div
            className="h-20 w-20 rounded-full shadow-2xl transition-shadow duration-300"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${color.secondary}, ${color.primary})`,
              boxShadow: `0 0 40px ${color.shadow}, inset -10px -10px 20px rgba(0,0,0,0.3)`
            }}
            whileHover={{
              boxShadow: `0 0 80px ${color.shadow}, 0 0 120px ${color.shadow}, inset -10px -10px 20px rgba(0,0,0,0.3)`,
              transition: { duration: 0.3 }
            }}
          >
            {/* Planet Rings (for some planets) */}
            {index % 3 === 0 && (
              <motion.div
                className="absolute left-1/2 top-1/2 h-2 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
                style={{
                  background: `linear-gradient(90deg, transparent, ${color.primary}, transparent)`,
                  transform: 'translateX(-50%) translateY(-50%) rotateX(75deg)'
                }}
                whileHover={{ opacity: 0.9, scale: 1.2 }}
              />
            )}
          </motion.div>

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full blur-xl"
            style={{ background: color.primary, opacity: 0.4 }}
            whileHover={{ opacity: 0.7, scale: 1.5 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Info Card */}
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute -top-36 left-1/2 z-[100] w-72 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-2xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/95"
            style={{ pointerEvents: 'auto' }}
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          >
            <div className="mb-3 flex items-start justify-between">
              <h4 className="flex-1 text-base font-bold text-slate-900 dark:text-white">{repo.name}</h4>
              {repo.primaryLanguage && (
                <span 
                  className="ml-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide"
                  style={{ 
                    background: color.primary,
                    color: 'white'
                  }}
                >
                  {repo.primaryLanguage.name}
                </span>
              )}
            </div>
            <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {repo.description || 'No description available'}
            </p>
            <div className="flex items-center gap-4 border-t border-slate-200 pt-3 text-sm dark:border-slate-700">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <span>⭐</span>
                <span className="font-semibold">{repo.stargazerCount}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <span>🍴</span>
                <span className="font-semibold">{repo.forkCount}</span>
              </div>
              <motion.div 
                className="ml-auto text-xs font-medium text-blue-600 dark:text-blue-400"
                whileHover={{ scale: 1.1, x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                Click to view →
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

export function SolarSystemProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Add spring physics for smooth animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'amarjyotipatra';
  const { data, error, isLoading } = useSWR(
    `/api/github/pinned?username=${encodeURIComponent(username)}`,
    fetcher,
    { refreshInterval: 1000 * 60 * 10 }
  );

  if (error) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-100">
        Failed to load projects. Please try again later.
      </div>
    );
  }

  return (
    <section id="projects" ref={containerRef} className="relative scroll-mt-20 py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-slate-100">
            Project Universe 🌌
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            My GitHub projects orbiting like planets in a solar system. Scroll to see them move!
          </p>
        </motion.div>

        {/* Solar System */}
        <div className="relative mx-auto flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/20 to-slate-950/30 backdrop-blur-sm" style={{ height: '600px', maxWidth: '1200px' }}>
          {/* Animated Gradient Background */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Nebula Clouds */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.2, 0.4, 0.2]) }}
          >
            {[1, 2, 3].map((cloud, i) => (
              <motion.div
                key={`cloud-${i}`}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: 200 + i * 100,
                  height: 100 + i * 50,
                  left: `${20 + i * 25}%`,
                  top: `${30 + i * 10}%`,
                  background: `radial-gradient(circle, ${planetColors[i * 2].primary}15 0%, transparent 70%)`
                }}
                animate={{
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 15 + i * 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 2
                }}
              />
            ))}
          </motion.div>

          {/* Sun (Center) */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, type: 'spring' }}
          >
            <div className="relative">
              <motion.div
                className="h-32 w-32 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 shadow-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 60px rgba(251, 146, 60, 0.6)',
                    '0 0 80px rgba(251, 146, 60, 0.8)',
                    '0 0 60px rgba(251, 146, 60, 0.6)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <div className="absolute inset-0 rounded-full bg-yellow-300 opacity-40 blur-3xl" />
              
              {/* Sun Label */}
              <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 whitespace-nowrap rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                👨‍💻 Amarjyoti's Projects
              </div>
            </div>
          </motion.div>

          {/* Planets (Projects) */}
          {isLoading ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500 dark:border-slate-700" />
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Loading projects...</p>
            </div>
          ) : (
            data?.repos.map((repo: PinnedRepository, index: number) => (
              <Planet key={repo.id} repo={repo} index={index} smoothProgress={smoothProgress} />
            ))
          )}

          {/* Stars Background - More dynamic */}
          {Array.from({ length: 80 }).map((_, i) => {
            const size = Math.random() > 0.7 ? 2 : 1;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: size,
                  height: size,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: size > 1 ? '0 0 4px rgba(255,255,255,0.8)' : 'none'
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, size > 1 ? 1.5 : 1.2, 1]
                }}
                transition={{
                  duration: 2 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut'
                }}
              />
            );
          })}
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400">
            ⬇️ Scroll to see the planets orbit
          </p>
        </motion.div>

        {/* Project List (Mobile Friendly) */}
        <div className="mt-24 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:hidden">
          {data?.repos.map((repo: PinnedRepository, index: number) => {
            const color = planetColors[index % planetColors.length];
            return (
              <motion.a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800/60"
                style={{ maxWidth: '100%', width: '100%' }}
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-10"
                  style={{ background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})` }}
                />
                <div className="relative">
                  <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">{repo.name}</h3>
                  <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                    {repo.description || 'No description available'}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex gap-4 text-slate-500 dark:text-slate-400">
                      <span>⭐ {repo.stargazerCount}</span>
                      <span>🍴 {repo.forkCount}</span>
                    </div>
                    {repo.primaryLanguage && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-700">
                        {repo.primaryLanguage.name}
                      </span>
                    )}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
