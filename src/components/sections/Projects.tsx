'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Tag from '@/components/ui/Tag';
import { projects } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';

interface Props {
  inView?: boolean;
  compact?: boolean;
}

export default function Projects({ inView: inViewProp, compact }: Props = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const internalInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const isInView = inViewProp ?? internalInView;

  return (
    <section id="projects" className={compact ? "py-4" : "py-16 sm:py-24 lg:py-32 border-t border-border"}>
      <div className={compact ? "px-4 max-w-none" : "px-5 sm:px-8 lg:px-16 max-w-4xl"} ref={ref}>
        <SectionHeader index="04" title="projects" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group border border-border hover:border-ink/30 transition-colors duration-300"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden border-b border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBasePath(project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-bg/20 group-hover:bg-transparent transition-colors duration-500" />

                {/* Link overlay — always visible on touch, hover-only on desktop */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-ink/10">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-bg border border-border text-ink hover:bg-subtle transition-colors touch-manipulation"
                      aria-label="View live"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-bg border border-border text-ink hover:bg-subtle transition-colors touch-manipulation"
                    aria-label="View on GitHub"
                  >
                    <Github size={14} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-mono text-sm font-semibold text-ink">{project.title}</h3>
                  {/* Inline links for touch/mobile — always accessible */}
                  <div className="flex items-center gap-2 flex-shrink-0 sm:hidden">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-ink transition-colors"
                        aria-label="View live"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-ink transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github size={13} />
                    </a>
                  </div>
                </div>
                <p className="font-serif text-sm text-ink/65 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
                  {project.technologies.map((tech) => (
                    <Tag key={tech} label={tech} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
