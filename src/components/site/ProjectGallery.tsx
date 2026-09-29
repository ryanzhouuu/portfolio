import { ArrowUpRight } from "lucide-react";
import { projects as allProjects, type Project } from "@/lib/data";
import CinematicHeading from "./CinematicHeading";
import Reveal from "./Reveal";

type ProjectGalleryProps = {
  projects?: Project[];
};

/**
 * Selected work as open entries with a light along the left edge: title, short summary, and links.
 * The longer `details` field stays in data and is not shown.
 */
export default function ProjectGallery({ projects = allProjects }: ProjectGalleryProps) {
  return (
    <section id="work" className="relative scroll-mt-20 overflow-hidden py-20 lg:py-24">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_30%,rgba(234,242,255,0.05),transparent_68%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <CinematicHeading className="font-display text-[1.75rem] text-chrome">
            Projects
          </CinematicHeading>
          <p className="mt-4 max-w-md text-base leading-relaxed text-steel">
            A selection of things I&apos;ve built across product, systems, and machine learning.
          </p>
        </Reveal>

        <div className="soft-stack mt-8" aria-label="Selected projects">
          {projects.map((project, index) => (
            <Reveal as="div" key={project.slug} delay={0.05 * index}>
              <article className="rim-row">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="font-display text-[1.125rem] text-chrome">{project.title}</h3>
                  {(project.githubUrl || project.liveUrl) && (
                    <div className="flex flex-wrap gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-steel transition-colors duration-300 hover:text-chrome"
                        >
                          <span className="link-underline">GitHub</span>
                          <ArrowUpRight aria-hidden size={14} strokeWidth={1.5} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-steel transition-colors duration-300 hover:text-chrome"
                        >
                          <span className="link-underline">Live site</span>
                          <ArrowUpRight aria-hidden size={14} strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-silver">{project.summary}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
