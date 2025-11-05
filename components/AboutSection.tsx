"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const skills = [
  // Languages
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', level: 90 },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', level: 92 },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', level: 88 },
  { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', level: 85 },
  
  // Frontend
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', level: 92 },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', level: 90 },
  { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', level: 85 },
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', level: 75 },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', level: 95 },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', level: 92 },
  
  // Backend
  { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', level: 88 },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', level: 90 },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', level: 88 },
  
  // Databases
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', level: 85 },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', level: 82 },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', level: 85 },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', level: 80 },
  
  // Cloud & DevOps
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', level: 85 },
  { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', level: 80 },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', level: 82 },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', level: 90 },
  
  // Tools & Others
  { name: 'RabbitMQ', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg', level: 75 },
  { name: 'Jest', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg', level: 80 },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', level: 92 }
];

export function AboutSection() {
  return (
    <section id="about" className="mx-auto mt-32 max-w-6xl scroll-mt-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100">About Me 👨‍💻</h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <motion.p
              className="text-base leading-relaxed text-slate-600 dark:text-slate-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Hey there! I'm Amarjyoti Patra, a{' '}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Full Stack Software Engineer</span> with 3+ years of
              experience building modern web applications that make a real impact.
            </motion.p>
            <motion.p
              className="text-base leading-relaxed text-slate-600 dark:text-slate-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              I specialize in the <strong>MERN stack</strong> (MongoDB, Express, React, Node.js) and <strong>Java ecosystem</strong> with Spring Boot and microservices. 
              I love architecting scalable solutions using modern technologies like TypeScript, Next.js, Vue.js, and cloud platforms (AWS, Azure). 
              From crafting pixel-perfect UIs to optimizing database queries (MySQL, PostgreSQL, MongoDB, Redis), I enjoy every aspect of the development lifecycle.
            </motion.p>
            <motion.p
              className="text-base leading-relaxed text-slate-600 dark:text-slate-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the
              developer community. I believe in writing clean, maintainable code and delivering exceptional user experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                Problem Solver
              </span>
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                Team Player
              </span>
              <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                Quick Learner
              </span>
            </motion.div>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-slate-100">Tech Arsenal ⚡</h3>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group relative flex flex-col items-center gap-3"
                >
                  <div className="relative h-16 w-16 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition-all group-hover:border-emerald-300 group-hover:shadow-lg group-hover:shadow-emerald-500/20 dark:border-slate-700 dark:bg-slate-800/60">
                    <div className="relative h-full w-full">
                      <Image
                        src={skill.icon}
                        alt={`${skill.name} logo`}
                        fill
                        className="object-contain p-1"
                        unoptimized
                      />
                    </div>
                  </div>
                  <span className="text-center text-xs font-medium text-slate-600 dark:text-slate-400">{skill.name}</span>
                  
                  {/* Tooltip with proficiency */}
                  <div className="pointer-events-none absolute -top-12 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-slate-700">
                    Proficiency: {skill.level}%
                    <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-slate-900 dark:bg-slate-700" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
