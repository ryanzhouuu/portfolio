'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { experience } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';
import Reveal from './Reveal';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Experience() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="relative scroll-mt-20 overflow-hidden py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.1] mix-blend-screen"
        style={{ backgroundImage: `url(${withBasePath('/images/backgrounds/chrome-negative-center.png')})` }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void via-void/75 to-void" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-metal to-transparent" />
      <div aria-hidden className="projection-streak absolute left-[-28%] top-[18%] h-32 w-[120%] rotate-3 opacity-35" />
      <div aria-hidden className="absolute bottom-[-15%] left-[-10%] h-[34rem] w-[34rem] bg-[radial-gradient(circle,rgba(234,242,255,0.08),transparent_64%)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="label mb-5">
            <span className="text-silver">02</span> — Experience
          </p>
          <h2 className="font-display max-w-2xl text-[clamp(2rem,5vw,3.5rem)] text-chrome-plate">
            Work Experience
          </h2>
        </Reveal>

        {/* The beam: a thin vertical light rail with plaques along it */}
        <div className="relative mt-16 pl-8 sm:pl-12">
          {/* rail */}
          <div aria-hidden className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-metal to-transparent sm:left-1.5" />
          <div aria-hidden className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-spotlight/60 to-transparent opacity-60 blur-[1px] sm:left-1.5" />

          <ol className="space-y-6">
            {experience.map((role, i) => {
              const open = i === active;
              return (
                <Reveal as="li" key={role.company} delay={0.05 * i}>
                  <button
                    onClick={() => setActive(open ? -1 : i)}
                    onMouseEnter={() => setActive(i)}
                    aria-expanded={open}
                    className="group relative block w-full text-left"
                  >
                    {/* node on the rail */}
                    <span
                      aria-hidden
                      className={`absolute top-6 h-2.5 w-2.5 -translate-x-[calc(2rem+1px)] rounded-full border transition-all duration-500 ease-cinematic sm:-translate-x-[calc(3rem-0px)] ${
                        open
                          ? 'border-spotlight bg-spotlight shadow-[0_0_18px_2px_rgba(234,242,255,0.55)]'
                          : 'border-steel/60 bg-void'
                      }`}
                      style={{ left: 0 }}
                    />

                    <div
                      className={`surface relative overflow-hidden rounded-sm px-6 py-5 transition-all duration-500 ease-cinematic ${
                        open
                          ? 'border-silver/25 shadow-[0_0_60px_-24px_rgba(234,242,255,0.6)]'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute inset-0 bg-cover bg-center mix-blend-screen transition-opacity duration-700 ease-cinematic ${
                          open ? 'opacity-[0.08]' : 'opacity-[0.035]'
                        }`}
                        style={{ backgroundImage: `url(${withBasePath('/images/backgrounds/chrome-negative-center.png')})` }}
                      />
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-spotlight/[0.08] to-transparent transition-opacity duration-500 ${
                          open ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-spotlight/50 to-transparent transition-opacity duration-500 ${
                          open ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      <div
                        aria-hidden
                        className={`pointer-events-none absolute -right-14 -top-16 h-60 w-60 transition-all duration-700 ease-cinematic ${
                          open ? 'opacity-[0.11]' : 'opacity-[0.04]'
                        }`}
                      >
                        <Image
                          src={withBasePath(role.logo)}
                          alt=""
                          fill
                          sizes="240px"
                          className="object-contain grayscale"
                        />
                      </div>

                      <div className="relative flex gap-5">
                        <div
                          className={`relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-sm border bg-void/70 transition-all duration-500 ease-cinematic sm:h-24 sm:w-24 ${
                            open
                              ? 'border-silver/30 shadow-[0_0_38px_-16px_rgba(234,242,255,0.75)]'
                              : 'border-metal/70'
                          }`}
                        >
                          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(234,242,255,0.12),transparent_64%)]" />
                          <Image
                            src={withBasePath(role.logo)}
                            alt={`${role.company} logo`}
                            fill
                            sizes="96px"
                            className="object-contain p-2"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <h3 className="font-display-thin text-xl text-chrome">{role.company}</h3>
                            <span className="font-mono text-[10px] uppercase tracking-widest2 text-steel">
                              {role.period}
                            </span>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="text-sm text-silver">{role.role}</span>
                            <span aria-hidden className="h-3 w-px bg-metal" />
                            <span className="font-mono text-[10px] uppercase tracking-widest text-steel">
                              {role.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                        transition={{ duration: reduce ? 0.2 : 0.55, ease }}
                        className="overflow-hidden sm:ml-[7.25rem]"
                      >
                        <ul className="mt-4 space-y-2 border-t border-metal/60 pt-4">
                          {role.bullets.map((b, bi) => (
                            <li key={bi} className="flex gap-3 text-sm leading-relaxed text-silver">
                              <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-steel/60" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
