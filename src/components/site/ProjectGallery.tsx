import { ArrowUpRight } from "lucide-react";
import { projects as allProjects, type Project } from "@/lib/data";
import CinematicHeading from "./CinematicHeading";
import Reveal from "./Reveal";

type ProjectGalleryProps = {
  projects?: Project[];
};

const pad = (index: number) => String(index + 1).padStart(2, "0");

export default function ProjectGallery({ projects = allProjects }: ProjectGalleryProps) {
  return (
    <section id="work" className="relative scroll-mt-20 overflow-hidden py-28 lg:py-36">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_30%,rgba(234,242,255,0.05),transparent_68%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="label mb-5">
            <span className="text-silver">02</span> — Selected Work
          </p>
          <CinematicHeading className="font-display max-w-2xl text-[clamp(2rem,5vw,3.5rem)] text-chrome-plate">
            Projects
          </CinematicHeading>
          <p className="mt-5 max-w-md text-base leading-relaxed text-steel">
            A selection of things I&apos;ve built across product, systems, and machine learning.
          </p>
        </Reveal>

        <div className="project-index mt-16 border-t border-metal/70" aria-label="Selected projects">
          <div className="project-index__header">
            <span className="project-index__number">No.</span>
            <span className="project-index__identity">Project</span>
            <span className="project-index__details">Details</span>
            <span className="project-index__meta">Links</span>
          </div>

          <ul className="m-0 list-none p-0" aria-label="Selected projects">
            {projects.map((project, index) => (
              <li key={project.slug}>
                <article className="project-index__row">
                  <span className="project-index__number font-mono text-[11px] tracking-widest text-steel">
                    {pad(index)}
                  </span>

                  <div className="project-index__identity">
                    <h3 className="project-index__title font-display-thin text-xl leading-tight text-chrome sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="project-index__summary mt-3 text-base leading-relaxed text-silver">
                      {project.summary}
                    </p>
                  </div>

                  <div className="project-index__details">
                    <p className="project-index__details-label label">Details</p>
                    <p className="project-index__details-copy text-sm leading-relaxed text-silver">
                      {project.details}
                    </p>
                  </div>

                  {(project.githubUrl || project.liveUrl) && (
                    <div className="project-index__meta">
                      <div className="project-index__actions">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-index__action text-steel transition-colors duration-300 hover:text-chrome"
                          >
                            <span className="link-underline">GitHub</span>
                            <ArrowUpRight aria-hidden size={13} strokeWidth={1.5} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-index__action text-steel transition-colors duration-300 hover:text-chrome"
                          >
                            <span className="link-underline">Live site</span>
                            <ArrowUpRight aria-hidden size={13} strokeWidth={1.5} />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
