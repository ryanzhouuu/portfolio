import Image from 'next/image';
import { education, interests, personalInfo } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';
import Reveal from './Reveal';
import SectionFrame from './SectionFrame';

// A drop of the hero splash, in objectBoundingBox units so it scales with the
// portrait. Shared by the clip and the chrome rim drawn over it.
const BLOB =
  'M0.53,0.02 C0.76,0.01 0.95,0.13 0.97,0.34 C0.99,0.52 0.9,0.61 0.93,0.77 C0.96,0.94 0.79,0.99 0.59,0.98 C0.37,0.97 0.13,0.98 0.05,0.81 C0.01,0.66 0.09,0.56 0.05,0.41 C0.02,0.23 0.15,0.04 0.53,0.02 Z';

function BlobPortrait() {
  return (
    <div className="group relative aspect-[3/4] w-full max-w-[15rem]">
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <clipPath id="portrait-blob" clipPathUnits="objectBoundingBox">
            <path d={BLOB} />
          </clipPath>
        </defs>
      </svg>

      <div className="absolute inset-0" style={{ clipPath: 'url(#portrait-blob)' }}>
        <Image
          src={withBasePath(personalInfo.photo)}
          alt="Ryan Zhou"
          fill
          sizes="240px"
          className="object-cover grayscale transition-[filter] duration-700 ease-cinematic group-hover:grayscale-0"
        />
      </div>

      {/* Chrome rim catching the light along the edge of the drop. */}
      <svg aria-hidden viewBox="0 0 1 1" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="portrait-rim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f6f8fb" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#747d8c" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#69707d" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#cdd4dd" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path d={BLOB} fill="none" stroke="url(#portrait-rim)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

/**
 * Closing section: blob portrait beside interests and links, then education
 * as two compact ledger rows.
 */
export default function About() {
  return (
    <SectionFrame id="about" title="About" spacing="py-24 lg:py-32">
      <Reveal className="grid items-center gap-10 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-14">
        <BlobPortrait />
        <div>
          <h3 className="label-mono mb-4">Interests</h3>
          <ul className="space-y-4">
            {interests.map(({ title, description }) => (
              <li key={title} className="flex gap-3.5">
                <span aria-hidden className="interest-dot mt-[0.55em] shrink-0" />
                <div>
                  <p className="text-base font-medium text-chrome sm:text-[17px]">{title}</p>
                  <p className="mt-0.5 text-[15px] leading-relaxed text-steel">{description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
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
    </SectionFrame>
  );
}
