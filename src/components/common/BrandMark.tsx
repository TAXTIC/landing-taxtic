// landing-taxtic/src/components/common/BrandMark.tsx
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";
type Tone = "orange" | "black" | "white";

interface BrandMarkProps {
  size?: Size;
  tone?: Tone;
  className?: string;
  children?: ReactNode;
}

const sizeClasses: Record<Size, string> = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-16 w-16",
};

const toneClasses: Record<Tone, string> = {
  orange: "bg-[var(--brand-orange)] text-[var(--brand-white)]",
  black: "bg-[var(--brand-black)] text-[var(--brand-white)]",
  white:
    "bg-[var(--brand-white)] text-[var(--foreground)] border border-[var(--border)]",
};

/**
 * Cuadrado decorativo eco del isotipo del manual de marca.
 *
 * Sin border-radius, sin box-shadow, sin transform, sin opacity ≠ 1.
 * Las restricciones del manual sobre el logo se extienden al BrandMark
 * porque es su eco visual.
 */
export function BrandMark({
  size = "md",
  tone = "orange",
  className,
  children,
}: BrandMarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center aspect-square rounded-none",
        sizeClasses[size],
        toneClasses[tone],
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
