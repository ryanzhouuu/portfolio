'use client';

import Image from 'next/image';
import { education } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';
import Reveal from './Reveal';

export default function Education() {
  const [primary, ...rest] = education;

  return (
    <section id="education" className="relative scroll-mt-20 overflow-hidden py-28 lg:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/20 to-transparent" />
      <div aria-hidden className="absolute right-[-16%] top-[18%] h-[28rem] w-[42rem] bg-[radial-gradient(ellipse,rgba(232,217,181,0.11),transparent_66%)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="label mb-5">
            <span className="text-silver">03</span> — Education
          </p>
        </Reveal>

        {/* Primary credential plate — the one warm-lit moment on the page */}
        <Reveal>
          <div className="surface group relative overflow-hidden rounded-sm">
            {primary.banner && (
              <div aria-hidden className="absolute inset-0">
                <Image
                  src={withBasePath(primary.banner)}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover opacity-30 grayscale transition-opacity duration-700 ease-cinematic group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/40" />
                {/* champagne warm light, used nowhere else */}
                <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_15%_50%,rgba(232,217,181,0.12),transparent_60%)]" />
                <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-champagne/[0.09] to-transparent" />
              </div>
            )}

            <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div aria-hidden className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-champagne/80">
                  {primary.period}
                </p>
                <h3 className="font-display mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] text-chrome-plate">
                  {primary.school}
                </h3>
                <p className="mt-2 text-base text-silver">{primary.degree}</p>

                <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                  {primary.details.map((d) => (
                    <li
                      key={d}
                      className="border border-champagne/20 bg-champagne/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-champagne/80"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* GPA readout, etched */}
              <div className="shrink-0 border-l border-metal/0 lg:border-metal/60 lg:pl-10">
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-steel">GPA</p>
                <p className="font-display mt-2 text-3xl text-champagne">{primary.gpa}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Quieter secondary plates */}
        {rest.map((edu) => (
          <Reveal key={edu.school} delay={0.05}>
            <div className="surface mt-5 flex flex-wrap items-center justify-between gap-4 rounded-sm px-7 py-5">
              <div>
                <h3 className="font-display-thin text-lg text-silver">{edu.school}</h3>
                <p className="mt-1 text-sm text-steel">{edu.degree}</p>
              </div>
              <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-widest2 text-steel">
                <span>{edu.period}</span>
                <span aria-hidden className="h-3 w-px bg-metal" />
                <span>{edu.gpa}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
