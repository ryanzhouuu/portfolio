'use client';

import Image from 'next/image';
import { personalInfo, stack } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';
import { CIcon, CodexIcon, CursorIcon, FastApiIcon, OpenCodeIcon, PostgreSqlIcon, PythonIcon, ReactIcon, TypeScriptIcon } from './LangIcon';
import CinematicHeading from './CinematicHeading';
import Reveal from './Reveal';

const langIcons = {
  python: PythonIcon,
  typescript: TypeScriptIcon,
  c: CIcon,
  react: ReactIcon,
  fastapi: FastApiIcon,
  postgresql: PostgreSqlIcon,
  codex: CodexIcon,
  opencode: OpenCodeIcon,
  cursor: CursorIcon,
} as const;

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
            <CinematicHeading className="font-display mt-8 max-w-md text-[clamp(1.75rem,4vw,2.75rem)] text-chrome-plate">
              A little bit about me
            </CinematicHeading>
            <p className="mt-5 max-w-md text-base leading-relaxed text-silver">{personalInfo.bio}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] lowercase tracking-widest2 text-steel">
              <a href={`mailto:${personalInfo.email}`} className="transition-colors duration-300 hover:text-chrome">
                {personalInfo.email}
              </a>
              <span aria-hidden className="h-3 w-px bg-metal" />
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-chrome">
                GitHub
              </a>
              <span aria-hidden className="h-3 w-px bg-metal" />
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-chrome">
                LinkedIn
              </a>
            </div>
          </Reveal>

          {/* Tech stack — featured languages + tooling row */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="label mb-4">My Tech Stack</p>
            {[
              { items: stack.languages, first: true },
              { items: stack.frameworks, first: false },
            ].map(({ items, first }) => (
              <div
                key={first ? 'languages' : 'frameworks'}
                className={`${first ? '' : 'mt-4'} grid grid-cols-3 gap-px overflow-hidden rounded-sm border ${
                  first ? 'border-metal/60 bg-metal/40' : 'border-metal/40 bg-metal/30'
                }`}
              >
                {items.map((item) => {
                  const Icon = langIcons[item.icon];
                  return (
                    <div
                      key={item.name}
                      className="group relative flex h-20 flex-col items-center justify-center gap-2 bg-void/80 px-4 transition-colors duration-500 ease-cinematic hover:bg-graphite"
                    >
                      <span aria-hidden className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <Icon
                        size={28}
                        className="text-steel transition-all duration-500 ease-cinematic group-hover:-translate-y-0.5 group-hover:text-chrome"
                      />
                      <span className="font-mono text-[11px] uppercase tracking-widest2 text-silver transition-colors duration-300 group-hover:text-chrome">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Tooling row */}
            <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-metal/40 bg-metal/30">
              {stack.tools.map((tool) => {
                const Icon = langIcons[tool.icon];
                return (
                  <div
                    key={tool.name}
                    className="group flex h-20 flex-col items-center justify-center gap-1.5 bg-void/80 px-4 transition-colors duration-500 ease-cinematic hover:bg-graphite"
                  >
                    <Icon
                      size={18}
                      className="text-steel transition-colors duration-300 group-hover:text-champagne"
                    />
                    <span className="font-mono text-[11px] uppercase tracking-widest2 text-steel transition-colors duration-300 group-hover:text-silver">
                      {tool.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
