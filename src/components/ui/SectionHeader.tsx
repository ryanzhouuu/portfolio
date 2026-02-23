interface SectionHeaderProps {
  index: string;
  title: string;
}

export default function SectionHeader({ index, title }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline gap-4 mb-12">
      <span className="font-mono text-xs text-muted">{index}</span>
      <h2 className="font-mono text-sm tracking-widest uppercase text-ink/40">{title}</h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
