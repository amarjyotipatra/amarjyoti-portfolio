"use client";

import { motion } from 'framer-motion';
import { useUISkinStore, type ThemeSkin } from '@/store/uiSkin';

const skins: ThemeSkin[] = ['cyberwave', 'solarflare', 'stealth'];

const themeIcons: Record<ThemeSkin, string> = {
  cyberwave: '🌊',
  solarflare: '☀️',
  stealth: '🌙'
};

const themeLabels: Record<ThemeSkin, string> = {
  cyberwave: 'Cyberwave',
  solarflare: 'Solarflare',
  stealth: 'Stealth'
};

export function SkinSwitcher() {
  const { skin, setSkin } = useUISkinStore();

  const cycleTheme = () => {
    const currentIndex = skins.indexOf(skin);
    const nextIndex = (currentIndex + 1) % skins.length;
    setSkin(skins[nextIndex]);
  };

  return (
    <motion.button
      type="button"
      onClick={cycleTheme}
      className="group relative flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/50 px-4 py-2 text-sm backdrop-blur-sm transition-all hover:border-emerald-400/50 hover:bg-slate-800/70"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        key={skin}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="text-xl"
      >
        {themeIcons[skin]}
      </motion.span>
      <span className="text-slate-300 group-hover:text-emerald-200 transition-colors">
        {themeLabels[skin]}
      </span>
      <motion.div
        className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 opacity-0 blur group-hover:opacity-100 -z-10"
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
