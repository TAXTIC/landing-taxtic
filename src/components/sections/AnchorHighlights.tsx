interface AnchorHighlightsProps {
  label: string;
  items: string[];
  className?: string;
}

export function AnchorHighlights({
  label,
  items,
  className,
}: AnchorHighlightsProps) {
  if (!items.length) return null;

  return (
    <aside
      className={`border-l-[3px] border-[var(--brand-orange)] bg-[var(--brand-orange-soft)] p-6 lg:p-8 ${className ?? ""}`}
    >
      <span className="label-upper text-[var(--gray-700)] mb-4 block">
        {label}
      </span>
      <ul className="space-y-2 text-sm lg:text-base text-[var(--gray-900)] list-disc pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
