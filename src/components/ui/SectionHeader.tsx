interface SectionHeaderProps {
  index: string;
  title: string;
}

export default function SectionHeader({ index, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 min-w-0">
      <span className="font-mono text-xs text-muted flex-shrink-0">{index}</span>
      <h2 className="font-mono text-xs sm:text-sm tracking-widest uppercase text-ink/40 flex-shrink-0">{title}</h2>
      <div className="flex-1 h-px bg-border min-w-0" />
    </div>
  );
}
