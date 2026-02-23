interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  return (
    <span className="font-mono text-xs px-2 py-0.5 border border-border text-muted">
      {label}
    </span>
  );
}
