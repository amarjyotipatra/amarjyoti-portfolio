"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  shape: 'circle' | 'square' | 'triangle';
  rotation: number;
};

const colors = [
  '#22d3ee', // cyan
  '#ec4899', // pink
  '#ef4444', // red
  '#f59e0b', // orange
  '#8b5cf6', // purple
  '#10b981', // emerald
  '#3b82f6', // blue
  '#f472b6', // rose
];

export function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Generate random particles
  const particles = useMemo(() => {
    const particleCount = 60;
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.5 + 0.2,
      shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
      rotation: Math.random() * 360
    }));
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((particle) => {
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [0, -particle.speed * 500]
        );
        
        const rotate = useTransform(
          scrollYProgress,
          [0, 1],
          [particle.rotation, particle.rotation + 360 * particle.speed]
        );

        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              y,
              rotate,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              opacity: {
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2
              },
              scale: {
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2
              }
            }}
          >
            {particle.shape === 'circle' && (
              <div
                className="rounded-full"
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.color}80`
                }}
              />
            )}
            {particle.shape === 'square' && (
              <div
                className="rounded-sm"
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.color}80`
                }}
              />
            )}
            {particle.shape === 'triangle' && (
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${particle.size / 2}px solid transparent`,
                  borderRight: `${particle.size / 2}px solid transparent`,
                  borderBottom: `${particle.size}px solid ${particle.color}`,
                  filter: `drop-shadow(0 0 ${particle.size}px ${particle.color}80)`
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
