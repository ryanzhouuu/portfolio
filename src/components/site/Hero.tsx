'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Chrome form, off to the right — the object emerging from darkness */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-full bg-cover bg-right bg-no-repeat opacity-90 lg:w-[68%]"
        style={{ backgroundImage: `url(${withBasePath('/images/backgrounds/chrome-negative-left.png')})` }}
      />
      {/* Pull the left/center back into pure black so the name sits in shadow */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-void via-void/95 to-transparent lg:via-void/70"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
      <div aria-hidden className="light-cone absolute left-[18%] top-0 h-[64vh] w-[34rem] -translate-x-1/2 opacity-70" />
      <div aria-hidden className="projection-streak absolute left-[-20%] top-[22%] h-40 w-[115%] -rotate-6 opacity-45" />
      <div aria-hidden className="floor-reflection absolute bottom-[-7rem] left-1/2 h-56 w-[90%] opacity-35 [--floor-shift:-50%]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl py-28">
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="label mb-7 flex items-center gap-3"
          >
            <span className="inline-block h-px w-8 bg-steel/60" />
            Software Engineer · Austin, TX
          </motion.p>

          {/* Name, revealed by a sweep of light. No overflow clip here — the
              sweep's own soft gradient + blur fade it out, and it travels far
              enough to clear the name entirely on both ends. */}
          <div className="relative inline-block pb-2 pr-1">
            <motion.h1
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, ease, delay: 0.2 }}
              className="font-display text-chrome-shine text-[clamp(3.25rem,12vw,8.5rem)]"
            >
              Ryan&nbsp;Zhou
            </motion.h1>

            {!reduce && (
              <motion.span
                aria-hidden
                initial={{ x: '-160%', opacity: 0 }}
                animate={{ x: '340%', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.6, ease, delay: 0.5 }}
                className="absolute inset-y-0 left-0 w-1/3 skew-x-[-12deg] bg-gradient-to-r from-transparent via-spotlight/70 to-transparent mix-blend-screen blur-md"
              />
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
            className="mt-7 max-w-xl"
          >
            <p className="font-display-thin text-lg text-silver sm:text-xl">{personalInfo.title}</p>
            <p className="mt-4 text-base leading-relaxed text-steel sm:text-lg">
              {personalInfo.positioning}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <a
              href="#work"
              className="group flex items-center gap-3 border border-metal bg-metal/30 px-6 py-3 font-mono text-[11px] uppercase tracking-widest2 text-chrome transition-all duration-500 ease-cinematic hover:border-silver/40 hover:bg-metal/60 hover:shadow-[0_0_40px_-12px_rgba(234,242,255,0.5)]"
            >
              Selected Work
              <ArrowDown size={13} className="transition-transform duration-500 group-hover:translate-y-1" />
            </a>

            <div className="flex items-center gap-5">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-steel transition-colors duration-300 hover:text-chrome">
                <Github size={18} strokeWidth={1.5} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-steel transition-colors duration-300 hover:text-chrome">
                <Linkedin size={18} strokeWidth={1.5} />
              </a>
              <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="text-steel transition-colors duration-300 hover:text-chrome">
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="label !tracking-widest2 text-[10px]">Scroll</span>
        <motion.span
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-steel/60" strokeWidth={1.5} />
        </motion.span>
      </motion.div>
    </section>
  );
}
