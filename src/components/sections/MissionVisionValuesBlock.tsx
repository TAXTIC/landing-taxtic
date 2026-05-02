import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Eye, Target } from "lucide-react";

import type { AboutContent } from "@/content-lib/schemas/about.schema";

interface MissionVisionValuesBlockProps {
  content: AboutContent;
}

function resolveIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Square;
}

export function MissionVisionValuesBlock({
  content,
}: MissionVisionValuesBlockProps) {
  return (
    <div className="mt-12">
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <article className="bg-[var(--background)] border-l-[3px] border-[var(--brand-orange)] p-8">
          <Target
            size={32}
            strokeWidth={1.75}
            className="text-[var(--brand-orange)] mb-4"
            aria-hidden="true"
          />
          <h3 className="label-upper text-[var(--gray-700)] mb-3">
            {content.mission.label}
          </h3>
          <p className="text-base leading-relaxed text-[var(--gray-900)]">
            {content.mission.text}
          </p>
        </article>
        <article className="bg-[var(--background)] border-l-[3px] border-[var(--brand-orange)] p-8">
          <Eye
            size={32}
            strokeWidth={1.75}
            className="text-[var(--brand-orange)] mb-4"
            aria-hidden="true"
          />
          <h3 className="label-upper text-[var(--gray-700)] mb-3">
            {content.vision.label}
          </h3>
          <p className="text-base leading-relaxed text-[var(--gray-900)]">
            {content.vision.text}
          </p>
        </article>
      </div>

      <div>
        <p className="label-upper text-[var(--gray-700)] mb-6 text-center">
          {content.valuesLabel}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {content.values.map((value) => {
            const Icon = resolveIcon(value.iconName);
            return (
              <article
                key={value.title}
                className="bg-[var(--background)] p-6 text-center"
              >
                <Icon
                  size={28}
                  strokeWidth={1.75}
                  className="text-[var(--brand-orange)] mx-auto mb-3"
                  aria-hidden="true"
                />
                <h4 className="text-sm font-bold text-[var(--gray-900)] mb-2">
                  {value.title}
                </h4>
                <p className="text-xs leading-relaxed text-[var(--gray-700)]">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
