import { Check } from "lucide-react";

interface EntregablesCardProps {
  title: string;
  items: string[];
}

export function EntregablesCard({ title, items }: EntregablesCardProps) {
  if (!items.length) return null;

  return (
    <aside className="bg-(--background) border-l-[3px] border-(--brand-orange) p-6 lg:p-8 lg:sticky lg:top-24">
      <h2 className="text-lg font-bold text-(--gray-900) mb-4">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-(--gray-700)"
          >
            <Check
              size={18}
              strokeWidth={1.75}
              className="text-(--brand-orange) shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
