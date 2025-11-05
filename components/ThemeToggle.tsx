"use client";

import { useMemo } from 'react';
import { useThemePreference } from '@/components/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemePreference();

  const label = useMemo(() => (theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'), [theme]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="flex items-center gap-2 self-start rounded-full border border-slate-300/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700 transition hover:border-emerald-400 hover:text-emerald-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-400/80 dark:hover:text-emerald-300"
    >
      <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  );
}
