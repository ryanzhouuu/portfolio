"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects as allProjects, type Project } from "@/lib/data";
import { withBasePath } from "@/lib/basePath";
import Reveal from "./Reveal";
import RimLight from "./RimLight";
import SectionFrame from "./SectionFrame";

type ProjectGalleryProps = {
  projects?: Project[];
};

/**
 * Plays a promo after the viewer opens it. The file stays unloaded until then.
 */
function PromoVideo({ src, id }: { src: string; id: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    return () => video.pause();
  }, []);

  return (
    <video
      ref={videoRef}
      id={id}
      src={withBasePath(src)}
      controls
      playsInline
      preload="metadata"
      className="mt-5 w-full max-w-2xl rounded-[20px] border border-silver/15"
    />
  );
}

const linkClass =
  "label-mono inline-flex items-center gap-1 text-steel transition-colors duration-300 hover:text-chrome";

/**
 * Selected work as a numbered index: mono number, large title (with its live
 * link beside it), one-line summary, and GitHub aligned on the right. The longer `details` field stays in data and is not
 * shown. A promo opens under its row.
 */
export default function ProjectGallery({ projects = allProjects }: ProjectGalleryProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <SectionFrame id="work" title="Projects">
      <div className="relative pl-6 sm:pl-8">
        <RimLight />
        <ol aria-label="Selected projects">
          {projects.map((project, index) => {
            const open = openSlug === project.slug;
            const videoId = `${project.slug}-promo`;
            const hasLinks = project.githubUrl || project.videoUrl;

            return (
              <Reveal as="li" key={project.slug} delay={0.06 * index} className="ledger-row">
                <article className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 py-7 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-x-6">
                  <span className="label-mono pt-2.5 transition-colors duration-300 group-hover:text-silver">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="sheen-title font-display text-[clamp(1.5rem,2.4vw,1.875rem)] tracking-[-0.03em]">
                        {project.titleUrl ? (
                          <a
                            href={project.titleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-baseline gap-1.5"
                          >
                            <span className="title-underline">{project.title}</span>
                            <ArrowUpRight
                              aria-hidden
                              size={18}
                              strokeWidth={1.5}
                              className="self-center text-steel transition-colors duration-300 group-hover:text-chrome"
                            />
                          </a>
                        ) : (
                          <span className="title-underline">{project.title}</span>
                        )}
                      </h3>
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          <span className="link-underline">Live</span>
                          <ArrowUpRight aria-hidden size={13} strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                    <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-steel transition-colors duration-300 group-hover:text-silver">
                      {project.summary}
                    </p>
                  </div>

                  {hasLinks && (
                    <div className="col-start-2 mt-4 flex flex-wrap gap-x-5 gap-y-2 sm:col-start-3 sm:mt-0 sm:justify-end sm:pt-3">
                      {project.videoUrl && (
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={videoId}
                          onClick={() => setOpenSlug(open ? null : project.slug)}
                          className={linkClass}
                        >
                          <span className="link-underline">{open ? "Close" : "Watch"}</span>
                        </button>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          <span className="link-underline">GitHub</span>
                          <ArrowUpRight aria-hidden size={13} strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  )}

                  {open && project.videoUrl && (
                    <div className="col-span-full sm:col-start-2">
                      <PromoVideo id={videoId} src={project.videoUrl} />
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </SectionFrame>
  );
}
