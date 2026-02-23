'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { personalInfo } from '@/lib/data';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 border-t border-border">
      <div className="px-5 sm:px-8 lg:px-16 max-w-4xl" ref={ref}>
        <SectionHeader index="05" title="contact" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-5 sm:space-y-6"
          >
            <p className="font-serif text-base sm:text-lg text-ink/70 leading-relaxed">
              I&apos;m always open to interesting opportunities, collaborations, or conversation
              about software, Clash Royale, or anything else.
            </p>
            <p className="font-serif text-sm sm:text-base text-ink/50 leading-relaxed">
              The best way to reach me is email — I try to respond as quickly as possible.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="group inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-ink border-b border-ink pb-0.5 hover:opacity-60 transition-opacity break-all"
            >
              {personalInfo.email}
              <ArrowUpRight size={12} className="flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <p className="font-mono text-[10px] text-muted/60 tracking-widest uppercase">elsewhere</p>
            <div className="space-y-2 sm:space-y-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 py-3 border-b border-border hover:border-ink/30 transition-colors"
              >
                <Github size={15} strokeWidth={1.5} className="flex-shrink-0 text-muted group-hover:text-ink transition-colors" />
                <span className="font-mono text-xs text-muted group-hover:text-ink transition-colors truncate">
                  github.com/ryanzhouuu
                </span>
                <ArrowUpRight size={12} className="flex-shrink-0 text-muted/40 ml-auto group-hover:text-ink/40 transition-colors" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 py-3 border-b border-border hover:border-ink/30 transition-colors"
              >
                <Linkedin size={15} strokeWidth={1.5} className="flex-shrink-0 text-muted group-hover:text-ink transition-colors" />
                <span className="font-mono text-xs text-muted group-hover:text-ink transition-colors truncate">
                  linkedin.com/in/ryanzhouuu
                </span>
                <ArrowUpRight size={12} className="flex-shrink-0 text-muted/40 ml-auto group-hover:text-ink/40 transition-colors" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 sm:mt-24 pt-8 border-t border-border flex items-center justify-between"
        >
          <span className="font-mono text-[10px] text-muted/40">
            © {new Date().getFullYear()} Ryan Zhou
          </span>
          <span className="font-mono text-[10px] text-muted/40">
            built with next.js
          </span>
        </motion.div>
      </div>
    </section>
  );
}
