export default function Footer() {
  return (
    <footer className="relative border-t border-metal/60 py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <span
          className="font-display text-sm text-steel"
          style={{ fontVariationSettings: "'wght' 700, 'wdth' 125" }}
        >
          RYAN&nbsp;ZHOU
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-steel/70">
          © {new Date().getFullYear()} · Built with Next.js
        </span>
      </div>
    </footer>
  );
}
