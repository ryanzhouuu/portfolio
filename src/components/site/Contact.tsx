'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';
import Reveal from './Reveal';

const ease = [0.16, 1, 0.3, 1] as const;

const endpoints = [
  { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, Icon: Mail },
  { label: 'GitHub', value: 'ryanzhouuu', href: personalInfo.github, Icon: Github },
  { label: 'LinkedIn', value: 'ryanzhouuu', href: personalInfo.linkedin, Icon: Linkedin },
];

export default function Contact() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden pt-28 lg:pt-36">
      {/* faint chrome filaments, far back */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.18]"
        style={{ backgroundImage: `url(${withBasePath('/images/backgrounds/skinny-chrome-everywhere.png')})` }}
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-void" />
      <div aria-hidden className="light-cone absolute left-1/2 top-0 h-[38rem] w-[38rem] -translate-x-1/2 opacity-55" />
      <div aria-hidden className="floor-reflection absolute bottom-[-9rem] left-1/2 h-64 w-[80%] opacity-35 [--floor-shift:-50%]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="label mb-6">
              <span className="text-silver">05</span> — Contact
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2.25rem,7vw,5rem)] text-chrome-plate">
              Let&apos;s build
              <br />
              something.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-steel">
              Open to software engineering internships or any cool problems.
            </p>
          </Reveal>

          {/* luminous primary CTA */}
          <Reveal delay={0.15}>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={reduce ? undefined : { scale: 1.01 }}
              transition={{ duration: 0.5, ease }}
              className="group mt-12 inline-flex items-center gap-3 border border-silver/30 bg-spotlight/[0.06] px-8 py-4 font-mono text-sm uppercase tracking-widest2 text-chrome shadow-[0_0_60px_-20px_rgba(234,242,255,0.7)] transition-all duration-500 ease-cinematic hover:border-silver/60 hover:bg-spotlight/[0.1] hover:shadow-[0_0_70px_-14px_rgba(234,242,255,0.85)]"
            >
              {personalInfo.email}
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.a>
          </Reveal>
        </div>

        {/* signal endpoints */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-sm border border-metal/60 bg-metal/40 sm:grid-cols-3">
            {endpoints.map(({ label, value, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative flex items-center gap-4 overflow-hidden bg-void/80 px-6 py-5 transition-colors duration-500 ease-cinematic hover:bg-graphite"
              >
                <span aria-hidden className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-spotlight/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Icon size={18} strokeWidth={1.5} className="text-steel transition-colors duration-300 group-hover:text-spotlight" />
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-widest2 text-steel">{label}</span>
                  <span className="block truncate text-sm text-silver transition-colors duration-300 group-hover:text-chrome">{value}</span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* footer */}
        <footer className="mt-24 border-t border-metal/60 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span
              className="font-display text-sm text-steel"
              style={{ fontVariationSettings: "'wght' 700, 'wdth' 125" }}
            >
              RYAN&nbsp;ZHOU
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-steel/70">
              © {new Date().getFullYear()} · Built with Next.js
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
