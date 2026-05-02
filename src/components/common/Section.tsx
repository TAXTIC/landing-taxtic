import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionVariant = "light" | "dark" | "muted" | "orange-soft";

interface SectionProps {
  variant?: SectionVariant;
  bleed?: boolean;
  as?: "section" | "div";
  id?: string;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<SectionVariant, string> = {
  light: "bg-(--background) text-(--foreground)",
  dark: "bg-(--surface-inverse) text-(--brand-white)",
  muted: "bg-(--surface-muted) text-(--foreground)",
  "orange-soft": "bg-(--brand-orange-soft) text-(--foreground)",
};

/**
 * Wrapper de sección con padding vertical estándar y variant de superficie.
 *
 * Por default (`bleed=false`) wrappea el contenido en un container con
 * `max-width: var(--container-max)` y padding lateral consumiendo
 * `--space-section-x-*`. Para secciones que deben llegar de borde a borde
 * (heroes con imagen full-bleed, CTAs con fondo extendido), pasar `bleed`
 * y agregar el container interno donde corresponda.
 *
 * El prop `as` está restringido a `"section"` (default) o `"div"`
 * deliberadamente — abrir la unión cuando aparezca un caso de uso real
 * para `<article>` / `<aside>`.
 */
export function Section({
  variant = "light",
  bleed = false,
  as: Tag = "section",
  id,
  className,
  children,
}: SectionProps) {
  const innerContainer = bleed ? (
    children
  ) : (
    <div className="mx-auto max-w-(--container-max) px-(--space-section-x-mobile) lg:px-(--space-section-x-desktop)">
      {children}
    </div>
  );

  return (
    <Tag
      id={id}
      className={cn(
        "py-(--space-section-y-mobile) lg:py-(--space-section-y-desktop)",
        variantClasses[variant],
        className,
      )}
    >
      {innerContainer}
    </Tag>
  );
}
