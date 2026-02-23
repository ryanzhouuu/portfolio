'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { experience } from '@/lib/data';

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="experience" className="py-16 sm:py-24 lg:py-32 border-t border-border">
      <div className="px-5 sm:px-8 lg:px-16 max-w-4xl" ref={ref}>
        <SectionHeader index="03" title="experience" />

        <div className="relative pl-5 sm:pl-6 border-l border-border space-y-10 sm:space-y-14">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -8 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[23px] sm:-left-[25px] top-1.5 w-2.5 h-2.5 border border-ink bg-bg" />

              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                  <h3 className="font-mono text-sm sm:text-base font-semibold text-ink">{exp.company}</h3>
                  {exp.location && (
                    <span className="font-mono text-xs text-muted/60">{exp.location}</span>
                  )}
                </div>
                <div className="flex items-baseline flex-wrap gap-x-3 gap-y-0.5">
                  <p className="font-serif text-sm text-ink/70 italic">{exp.role}</p>
                  <span className="font-mono text-xs text-muted">{exp.period}</span>
                </div>
                <ul className="pt-2 space-y-1.5">
                  {exp.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex gap-2 font-serif text-sm text-ink/65 leading-relaxed">
                      <span className="font-mono text-muted/40 mt-0.5 flex-shrink-0">–</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
