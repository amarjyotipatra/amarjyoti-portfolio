"use client";

import { motion } from 'framer-motion';
import { personalProfile } from '@/lib/personal';

const contactMethods = [
  {
    icon: '📧',
    label: 'Email',
    value: 'amarjyotipatra511@gmail.com',
    href: 'mailto:amarjyotipatra511@gmail.com',
    color: 'from-red-500 to-orange-500'
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/amar-jyoti-patra',
    href: 'https://linkedin.com/in/amar-jyoti-patra',
    color: 'from-blue-600 to-blue-400'
  },
  {
    icon: '💻',
    label: 'GitHub',
    value: 'github.com/amarjyotipatra',
    href: 'https://github.com/amarjyotipatra',
    color: 'from-gray-700 to-gray-500'
  },
  {
    icon: '📱',
    label: 'WhatsApp',
    value: '+91 8093725545',
    href: 'https://wa.me/918093725545',
    color: 'from-green-600 to-green-400'
  },
  {
    icon: '☎️',
    label: 'Phone',
    value: '+91 8093725545',
    href: 'tel:+918093725545',
    color: 'from-purple-600 to-purple-400'
  }
];

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto mt-32 max-w-6xl scroll-mt-20 px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Let's Connect! 🚀</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Have an exciting project in mind? Looking for a skilled full-stack engineer? Let's build something amazing together!
        </p>
      </motion.div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contactMethods.map((method, index) => (
          <motion.a
            key={method.label}
            href={method.href}
            target={method.href.startsWith('http') ? '_blank' : undefined}
            rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800/60"
          >
            {/* Gradient Background on Hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10 ${method.color}`}
            />

            {/* Content */}
            <div className="relative">
              <div className="mb-4 text-5xl">{method.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{method.label}</h3>
              <p className="break-words text-sm text-slate-600 dark:text-slate-400">{method.value}</p>

              {/* Arrow Icon */}
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-600 transition-transform group-hover:translate-x-2 dark:text-emerald-400">
                Get in touch
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 blur-2xl transition-transform duration-300 group-hover:scale-150" />
          </motion.a>
        ))}
      </div>

      {/* Quick Contact Form Teaser */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-16 rounded-3xl border-2 border-dashed border-emerald-400/40 bg-gradient-to-br from-emerald-50/50 to-cyan-50/50 p-12 text-center dark:from-emerald-900/10 dark:to-cyan-900/10"
      >
        <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          💡 Open to exciting opportunities and collaborations!
        </p>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Whether it's a full-time role, freelance project, or just a tech chat over coffee - I'd love to hear from you.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            Remote-Friendly
          </span>
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            Quick Responder
          </span>
          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
            Available for Freelance
          </span>
        </div>
      </motion.div>
    </section>
  );
}
