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

const stackItems = [...stack.languages, ...stack.frameworks, ...stack.tools];

/**
 * Closing block: portrait, bio, links, and the stack as soft pills.
 */
export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden py-20 lg:py-24">
      <div aria-hidden className="projection-streak absolute right-[-20%] top-[12%] h-28 w-[110%] -rotate-6 opacity-25" />
      <div aria-hidden className="absolute inset-y-0 right-0 w-[42vw] bg-[radial-gradient(80%_60%_at_70%_45%,rgba(184,192,204,0.08),transparent_68%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative max-w-xs overflow-hidden rounded-[24px] border border-silver/15">
              <div className="relative aspect-[3/4]">
                <Image
                  src={withBasePath(personalInfo.photo)}
                  alt="Ryan Zhou"
                  fill
                  sizes="(max-width: 1024px) 60vw, 300px"
                  className="object-cover"
                />
              </div>
            </div>
            <CinematicHeading className="font-display mt-8 max-w-md text-[1.75rem] text-chrome">
              A little bit about me
            </CinematicHeading>
            <p className="mt-4 max-w-md text-base leading-relaxed text-silver">{personalInfo.bio}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-steel">
              <a href={`mailto:${personalInfo.email}`} className="transition-colors duration-300 hover:text-chrome">
                {personalInfo.email}
              </a>
              <span aria-hidden className="text-metal">·</span>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-chrome">
                GitHub
              </a>
              <span aria-hidden className="text-metal">·</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-chrome">
                LinkedIn
              </a>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="mb-4 text-sm text-steel">My tech stack</p>
            <ul className="flex flex-wrap gap-2">
              {stackItems.map((item) => {
                const Icon = langIcons[item.icon];
                return (
                  <li key={item.name} className="soft-pill px-3 py-2 text-sm text-silver">
                    <Icon size={16} className="text-steel" />
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
