"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (value: Theme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = 'portfolio-theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyTheme(value: Theme) {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(value);
  root.style.colorScheme = value;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored === 'light' ? 'light' : 'dark';

    applyTheme(initial);
    setThemeState(initial);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((value: Theme) => {
    setThemeState(value);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemePreference() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useThemePreference must be used within a ThemeProvider');
  }

  return context;
}
