'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { skills, techLogos, personalInfo } from '@/lib/data';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const duplicated = [...techLogos, ...techLogos];

  return (
    <section id="about" className="py-24 lg:py-32 border-t border-border">
      <div className="px-6 lg:px-16 max-w-4xl" ref={ref}>
        <SectionHeader index="01" title="about" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="font-serif text-base lg:text-lg text-ink/75 leading-relaxed mb-4">
              {personalInfo.bio}
            </p>
            <p className="font-serif text-base text-ink/60 leading-relaxed">
              When I&apos;m not building software, I&apos;m thinking about systems design, financial markets,
              or trying to beat my friends at chess.
            </p>
          </motion.div>

          {/* Skills grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            {skills.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              >
                <p className="font-mono text-[10px] text-muted/60 tracking-widest uppercase mb-3">
                  {cat.category}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {cat.items.map((skill) => (
                    <span key={skill} className="font-mono text-xs text-ink/60 hover:text-ink transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tech ticker */}
        <div className="border-t border-border pt-10">
          <p className="font-mono text-[10px] text-muted/60 tracking-widest uppercase mb-6">
            languages &amp; tools
          </p>
          <div className="ticker-wrapper relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
            <div className="flex ticker-track animate-scroll-left w-max">
              {duplicated.map((lang, index) => (
                <div
                  key={`${lang.name}-${index}`}
                  className="flex flex-col items-center justify-center mx-8 group cursor-pointer"
                >
                  <div className="w-10 h-10 mb-2 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={lang.logo} alt={lang.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-mono text-[10px] text-muted/50 group-hover:text-muted transition-colors">
                    {lang.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
