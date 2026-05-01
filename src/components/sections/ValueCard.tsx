import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface ValueCardProps {
  title: string;
  description: string;
  iconName: string;
}

export function ValueCard({ title, description, iconName }: ValueCardProps) {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  const Icon: LucideIcon = icons[iconName] ?? LucideIcons.Square;

  return (
    <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-3">
      <Icon
        size={14}
        strokeWidth={1.75}
        className="text-[var(--brand-orange)]"
      />
      <h4 className="text-xs font-bold text-[var(--gray-900)]">{title}</h4>
      <p className="text-xs leading-snug text-[var(--gray-600)]">
        {description}
      </p>
    </div>
  );
}
