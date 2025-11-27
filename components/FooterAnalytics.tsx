"use client";

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

type AnalyticsData = {
  totals: {
    visits: number;
    uniqueVisitors: number;
    resumeDownloads: number;
    interactions: number;
  };
};

function AnimatedCounter({ value, colorClass }: { value: number; colorClass: string }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span className={`font-mono text-lg font-bold ${colorClass}`}>{display}</motion.span>;
}

export function FooterAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics');
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error('Failed to fetch footer analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analytics) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="mt-8 grid grid-cols-2 gap-6 border-t border-slate-200 pt-8 dark:border-slate-800 sm:grid-cols-4 md:mt-0 md:border-t-0 md:pt-0"
    >
      <div className="text-center md:text-right">
        <p className="text-[10px] uppercase tracking-widest text-slate-500">System Access</p>
        <AnimatedCounter value={analytics.totals.visits} colorClass="text-emerald-500" />
      </div>
      <div className="text-center md:text-right">
        <p className="text-[10px] uppercase tracking-widest text-slate-500">Unique Signals</p>
        <AnimatedCounter value={analytics.totals.uniqueVisitors} colorClass="text-cyan-500" />
      </div>
      <div className="text-center md:text-right">
        <p className="text-[10px] uppercase tracking-widest text-slate-500">Intel Downloads</p>
        <AnimatedCounter value={analytics.totals.resumeDownloads} colorClass="text-amber-500" />
      </div>
      <div className="text-center md:text-right">
        <p className="text-[10px] uppercase tracking-widest text-slate-500">Interactions</p>
        <AnimatedCounter value={analytics.totals.interactions} colorClass="text-purple-500" />
      </div>
    </motion.div>
  );
}
