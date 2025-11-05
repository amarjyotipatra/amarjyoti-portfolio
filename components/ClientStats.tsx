"use client";

import { motion } from 'framer-motion';

const stats = [
  { label: 'Years of Experience', value: '3+', accent: 'text-emerald-500 dark:text-emerald-300' },
  { label: 'Projects Delivered', value: '25+', accent: 'text-cyan-600 dark:text-cyan-300' },
  { label: 'Technologies Mastered', value: '15+', accent: 'text-amber-600 dark:text-amber-300' },
  { label: 'Code Commits', value: '5000+', accent: 'text-purple-600 dark:text-purple-300' },
  { label: 'Happy Clients', value: '10+', accent: 'text-rose-600 dark:text-rose-300' },
  { label: 'Coffee Consumed', value: '∞', accent: 'text-orange-600 dark:text-orange-300' }
];

export function ClientStats() {
  return (
    <section className="mx-auto mt-24 max-w-6xl px-6">
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">By The Numbers 📊</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Real metrics from my journey as a full-stack software engineer.
          </p>
        </div>
        <div className="grid flex-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition-all dark:border-slate-800/60 dark:bg-slate-950/60"
            >
              <p className={`text-4xl font-bold ${stat.accent}`}>{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
