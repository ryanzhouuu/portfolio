'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { personalInfo } from '@/lib/data';

interface Props {
  inView?: boolean;
  compact?: boolean;
}

export default function About({ inView: inViewProp, compact }: Props = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const internalInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const isInView = inViewProp ?? internalInView;

  return (
    <section id="about" className={compact ? 'py-4' : 'py-16 sm:py-24 lg:py-32 border-t border-border'}>
      <div className={compact ? 'px-4 max-w-none' : 'px-5 sm:px-8 lg:px-16 max-w-4xl'} ref={ref}>
        <SectionHeader index="01" title="about" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-4 max-w-2xl"
        >
          <p className="font-serif text-sm sm:text-base lg:text-lg text-ink/75 leading-relaxed">
            {personalInfo.bio}
          </p>
          <p className="font-serif text-sm sm:text-base text-ink/60 leading-relaxed">
            When I&apos;m not building software, I&apos;m working out, watching anime, or three-crowning opponents in Clash Royale.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
