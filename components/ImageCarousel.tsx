"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/images/Amarjyoti Patra.jpg',
  '/images/DSC_5695.jpg',
  '/images/IMG-20240219-WA0000.jpg'
];

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-2 shadow-[0_0_80px_rgba(56,189,248,0.15)] transition sm:rounded-[2.5rem] sm:p-3 dark:border-slate-700/70 dark:bg-slate-900/60">
      <div className="rounded-[1.5rem] bg-slate-100 p-0.5 sm:rounded-[2rem] dark:bg-slate-950/70 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={`Amarjyoti Patra - Photo ${currentIndex + 1}`}
              fill
              priority
              className="rounded-[1.25rem] object-cover sm:rounded-[1.75rem]"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Maintain aspect ratio */}
        <div className="h-64 w-52 sm:h-80 sm:w-64 lg:h-[28rem] lg:w-[22rem]" />
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-emerald-500'
                : 'w-2 bg-slate-400 hover:bg-slate-500'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow-lg backdrop-blur transition hover:bg-white hover:scale-110 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700"
        aria-label="Previous image"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow-lg backdrop-blur transition hover:bg-white hover:scale-110 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700"
        aria-label="Next image"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Counter Badge */}
      <div className="absolute top-4 right-4 rounded-full bg-slate-900/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
