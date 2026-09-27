import Image from 'next/image';
import { experience } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';
import CinematicHeading from './CinematicHeading';
import Reveal from './Reveal';

/**
 * Work history as always-open rounded rows. Bullets stay visible; nothing expands.
 */
export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-20 overflow-hidden py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.1] mix-blend-screen"
        style={{ backgroundImage: `url(${withBasePath('/images/backgrounds/chrome-negative-center.png')})` }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void via-void/75 to-void" />
      <div aria-hidden className="projection-streak absolute left-[-28%] top-[18%] h-32 w-[120%] rotate-3 opacity-35" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <CinematicHeading className="font-display text-[1.75rem] text-chrome">
            Experience
          </CinematicHeading>
        </Reveal>

        <div className="soft-stack mt-8">
          {experience.map((role, i) => (
            <Reveal as="div" key={role.company} delay={0.05 * i}>
              <article className="soft-row">
                <div className="flex items-start gap-4">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[12px] border border-silver/15 bg-void/70">
                    <Image
                      src={withBasePath(role.logo)}
                      alt={`${role.company} logo`}
                      fill
                      sizes="40px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-display text-[1.125rem] text-chrome">{role.company}</h3>
                      <span className="text-sm text-steel">{role.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-silver">
                      {role.role}
                      <span className="text-steel"> · {role.location}</span>
                    </p>
                    <ul className="mt-4 space-y-2">
                      {role.bullets.map((bullet) => (
                        <li key={bullet} className="text-sm leading-relaxed text-silver">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
