'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Typewriter from '@/components/ui/Typewriter';
import { personalInfo } from '@/lib/data';

export default function Hero() {
  const [nameComplete, setNameComplete] = useState(false);
  const [titleComplete, setTitleComplete] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-3.5rem)] lg:min-h-screen flex items-center relative dot-grid"
    >
      {/* Fade-out dot grid at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

      <div className="w-full px-5 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16 items-center">

          {/* Photo — above text on mobile, right column on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="lg:col-span-2 flex justify-center lg:justify-end order-first lg:order-last"
          >
            <div className="relative">
              {/* Dot-grid border frame */}
              <div className="absolute -inset-3 border border-border dot-grid opacity-60" />
              <div className="relative w-36 h-36 sm:w-48 sm:h-48 lg:w-72 lg:h-72 border border-border overflow-hidden">
                <Image
                  src={personalInfo.photo}
                  alt="Ryan Zhou"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>
              {/* Corner accent */}
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r border-b border-ink/30" />
            </div>
          </motion.div>

          {/* Text */}
          <div className="lg:col-span-3 space-y-5 sm:space-y-7 order-last lg:order-first">
            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-xs text-muted">available for internships</span>
            </motion.div>

            {/* Name */}
            <div className="space-y-2">
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">
                $ whoami
              </p>
              <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink leading-none tracking-tighter">
                <Typewriter
                  text="Ryan Zhou"
                  speed={70}
                  delay={400}
                  onComplete={() => setNameComplete(true)}
                />
              </h1>
              {nameComplete && (
                <p className="font-serif text-base sm:text-lg lg:text-xl text-muted italic leading-relaxed max-w-sm">
                  <Typewriter
                    text={personalInfo.title}
                    speed={35}
                    delay={200}
                    onComplete={() => setTitleComplete(true)}
                  />
                </p>
              )}
            </div>

            {/* Bio */}
            {titleComplete && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-serif text-sm sm:text-base lg:text-lg text-ink/70 leading-relaxed max-w-md"
              >
                {personalInfo.bio}
              </motion.p>
            )}

            {/* CTAs */}
            {titleComplete && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-wrap items-center gap-5 sm:gap-6 pt-1"
              >
                <button
                  onClick={() => scrollTo('projects')}
                  className="group flex items-center gap-2 font-mono text-sm text-ink underline-draw"
                >
                  <span>view projects</span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="font-mono text-sm text-muted hover:text-ink transition-colors underline-draw"
                >
                  contact me
                </button>
              </motion.div>
            )}

            {/* Social */}
            {titleComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-5 pt-2"
              >
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={17} strokeWidth={1.5} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={17} strokeWidth={1.5} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-muted hover:text-ink transition-colors"
                  aria-label="Email"
                >
                  <Mail size={17} strokeWidth={1.5} />
                </a>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
