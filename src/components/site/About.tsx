'use client';

import Image from 'next/image';
import { personalInfo, skills } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden py-28 lg:py-32">
      <div aria-hidden className="projection-streak absolute right-[-20%] top-[12%] h-28 w-[110%] -rotate-6 opacity-25" />
      <div aria-hidden className="absolute inset-y-0 right-0 w-[42vw] bg-[radial-gradient(80%_60%_at_70%_45%,rgba(184,192,204,0.08),transparent_68%)]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="label mb-5">
            <span className="text-silver">04</span> — About
          </p>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait + bio */}
          <Reveal className="lg:col-span-5">
            <div className="relative max-w-xs">
              <div aria-hidden className="spot-glow absolute -inset-12 opacity-45" />
              <div className="surface relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src={withBasePath(personalInfo.photo)}
                  alt="Ryan Zhou"
                  fill
                  sizes="(max-width: 1024px) 60vw, 300px"
                  className="object-cover grayscale transition-all duration-700 ease-cinematic hover:grayscale-0"
                />
                {/* a sweep of light across the frame */}
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-spotlight/10" />
                <div aria-hidden className="light-scan pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-30" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-silver/40 to-transparent" />
              </div>
            </div>
            <h2 className="font-display mt-8 max-w-md text-[clamp(1.75rem,4vw,2.75rem)] text-chrome-plate">
              A little bit about me
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-silver">{personalInfo.bio}</p>
          </Reveal>

          {/* Skills spec sheet */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="label mb-4">Stack — Specification</p>
            <div className="surface rounded-sm">
              {skills.map((group, i) => (
                <div
                  key={group.category}
                  className={`grid grid-cols-1 gap-x-6 gap-y-3 px-6 py-5 sm:grid-cols-[140px_1fr] ${
                    i !== skills.length - 1 ? 'border-b border-metal/60' : ''
                  }`}
                >
                  <div className="font-mono text-[11px] uppercase tracking-widest2 text-steel">
                    {group.category}
                  </div>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="font-mono text-sm text-silver transition-colors duration-300 hover:text-chrome"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
