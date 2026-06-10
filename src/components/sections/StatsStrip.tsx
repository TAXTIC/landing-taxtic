"use client";

import type { HomeContent } from "@/content-lib/schemas/home.schema";
import { useStatCounter } from "@/hooks/use-stat-counter";

interface StatsStripProps {
  stats: HomeContent["stats"];
}

function parseStatValue(raw: string): { numericValue: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { numericValue: 0, suffix: raw };
  return { numericValue: Number(match[1]), suffix: match[2] ?? "" };
}

function CountStat({ value, label }: { value: string; label: string }) {
  const { numericValue, suffix } = parseStatValue(value);
  const { ref, value: animated } = useStatCounter<HTMLDivElement>(numericValue);

  return (
    <div ref={ref} className="px-6 py-12 sm:px-10">
      <div className="font-display text-display-l leading-none text-(--brand-white)">
        {animated}
        <span className="text-(--brand-orange)">{suffix}</span>
      </div>
      <div className="label-upper text-(--gray-300) mt-3">{label}</div>
    </div>
  );
}

function AccentStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-6 py-12 sm:px-10">
      <div className="font-display text-display-l leading-none text-(--brand-white)">
        {value}
      </div>
      <div className="label-upper text-(--gray-300) mt-3">{label}</div>
    </div>
  );
}

export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <section className="bg-(--surface-inverse)">
      <div className="mx-auto grid max-w-(--container-max) grid-cols-1 divide-y divide-(--hairline-on-dark) px-(--space-section-x-mobile) sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-(--space-section-x-desktop)">
        {stats.map((stat) =>
          stat.variant === "accent" ? (
            <AccentStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ) : (
            <CountStat key={stat.label} value={stat.value} label={stat.label} />
          ),
        )}
      </div>
    </section>
  );
}
