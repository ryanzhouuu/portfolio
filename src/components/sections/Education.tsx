'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import Tag from '@/components/ui/Tag';
import { education } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';

interface Props {
  inView?: boolean;
  compact?: boolean;
}

export default function Education({ inView: inViewProp, compact }: Props = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const internalInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const isInView = inViewProp ?? internalInView;

  return (
    <section id="education" className={compact ? "py-4" : "py-16 sm:py-24 lg:py-32 border-t border-border"}>
      <div className={compact ? "px-4 max-w-none" : "px-5 sm:px-8 lg:px-16 max-w-4xl"} ref={ref}>
        <SectionHeader index="02" title="education" />

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative w-full h-32 sm:h-40 lg:h-56 border border-border overflow-hidden mb-10 sm:mb-16 group"
        >
          <Image
            src={withBasePath('/images/banner.jpg')}
            alt="UT Austin Campus"
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-bg/30 group-hover:bg-transparent transition-colors duration-500" />
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-5 sm:pl-6 border-l border-border space-y-10 sm:space-y-14">
          {education.map((edu, index) => (
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
                <p className="font-mono text-xs text-muted">{edu.period}</p>
                <h3 className="font-mono text-sm sm:text-base font-semibold text-ink">{edu.school}</h3>
                <p className="font-serif text-sm text-ink/70 italic leading-snug">{edu.degree}</p>
                <p className="font-mono text-xs text-muted">GPA: {edu.gpa}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1.5 sm:pt-2">
                  {edu.details.map((d) => (
                    <Tag key={d} label={d} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
