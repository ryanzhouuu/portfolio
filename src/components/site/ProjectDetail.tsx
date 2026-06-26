'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';
import Reveal from './Reveal';

const ease = [0.16, 1, 0.3, 1] as const;

const stages = [
  { key: 'problem', label: 'Problem' },
  { key: 'build', label: 'Build' },
  { key: 'result', label: 'Result' },
] as const;

export default function ProjectDetail({ project, next }: { project: Project; next: Project }) {
  const reduce = useReducedMotion();

  return (
    <main className="relative">
      {/* top bar */}
      <div className="fixed inset-x-0 top-0 z-50 border-b border-metal/40 bg-void/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/#work"
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-steel transition-colors hover:text-chrome"
          >
            <ArrowLeft size={14} className="transition-transform duration-500 group-hover:-translate-x-1" />
            Ryan Zhou
          </Link>
          <div className="flex items-center gap-5">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="Source" className="text-steel transition-colors hover:text-chrome">
                <Github size={17} strokeWidth={1.5} />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live" className="text-steel transition-colors hover:text-chrome">
                <ExternalLink size={17} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pt-36">
        {/* chrome stage — kept as shot: chrome on the left, negative space on the right */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-left bg-no-repeat opacity-50"
          style={{ backgroundImage: `url(${withBasePath('/images/backgrounds/chrome-negative-right.png')})` }}
        />
        {/* mute the left for legible copy; keep the right a clean black stage for the screenshot */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-void/60 via-void/15 to-void" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/30" />
        <div aria-hidden className="light-cone absolute right-[8%] top-0 h-[34rem] w-[34rem] opacity-60" />
        <div aria-hidden className="floor-reflection absolute bottom-[-9rem] right-[6%] h-60 w-[58%] opacity-30" />

        <div className="relative mx-auto max-w-6xl">
          {/* full-width title so long single-word names never clip */}
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-steel">
              <span>{project.category}</span>
              <span aria-hidden className="h-3 w-px bg-metal" />
              <span>{project.role}</span>
              <span aria-hidden className="h-3 w-px bg-metal" />
              <span>{project.year}</span>
            </div>
            <h1 className="font-display break-words text-[clamp(2.25rem,7vw,5rem)] text-chrome-plate">{project.title}</h1>
          </Reveal>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <p className="max-w-md text-lg leading-relaxed text-silver">{project.description}</p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 border border-silver/30 bg-spotlight/[0.06] px-6 py-3 font-mono text-[11px] uppercase tracking-widest2 text-chrome shadow-[0_0_50px_-20px_rgba(234,242,255,0.7)] transition-all duration-500 ease-cinematic hover:border-silver/60 hover:bg-spotlight/[0.1]"
                  >
                    View Live
                    <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-steel transition-colors hover:text-chrome"
                  >
                    <Github size={15} strokeWidth={1.5} />
                    <span className="link-underline">Source</span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          {/* spotlit screenshot */}
          <Reveal delay={0.15}>
            <div className="relative">
              <div aria-hidden className="spot-glow absolute -inset-12 -z-0" />
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduce ? 0.4 : 1, ease }}
                className="surface relative z-10 aspect-[16/10] overflow-hidden rounded-sm bg-graphite shadow-[0_34px_110px_-54px_rgba(234,242,255,0.8)]"
              >
                <Image
                  src={withBasePath(project.image)}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6"
                  priority
                />
                <div aria-hidden className="light-scan pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-55" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-silver/30 to-transparent" />
              </motion.div>
            </div>
          </Reveal>
          </div>
        </div>
      </section>

      {/* problem / build / result */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div aria-hidden className="projection-streak absolute left-[-20%] top-[8%] h-28 w-[120%] -rotate-3 opacity-35" />
        <div className="mx-auto max-w-6xl">
          <div className="relative grid gap-px overflow-hidden rounded-sm border border-metal/60 bg-metal/40 md:grid-cols-3">
            {stages.map(({ key, label }, i) => (
              <Reveal key={key} delay={0.06 * i} className="bg-void/80 p-8 lg:p-10">
                <div className="mb-5 flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-widest text-spotlight">{String(i + 1).padStart(2, '0')}</span>
                  <span className="label !text-steel">{label}</span>
                </div>
                <p className="text-base leading-relaxed text-silver">{project[key]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* media beat */}
      <section className="relative overflow-hidden px-5 pb-24 sm:px-8 lg:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.1]"
          style={{ backgroundImage: `url(${withBasePath('/images/backgrounds/chrome-negative-center.png')})` }}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="label mb-6">Product Surface</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative">
              <div aria-hidden className="spot-glow absolute -inset-x-20 -top-20 bottom-0 opacity-70" />
              <div aria-hidden className="floor-reflection absolute -bottom-24 left-1/2 h-56 w-[108%] opacity-35 [--floor-shift:-50%]" />
              <div className="surface relative aspect-[16/8.5] overflow-hidden rounded-sm bg-graphite shadow-[0_40px_140px_-70px_rgba(234,242,255,0.75)]">
                <Image
                  src={withBasePath(project.image)}
                  alt={`${project.title} product surface`}
                  fill
                  sizes="100vw"
                  className="object-contain p-8 md:p-12"
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_35%,transparent,rgba(3,3,3,0.56)_100%)]" />
                <div aria-hidden className="light-scan pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-45" />
                <div aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-silver/40 to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* technical specs */}
      <section className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="label mb-6">Technical Specification</p>
          </Reveal>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="surface rounded-sm">
                <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-metal/60 px-6 py-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest2 text-steel">Stack</span>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {project.technologies.map((t) => (
                      <li key={t} className="font-mono text-sm text-silver">{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-metal/60 px-6 py-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest2 text-steel">Role</span>
                  <span className="font-mono text-sm text-silver">{project.role}</span>
                </div>
                <div className="grid grid-cols-[110px_1fr] gap-4 px-6 py-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest2 text-steel">Year</span>
                  <span className="font-mono text-sm text-silver">{project.year}</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="label mb-4">Highlights</p>
              <ul className="space-y-4">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-4 border-b border-metal/40 pb-4 text-base leading-relaxed text-silver last:border-b-0">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-spotlight/60" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* next project */}
      <section className="border-t border-metal/60">
        <Link href={`/projects/${next.slug}`} className="group relative block overflow-hidden">
          <div aria-hidden className="absolute inset-0 opacity-[0.06] transition-opacity duration-700 ease-cinematic group-hover:opacity-[0.12]">
            <Image src={withBasePath(next.image)} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
            <div>
              <p className="label mb-3">Next</p>
              <h2 className="font-display text-[clamp(1.75rem,5vw,3.25rem)] text-steel transition-colors duration-500 ease-cinematic group-hover:text-chrome">
                {next.title}
              </h2>
            </div>
            <ArrowUpRight
              size={40}
              strokeWidth={1}
              className="text-steel transition-all duration-500 ease-cinematic group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-spotlight"
            />
          </div>
        </Link>
      </section>
    </main>
  );
}
