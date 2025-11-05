"use client";

import useSWR from 'swr';
import { motion } from 'framer-motion';
import type { PinnedRepository } from '@/lib/github';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return (await res.json()) as { repos: PinnedRepository[] };
};

export function PinnedProjects() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'amarjyotipatra';
  const { data, error, isLoading } = useSWR(`/api/github/pinned?username=${encodeURIComponent(username)}`, fetcher, {
    refreshInterval: 1000 * 60 * 10
  });

  if (error) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-100">
        Failed to load pinned projects.
      </div>
    );
  }

  return (
    <section id="projects" className="mx-auto mt-24 max-w-6xl scroll-mt-20 px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Featured Projects</h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
            A snapshot of collaborative clones, production-ready experiments, and personal builds that shaped my journey.
          </p>
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {isLoading && !data
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40"
              />
            ))
          : data?.repos.map((repo: PinnedRepository, index: number) => (
              <motion.a
                href={repo.url}
                key={repo.id}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 text-slate-700 shadow-sm transition hover:border-emerald-400/60 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{repo.name}</h3>
                  <span className="rounded-full border border-emerald-300/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-600 dark:border-emerald-400/40 dark:text-emerald-200">
                    {repo.primaryLanguage?.name ?? 'Full Stack'}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                  {repo.description ?? 'High-impact build with production mileage.'}
                </p>
                <div className="mt-6 flex items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
                  <span>⭐ {repo.stargazerCount}</span>
                  <span>🍴 {repo.forkCount}</span>
                  <span>Updated {new Date(repo.updatedAt).toLocaleDateString()}</span>
                </div>
              </motion.a>
            ))}
      </div>
    </section>
  );
}
