import Image from 'next/image';
import { experience } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';
import RimLight from './RimLight';
import Reveal from './Reveal';
import SectionFrame from './SectionFrame';

/**
 * Work history as a timeline ledger: a mono date column beside each role,
 * hairline rows, and one rim light that travels the list with the scroll.
 */
export default function Experience() {
  return (
    <SectionFrame id="experience" index="01" title="Experience">
      <div className="relative pl-6 sm:pl-8">
        <RimLight />
        <ol>
          {experience.map((role, i) => (
            <Reveal as="li" key={role.company + role.period} delay={0.06 * i} className="ledger-row">
              <article className="grid gap-x-8 gap-y-3 py-8 sm:grid-cols-[8rem_minmax(0,1fr)]">
                <p className="label-mono pt-1">
                  {role.period.split(' — ').map((part, j) => (
                    <span key={part} className="inline sm:block">
                      {j > 0 && '— '}
                      {part}
                      {j === 0 && <span className="sm:hidden"> </span>}
                    </span>
                  ))}
                </p>
                <div className="flex items-start gap-4">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={withBasePath(role.logo)}
                      alt={`${role.company} logo`}
                      fill
                      sizes="40px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[1.25rem] tracking-[-0.02em] text-chrome">{role.company}</h3>
                    <p className="mt-1 text-sm text-silver">
                      {role.role}
                      <span className="text-steel"> · {role.location}</span>
                    </p>
                    <ul className="mt-4 space-y-2">
                      {role.bullets.map((bullet) => (
                        <li key={bullet} className="text-[15px] leading-relaxed text-silver/90">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </SectionFrame>
  );
}
