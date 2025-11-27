"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function CyberIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const [text, setText] = useState("");
  const fullText = "INITIALIZING SYSTEM...";

  useEffect(() => {
    // Typing effect
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        // Start exit sequence after typing finishes
        setTimeout(() => setIsVisible(false), 800);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white"
        >
          <div className="relative w-full max-w-md px-6">
            {/* Glitchy Text Container */}
            <div className="relative mb-8 font-mono text-2xl md:text-4xl font-bold tracking-widest text-center">
              <span className="relative z-10">
                {text}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-3 h-6 md:h-8 ml-1 bg-emerald-500 align-middle"
                />
              </span>
              
              {/* Glitch Layers */}
              <motion.div
                className="absolute inset-0 text-red-500 opacity-50 mix-blend-screen"
                animate={{ x: [-2, 2, -1, 0], y: [1, -1, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
              >
                {text}
              </motion.div>
              <motion.div
                className="absolute inset-0 text-blue-500 opacity-50 mix-blend-screen"
                animate={{ x: [2, -2, 1, 0], y: [-1, 1, 0] }}
                transition={{ duration: 0.3, repeat: Infinity, repeatType: "mirror" }}
              >
                {text}
              </motion.div>
            </div>

            {/* Loading Bar */}
            <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            {/* System Status Text */}
            <div className="mt-2 flex justify-between font-mono text-xs text-slate-500">
              <span>CORE: ONLINE</span>
              <span>NET: SECURE</span>
            </div>
          </div>

          {/* Background Grid Effect */}
          <div className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
