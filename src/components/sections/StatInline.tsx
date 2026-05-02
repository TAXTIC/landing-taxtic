"use client";

import { useStatCounter } from "@/hooks/use-stat-counter";

interface StatInlineProps {
  /** Número que se anima desde 0 (ej. 10 para "10+", 200 para "200+", 98 para "98%") */
  numericValue: number;
  /** Sufijo que se concatena al final del valor (ej. "+", "%") */
  suffix?: string;
  /** Label en label-upper (ej. "años en Curicó") */
  label: string;
}

export function StatInline({
  numericValue,
  suffix = "",
  label,
}: StatInlineProps) {
  const { ref, value } = useStatCounter<HTMLDivElement>(numericValue);

  return (
    <div ref={ref}>
      <div className="text-3xl font-bold text-(--gray-900) leading-none">
        {value}
        {suffix}
      </div>
      <div className="label-upper text-(--foreground-muted) mt-1">{label}</div>
    </div>
  );
}
