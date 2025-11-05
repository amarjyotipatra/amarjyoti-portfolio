"use client";

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

const balloonColors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

function BalloonBurst({ x, y, color }: { x: number; y: number; color: string }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        angle: (i * 360) / 16,
        distance: 40 + Math.random() * 40,
        size: 4 + Math.random() * 6
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute" style={{ left: x, top: y }}>
      {/* Flash effect */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 2, 0], opacity: [1, 0.8, 0] }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute -left-8 -top-8 h-16 w-16 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 40px ${color}` }}
      />
      {/* Burst particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [1, 0.5, 0],
            x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
            y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
            opacity: [1, 0.8, 0]
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`
          }}
        />
      ))}
      {/* Confetti pieces */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`confetti-${i}`}
          initial={{ scale: 1, x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            scale: [1, 0],
            x: (Math.random() - 0.5) * 100,
            y: Math.random() * 100 + 50,
            opacity: [1, 0.6, 0],
            rotate: Math.random() * 720
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute h-2 w-4 rounded-sm"
          style={{ backgroundColor: balloonColors[Math.floor(Math.random() * balloonColors.length)] }}
        />
      ))}
    </div>
  );
}

function Balloon({ delay, startX, color, onBurst }: { delay: number; startX: number; color: string; onBurst: (x: number, y: number, color: string) => void }) {
  const [burst, setBurst] = useState(false);
  const burstTime = 0.8 + delay; // Burst after 0.8s + delay

  useEffect(() => {
    const timer = setTimeout(() => {
      setBurst(true);
      onBurst(startX + (Math.random() - 0.5) * 80, window.innerHeight * 0.4, color);
    }, burstTime * 1000);
    return () => clearTimeout(timer);
  }, [burstTime, startX, color, onBurst]);

  if (burst) return null;

  return (
    <motion.div
      initial={{ y: '120vh', x: startX, opacity: 0, rotate: 0 }}
      animate={{
        y: '40vh',
        x: startX + (Math.random() - 0.5) * 80,
        opacity: [0, 1, 1],
        rotate: [0, 12, -12, 0]
      }}
      transition={{ duration: burstTime, ease: 'easeOut' }}
      className="pointer-events-none absolute"
    >
      <div className="relative">
        <div
          className="h-16 w-14 rounded-full shadow-lg"
          style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}40` }}
        >
          <div className="absolute inset-2 rounded-full border-2 border-white/30" />
        </div>
        <div className="mx-auto h-6 w-px bg-gradient-to-b from-current to-transparent" style={{ color }} />
      </div>
    </motion.div>
  );
}

function Firecracker({ delay, x, y }: { delay: number; x: number; y: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        angle: (i * 360) / 12,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)]
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 0],
            x: Math.cos((particle.angle * Math.PI) / 180) * 80,
            y: Math.sin((particle.angle * Math.PI) / 180) * 80,
            opacity: [1, 1, 0]
          }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
          className="absolute h-2 w-2 rounded-full"
          style={{ backgroundColor: particle.color, boxShadow: `0 0 10px ${particle.color}` }}
        />
      ))}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 1.5, 0], opacity: [1, 0.5, 0] }}
        transition={{ duration: 0.6, delay }}
        className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-yellow-300"
        style={{ boxShadow: '0 0 40px rgba(253, 224, 71, 0.8)' }}
      />
    </div>
  );
}

export function CelebrationIntro() {
  const [bursts, setBursts] = useState<Array<{ x: number; y: number; color: string; id: number }>>([]);

  const handleBurst = (x: number, y: number, color: string) => {
    setBursts(prev => [...prev, { x, y, color, id: Date.now() + Math.random() }]);
  };

  const balloons = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        delay: i * 0.12,
        startX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200) - 70,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)]
      })),
    []
  );

  const firecrackers = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        delay: 0.25 + i * 0.25,
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 50
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {/* Balloons */}
      {balloons.map((balloon, i) => (
        <Balloon key={`balloon-${i}`} {...balloon} onBurst={handleBurst} />
      ))}

      {/* Balloon bursts */}
      {bursts.map((burst) => (
        <BalloonBurst key={burst.id} x={burst.x} y={burst.y} color={burst.color} />
      ))}

      {/* Firecrackers */}
      {firecrackers.map((firecracker, i) => (
        <Firecracker key={`fire-${i}`} {...firecracker} />
      ))}

      {/* Welcome Message */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.15, 1], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, times: [0, 0.3, 0.7, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="rounded-3xl border-2 border-emerald-400 bg-gradient-to-br from-slate-900/95 to-slate-800/95 px-10 py-6 text-center shadow-2xl backdrop-blur-md">
          <motion.h2
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mb-2 text-3xl font-bold text-white"
          >
            Welcome! 🎉
          </motion.h2>
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="text-base text-emerald-300"
          >
            Let's build something amazing together
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
