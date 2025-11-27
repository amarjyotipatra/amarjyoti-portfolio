"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollEndCelebration() {
  const { scrollYProgress } = useScroll();
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Smooth out the progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Trigger when very close to bottom (> 99%)
      if (latest > 0.99 && !showCelebration) {
        setShowCelebration(true);
      } else if (latest < 0.95 && showCelebration) {
        setShowCelebration(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, showCelebration]);

  return (
    <>
      {/* Progress Bar at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Bottom Celebration Message */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-end justify-center pointer-events-none pb-12"
          >
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full" />

            <motion.div
              initial={{ y: 50, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="relative flex flex-col items-center gap-4"
            >
              {/* Holographic Ring */}
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 -m-8 border border-dashed border-emerald-500/30 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 -m-4 border border-emerald-500/20 rounded-full"
                />
                
                <div className="flex items-center gap-3 rounded-full border border-emerald-500/30 bg-black/80 px-8 py-4 backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-emerald-500/70 tracking-widest uppercase leading-none mb-1">Status: Synced</span>
                    <span className="font-mono text-lg font-bold text-emerald-400 tracking-widest uppercase leading-none text-shadow-glow">
                      System Synchronization Complete
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Lines */}
              <div className="flex items-center gap-2 opacity-50">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-500" />
                <div className="h-1 w-1 rounded-full bg-emerald-500" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-500" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
