import { education } from '@/lib/data';
import CinematicHeading from './CinematicHeading';
import Reveal from './Reveal';

/**
 * Schools as the same rim-lit entries as experience and projects.
 * Coursework stays in the data file and is not rendered.
 */
export default function Education() {
  return (
    <section id="education" className="relative scroll-mt-20 overflow-hidden py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <CinematicHeading className="font-display text-[1.75rem] text-chrome">
            Education
          </CinematicHeading>
        </Reveal>

        <div className="soft-stack mt-8">
          {education.map((school, index) => (
            <Reveal as="div" key={school.school} delay={0.05 * index}>
              <article className="rim-row">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="font-display text-[1.125rem] text-chrome">{school.school}</h3>
                  <p className="text-sm text-steel">
                    {school.period}
                    <span> · {school.gpa}</span>
                  </p>
                </div>
                <p className="mt-1 text-sm text-silver">{school.degree}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
