"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTelemetry } from '@/hooks/useTelemetry';
import { personalProfile } from '@/lib/personal';

type AnalyticsData = {
  totals: {
    visits: number;
    uniqueVisitors: number;
    resumeDownloads: number;
  };
  recentVisits: Array<{
    fingerprintHash: string;
    timestamp: string;
  }>;
  recentInteractions: Array<{
    type: string;
    fingerprintHash: string;
    timestamp: string;
    metadata?: Record<string, unknown>;
  }>;
};

export default function AdminPage() {
  const { fingerprint } = useTelemetry();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (fingerprint && fingerprint === personalProfile.adminFingerprint) {
      setIsAuthorized(true);
      fetchAnalytics();
    } else {
      setIsLoading(false);
    }
  }, [fingerprint]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-12 w-12 rounded-full border-4 border-emerald-400 border-t-transparent"
        />
      </main>
    );
  }

  if (!isAuthorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-4 text-6xl">🔒</div>
          <h1 className="mb-3 text-3xl font-bold text-red-400">Access Denied</h1>
          <p className="text-slate-400">You don't have permission to view this page.</p>
        </motion.div>
      </main>
    );
  }

  if (!analytics) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <p className="text-slate-400">Failed to load analytics data.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-semibold">🎯 Engagement Control Room</h1>
          <p className="mt-3 text-sm text-slate-400">
            Monitoring unique visitors, mission dossier downloads, and interface interactions.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 grid gap-6 md:grid-cols-3"
        >
          <article className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition-all hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-400/10">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Total Visits</p>
            <p className="mt-4 text-4xl font-semibold text-emerald-300">{analytics.totals.visits}</p>
          </article>
          <article className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition-all hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Unique Explorers</p>
            <p className="mt-4 text-4xl font-semibold text-cyan-300">{analytics.totals.uniqueVisitors}</p>
          </article>
          <article className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition-all hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-400/10">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Resume Downloads</p>
            <p className="mt-4 text-4xl font-semibold text-amber-300">{analytics.totals.resumeDownloads}</p>
          </article>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid gap-6 lg:grid-cols-2"
        >
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-lg font-semibold">📍 Recent Unique Sessions</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {analytics.recentVisits.length > 0 ? (
                analytics.recentVisits.map((visit) => (
                  <li key={`${visit.fingerprintHash}-${visit.timestamp}`} className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="truncate font-mono text-xs text-slate-500">{visit.fingerprintHash.slice(0, 10)}…</span>
                    <span className="text-emerald-400">{new Date(visit.timestamp).toLocaleString()}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-500">No visits yet</li>
              )}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-lg font-semibold">⚡ Interaction Feed</h2>
            <ul className="mt-4 max-h-96 space-y-4 overflow-y-auto text-sm text-slate-300">
              {analytics.recentInteractions.length > 0 ? (
                analytics.recentInteractions.map((event) => (
                  <li key={`${event.fingerprintHash}-${event.timestamp}`} className="border-b border-slate-800 pb-3 last:border-b-0">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em]">
                      <span className="font-semibold text-cyan-400">{event.type}</span>
                      <span className="text-slate-500">{new Date(event.timestamp).toLocaleTimeString()}</span>
                    </div>
                    {event.metadata && Object.keys(event.metadata).length > 0 && (
                      <pre className="mt-2 whitespace-pre-wrap break-all rounded-2xl bg-slate-950/70 p-3 text-xs text-slate-400">
                        {JSON.stringify(event.metadata, null, 2)}
                      </pre>
                    )}
                  </li>
                ))
              ) : (
                <li className="text-slate-500">No interactions yet</li>
              )}
            </ul>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-xs text-slate-600"
        >
          <p>🔐 Authenticated via Browser Fingerprint</p>
        </motion.div>
      </div>
    </main>
  );
}
