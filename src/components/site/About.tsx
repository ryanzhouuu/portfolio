import Image from 'next/image';
import { education, personalInfo, stack } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';
import { CIcon, CodexIcon, CursorIcon, FastApiIcon, OpenCodeIcon, PostgreSqlIcon, PythonIcon, ReactIcon, TypeScriptIcon } from './LangIcon';
import Reveal from './Reveal';
import SectionFrame from './SectionFrame';

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
 * Closing section: portrait and bio, then education as two compact ledger
 * rows, then the stack as soft pills.
 */
export default function About() {
  return (
    <SectionFrame id="about" index="03" title="About" spacing="py-24 lg:py-32">
      <Reveal className="grid gap-8 md:grid-cols-[13.75rem_minmax(0,1fr)] md:gap-10">
        <div className="relative w-full max-w-[13.75rem] overflow-hidden rounded-[20px] border border-silver/15">
          <div className="relative aspect-[3/4]">
            <Image
              src={withBasePath(personalInfo.photo)}
              alt="Ryan Zhou"
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:pt-1">
          <p className="max-w-lg text-base leading-relaxed text-silver sm:text-[17px]">{personalInfo.bio}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={`mailto:${personalInfo.email}`} className="label-mono normal-case tracking-[0.04em] text-steel transition-colors duration-300 hover:text-chrome">
              {personalInfo.email}
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="label-mono text-steel transition-colors duration-300 hover:text-chrome">
              GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="label-mono text-steel transition-colors duration-300 hover:text-chrome">
              LinkedIn
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-16" delay={0.06}>
        <h3 className="label-mono mb-4">Education</h3>
        <ul>
          {education.map((school) => (
            <li
              key={school.school}
              className="ledger-row grid gap-x-8 gap-y-1 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline"
            >
              <div className="min-w-0">
                <p className="font-display text-[1.125rem] tracking-[-0.02em] text-chrome">{school.school}</p>
                <p className="mt-1 text-sm text-steel">{school.degree}</p>
              </div>
              <p className="label-mono sm:text-right">
                {school.period} · {school.gpa}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-16" delay={0.12}>
        <h3 className="label-mono mb-4">Stack</h3>
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
    </SectionFrame>
  );
}
