import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface IconCardItem {
  title: string;
  description: string;
  iconName: string;
}

interface IconCardGridProps {
  items: IconCardItem[];
}

export function IconCardGrid({ items }: IconCardGridProps) {
  if (!items.length) return null;

  const icons = LucideIcons as unknown as Record<string, LucideIcon>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 mt-10">
      {items.map((item) => {
        const Icon: LucideIcon = icons[item.iconName] ?? LucideIcons.Square;
        return (
          <div
            key={item.title}
            className="border-l-[3px] border-[var(--brand-orange)] bg-[var(--background)] p-6 lg:p-8"
          >
            <Icon
              size={24}
              strokeWidth={1.75}
              className="text-[var(--brand-orange)] mb-4"
              aria-hidden="true"
            />
            <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2">
              {item.title}
            </h3>
            <p className="text-base leading-relaxed text-[var(--gray-700)]">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
