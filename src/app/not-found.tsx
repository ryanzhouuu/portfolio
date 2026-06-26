import Link from 'next/link';
import Atmosphere from '@/components/site/Atmosphere';
import DustMotes from '@/components/site/DustMotes';

export default function NotFound() {
  return (
    <>
      <Atmosphere />
      <DustMotes />
      <main className="relative flex min-h-screen items-center overflow-hidden px-5 sm:px-8 lg:px-12">
        <div aria-hidden className="light-cone absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 opacity-55" />
        <div aria-hidden className="floor-reflection absolute bottom-[-8rem] left-1/2 h-56 w-[72%] opacity-35 [--floor-shift:-50%]" />

        <section className="relative mx-auto max-w-2xl text-center">
          <p className="label mb-6">404 — Signal Lost</p>
          <h1 className="font-display text-[clamp(3rem,12vw,7rem)] text-chrome-plate">
            No surface.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-steel">
            This route doesn&apos;t exist. Head back to the showroom.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex border border-silver/30 bg-spotlight/[0.06] px-6 py-3 font-mono text-[11px] uppercase tracking-widest2 text-chrome shadow-[0_0_50px_-20px_rgba(234,242,255,0.7)] transition-all duration-500 ease-cinematic hover:border-silver/60 hover:bg-spotlight/[0.1]"
          >
            Return home
          </Link>
        </section>
      </main>
    </>
  );
}
