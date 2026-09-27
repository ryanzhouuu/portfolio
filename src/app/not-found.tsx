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
          <p className="mb-6 text-sm text-steel">404 — Signal Lost</p>
          <h1 className="font-display text-[clamp(2.5rem,5.5vw,4rem)] text-chrome">
            No surface.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-steel">
            This route doesn&apos;t exist. Head back to the showroom.
          </p>
          <Link href="/" className="soft-pill mt-10 px-5 py-2.5 text-sm text-chrome">
            Return home
          </Link>
        </section>
      </main>
    </>
  );
}
