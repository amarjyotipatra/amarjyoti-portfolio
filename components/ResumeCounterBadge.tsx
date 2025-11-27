"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ResumeCounterBadge() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        if (data?.totals?.resumeDownloads) {
          setCount(data.totals.resumeDownloads);
        }
      })
      .catch(err => console.error('Failed to load resume count', err));
  }, []);

  if (count === null) return null;

  return (
    <motion.span 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute -top-2 -right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-emerald-500 px-1.5 text-[10px] font-bold text-black shadow-[0_0_10px_rgba(16,185,129,0.4)]"
    >
      {count}
    </motion.span>
  );
}
