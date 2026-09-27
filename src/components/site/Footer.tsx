export default function Footer() {
  return (
    <footer className="relative border-t border-metal/40 py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <span className="text-sm text-steel">Ryan Zhou</span>
        <span className="text-sm text-steel/70">© {new Date().getFullYear()} · Built with Next.js</span>
      </div>
    </footer>
  );
}
