import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import Atmosphere from '@/components/site/Atmosphere';
import CursorLight from '@/components/site/CursorLight';
import DustMotes from '@/components/site/DustMotes';
import ProjectDetail from '@/components/site/ProjectDetail';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project — Ryan Zhou' };
  return {
    title: `${project.title} — Ryan Zhou`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Ryan Zhou`,
      description: project.shortDescription,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Atmosphere />
      <CursorLight />
      <DustMotes />
      <ProjectDetail project={project} next={next} />
    </>
  );
}
