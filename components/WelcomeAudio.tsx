"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AUDIO_SRC = '/media/welcome-loop.mp3';

export function WelcomeAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'auto';

    // Check if audio file exists
    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
      setError(false);
    });

    audio.addEventListener('error', () => {
      console.warn('Audio file not found or cannot be played');
      setError(true);
      setIsLoaded(false);
    });

    audio.src = AUDIO_SRC;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    if (!audioRef.current || error) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn('Autoplay blocked or audio error:', err);
      setError(true);
    }
  };

  // Don't render if there's an error
  if (error) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.button
        type="button"
        onClick={toggle}
        disabled={!isLoaded}
        className="group absolute -bottom-10 left-1/2 z-20 -translate-x-1/2 rounded-full border border-slate-600/60 bg-slate-900/80 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 backdrop-blur transition-all hover:bg-slate-800/90 hover:border-slate-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center gap-2">
          {isPlaying ? (
            <>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                🔊
              </motion.span>
              <span>Mute Soundscape</span>
            </>
          ) : (
            <>
              <span>🎵</span>
              <span>{!isLoaded ? 'Loading...' : 'Start Soundscape'}</span>
            </>
          )}
        </span>
        
        {/* Pulse effect when playing */}
        {isPlaying && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-emerald-400"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </AnimatePresence>
  );
}
