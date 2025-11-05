"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-slate-900 dark:text-white"
          >
            AP<span className="text-emerald-500">.</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-sm font-medium text-slate-600 transition hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                {link.label}
              </motion.button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 bg-slate-900 dark:bg-white"
            />
            <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="h-0.5 w-6 bg-slate-900 dark:bg-white" />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 bg-slate-900 dark:bg-white"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-40 h-full w-72 border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 md:hidden"
            >
              <div className="flex h-full flex-col px-6 pt-24">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border-b border-slate-100 py-4 text-left text-lg font-medium text-slate-900 transition hover:text-emerald-500 dark:border-slate-800 dark:text-white dark:hover:text-emerald-400"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <div className="mt-6">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
