"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import { withBasePath } from "@/lib/basePath";
import Reveal from "./Reveal";

const ease = [0.16, 1, 0.3, 1] as const;
const pad = (n: number) => String(n + 1).padStart(2, "0");

export default function ProjectGallery() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = projects[active];
  const stageStyle = {
    "--stage-x": `${28 + (active / Math.max(projects.length - 1, 1)) * 44}%`,
  } as CSSProperties;

  return (
    <section id="work" className="relative scroll-mt-20 overflow-hidden py-28 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-[-18vw] w-[70vw] bg-cover bg-center opacity-[0.16]"
        style={{ backgroundImage: `url(${withBasePath("/images/backgrounds/chrome-negative-center.png")})` }}
      />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_34%,rgba(234,242,255,0.06),transparent_62%)]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="label mb-5">
            <span className="text-silver">01</span> — Selected Work
          </p>
          <h2 className="font-display max-w-2xl text-[clamp(2rem,5vw,3.5rem)] text-chrome-plate">
            Projects
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-steel">
            Some of the cool things I&apos;ve built. Feel free to explore and learn
            more.
          </p>
        </Reveal>

        {/* ---- Desktop: exhibit index + spotlit stage ---- */}
        <div className="relative mt-16 hidden gap-12 lg:grid lg:grid-cols-12" style={stageStyle}>
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 -right-10 top-[-4rem] h-[34rem] overflow-hidden"
          >
            <div className="light-cone absolute left-[var(--stage-x)] top-0 h-[34rem] w-[32rem] -translate-x-1/2 opacity-90 [will-change:left]" />
            <div className="projection-streak absolute left-[12%] top-[45%] h-28 w-[85%] -rotate-3 opacity-50" />
          </div>

          {/* Index */}
          <div className="relative lg:col-span-4">
            <ul className="overflow-y-auto max-h-[min(32rem,65vh)] scrollbar-none">
            {projects.map((p, i) => {
              const selected = i === active;
              return (
                <li
                  key={p.slug}
                  className="border-t border-metal/60 last:border-b"
                >
                  <Link
                    href={`/projects/${p.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`group relative flex items-baseline gap-4 py-3 transition-colors duration-500 ease-cinematic ${
                      selected ? "pl-3" : "pl-0"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-spotlight to-transparent transition-opacity duration-500 ${
                        selected ? "opacity-90" : "opacity-0"
                      }`}
                    />
                    <span
                      className={`font-mono text-[11px] tracking-widest transition-colors duration-500 ${
                        selected ? "text-spotlight" : "text-steel/50"
                      }`}
                    >
                      {pad(i)}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`font-display-thin block text-xl leading-tight transition-all duration-500 ease-cinematic ${
                          selected
                            ? "translate-x-1 text-chrome"
                            : "text-steel group-hover:text-silver"
                        }`}
                      >
                        {p.title}
                      </span>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-widest2 transition-opacity duration-500 ${
                          selected ? "text-steel opacity-100" : "opacity-0"
                        }`}
                      >
                        {p.category}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className={`shrink-0 self-center transition-all duration-500 ${
                        selected
                          ? "text-spotlight opacity-100"
                          : "text-steel opacity-0 group-hover:opacity-60"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
            </ul>
            {/* fade hint for scrollable overflow */}
            <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-void to-transparent" />
          </div>

          {/* Stage */}
          <div className="lg:col-span-8">
            <div className="relative">
              {/* spotlight glow behind the piece */}
              <div
                aria-hidden
                className="spot-glow absolute -inset-x-20 -top-20 bottom-0 -z-0"
              />
              <div
                aria-hidden
                className="floor-reflection absolute -bottom-28 left-1/2 h-56 w-[115%] opacity-45 [--floor-shift:-50%]"
              />

              <Link
                href={`/projects/${current.slug}`}
                className="group relative z-10 block"
                aria-label={`Open ${current.title}`}
              >
                <div className="surface surface-hover relative aspect-[16/10] overflow-hidden rounded-sm bg-graphite shadow-[0_35px_120px_-55px_rgba(234,242,255,0.75)]">
                  <AnimatePresence mode="sync">
                    <motion.div
                      key={current.slug}
                      initial={
                        reduce ? { opacity: 0 } : { opacity: 0, scale: 1.015 }
                      }
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { duration: reduce ? 0.25 : 0.4, ease },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
                      }}
                      className="absolute inset-0 flex items-center justify-center p-6"
                    >
                      <Image
                        src={withBasePath(current.image)}
                        alt={current.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-contain p-6"
                        priority={active === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                  {/* scan line sweeps on every project change */}
                  <div key={current.slug + "-scan"} aria-hidden className="scan-line" />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_34%,transparent_0%,transparent_55%,rgba(3,3,3,0.68)_100%)]"
                  />
                  <div
                    aria-hidden
                    className="light-scan pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-70"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-8 bottom-5 h-px bg-gradient-to-r from-transparent via-spotlight/50 to-transparent"
                  />
                  <div className="absolute left-5 top-5 border border-silver/20 bg-void/40 px-3 py-2 font-mono text-[10px] uppercase tracking-widest2 text-silver backdrop-blur-sm">
                    Exhibit {pad(active)}
                  </div>
                  {/* top edge highlight */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-silver/30 to-transparent"
                  />
                </div>

                {/* reflection */}
                <div
                  aria-hidden
                  className="relative mt-px h-28 overflow-hidden opacity-35 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.62),transparent)]"
                >
                  <div className="relative h-[10rem] w-full -scale-y-100">
                    <Image
                      src={withBasePath(current.image)}
                      alt=""
                      fill
                      sizes="60vw"
                      className="object-contain p-6"
                    />
                  </div>
                </div>
              </Link>

              {/* metadata, in the dark below the stage */}
              <AnimatePresence mode="sync">
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="relative z-10 mt-8 flex flex-wrap items-end justify-between gap-6"
                >
                  <div className="max-w-md">
                    <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-steel">
                      <span>{current.role}</span>
                      <span className="h-3 w-px bg-metal" />
                      <span>{current.year}</span>
                    </div>
                    <h3 className="font-display text-3xl text-chrome">
                      {current.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-silver">
                      {current.shortDescription}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {current.technologies.map((t) => (
                        <span
                          key={t}
                          className="border border-metal/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-steel"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    {current.githubUrl && (
                      <a
                        href={current.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${current.title} source`}
                        className="text-steel transition-colors hover:text-chrome"
                      >
                        <Github size={18} strokeWidth={1.5} />
                      </a>
                    )}
                    {current.liveUrl && (
                      <a
                        href={current.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${current.title} live`}
                        className="text-steel transition-colors hover:text-chrome"
                      >
                        <ExternalLink size={18} strokeWidth={1.5} />
                      </a>
                    )}
                    <Link
                      href={`/projects/${current.slug}`}
                      className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-chrome"
                    >
                      <span className="link-underline">Open</span>
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ---- Mobile: stacked spotlit cards ---- */}
        <div className="mt-12 grid gap-8 lg:hidden">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={0.04 * i}>
              <Link href={`/projects/${p.slug}`} className="group block">
                <div className="relative">
                  <div aria-hidden className="spot-glow absolute -inset-8 opacity-40" />
                  <div className="surface relative aspect-[16/10] overflow-hidden rounded-sm bg-graphite">
                  <Image
                    src={withBasePath(p.image)}
                    alt={p.title}
                    fill
                    sizes="100vw"
                    className="object-contain p-5"
                  />
                  <div aria-hidden className="light-scan pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-25" />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-silver/30 to-transparent"
                  />
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-widest2 text-steel">
                      {pad(i)} · {p.category} · {p.year}
                    </div>
                    <h3 className="font-display text-2xl text-chrome">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver">
                      {p.shortDescription}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-steel transition-colors group-hover:text-chrome"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
