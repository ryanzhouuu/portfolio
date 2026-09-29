import type { ReactNode } from 'react';
import CinematicHeading from './CinematicHeading';
import Reveal from './Reveal';

type SectionFrameProps = {
  id: string;
  index: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  /** Vertical padding; sections vary it so the page doesn't tick at one pace. */
  spacing?: string;
};

/**
 * Shared section shape: a sticky label rail (mono index, title, optional
 * intro) on the left and content on the right. Below `lg` the rail stacks
 * above the content and scrolls normally.
 */
export default function SectionFrame({
  id,
  index,
  title,
  intro,
  children,
  spacing = 'py-28 lg:py-36',
}: SectionFrameProps) {
  return (
    <section id={id} className={`relative scroll-mt-14 ${spacing}`}>
      <div aria-hidden className="absolute inset-x-0 top-0 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="edge-light" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="label-mono">{index} —</p>
              <CinematicHeading className="font-display mt-3 text-[clamp(2.25rem,4vw,3.25rem)] text-chrome">
                {title}
              </CinematicHeading>
              {intro && <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel">{intro}</p>}
            </Reveal>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
