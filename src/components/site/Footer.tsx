export default function Footer() {
  return (
    <footer className="relative py-10">
      <div aria-hidden className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="edge-light mb-10" />
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <span className="label-mono">Ryan Zhou</span>
        <span className="label-mono text-steel/70">© {new Date().getFullYear()} · Built with Next.js</span>
      </div>
    </footer>
  );
}
