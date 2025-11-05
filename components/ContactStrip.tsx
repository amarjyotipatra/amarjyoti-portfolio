"use client";

import { personalProfile } from '@/lib/personal';

export function ContactStrip() {
  const { email, github, linkedin, phone } = personalProfile;

  return (
    <div className="mt-12 flex flex-col gap-3 text-sm md:flex-row md:items-center md:gap-6">
      <a
        href={`mailto:${email}`}
        className="group inline-flex items-center gap-2 text-slate-600 transition hover:text-emerald-500 dark:text-slate-200 dark:hover:text-emerald-200"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 transition group-hover:scale-125" />
        {email}
      </a>
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 text-slate-600 transition hover:text-sky-500 dark:text-slate-200 dark:hover:text-sky-300"
      >
        <span className="h-2 w-2 rounded-full bg-sky-400 transition group-hover:scale-125" />
        {github.replace('https://', '')}
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 text-slate-600 transition hover:text-purple-500 dark:text-slate-200 dark:hover:text-purple-300"
      >
        <span className="h-2 w-2 rounded-full bg-purple-400 transition group-hover:scale-125" />
        {linkedin.replace('https://', '')}
      </a>
      <a
        href={`https://wa.me/${phone.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 text-slate-600 transition hover:text-amber-500 dark:text-slate-200 dark:hover:text-amber-300"
      >
        <span className="h-2 w-2 rounded-full bg-amber-400 transition group-hover:scale-125" />
        {phone}
      </a>
    </div>
  );
}
