import Image from "next/image";

import { cn } from "@/lib/utils";

type Variant = "principal" | "secundario" | "isologo";
type Surface = "light" | "dark" | "orange" | "photo";
type Tone = "black" | "orange";
type Size = "sm" | "md" | "lg" | "xl";

interface BrandLogoProps {
  variant?: Variant;
  surface?: Surface;
  tone?: Tone;
  size?: Size;
  /**
   * Controls the padding wrapper that enforces the brand-manual clear-space rule.
   * - `"manual"` (default): 0.5X on standard surfaces, 1.0X on photos — full manual compliance.
   * - `"compact"`: removes the padding entirely, for contexts like the glass navbar where the
   *   surrounding chrome already provides visual breathing room and the compact isologo is
   *   deliberately flush. Intentional, documented deviation from the manual's clear-space.
   */
  clearSpace?: "manual" | "compact";
  preload?: boolean;
  className?: string;
  alt?: string;
}

const sizePx: Record<Size, number> = { sm: 24, md: 40, lg: 56, xl: 112 };

// Aspect ratios derivados de los viewBox reales de cada SVG en public/brand/.
// Garantizan que el width que pasamos a <Image> coincide con la geometría
// real del asset (sin letterbox/pillarbox interno y sin layout shift en
// inline-flex containers).
const variantWidthRatio: Record<Variant, number> = {
  principal: 4306 / 1200,
  secundario: 1880 / 1200,
  isologo: 1,
};

function resolveSuffix(
  surface: Surface,
  tone: Tone,
): "negro" | "naranjo" | "blanco" {
  if (surface === "light") {
    return tone === "orange" ? "naranjo" : "negro";
  }
  return "blanco";
}

function fileFor(
  variant: Variant,
  suffix: "negro" | "naranjo" | "blanco",
): string {
  const prefix = variant === "isologo" ? "isologo" : `imagotipo-${variant}`;
  return `/brand/${prefix}-${suffix}.svg`;
}

/**
 * Render del imagotipo oficial de Taxtic. Encapsula las restricciones del
 * manual de marca: blanco sobre superficies oscuras o naranjo, sin sombras,
 * sin transformaciones, área de seguridad enforced por wrapper como `0.5X`
 * (o `1.0X` sobre fotos), donde X = altura del isotipo derivada del prop `size`.
 *
 * `tone` sólo aplica cuando `surface="light"`. En `surface="dark" | "orange"
 * | "photo"`, el componente fuerza la versión blanca (warning en dev si el
 * consumer pasa `tone` redundante).
 */
export function BrandLogo({
  variant = "principal",
  surface = "light",
  tone = "black",
  size = "md",
  clearSpace = "manual",
  preload = false,
  className,
  alt = "Taxtic — Asesoría Tributaria Integral",
}: BrandLogoProps) {
  const enforcedTone: Tone = surface === "light" ? tone : "black";
  if (
    process.env.NODE_ENV === "development" &&
    surface !== "light" &&
    tone !== "black"
  ) {
    console.warn(
      `[BrandLogo] tone="${tone}" se ignora cuando surface="${surface}"; el manual exige versión blanca.`,
    );
  }

  const suffix = resolveSuffix(surface, enforcedTone);
  const height = sizePx[size];
  const safeAreaPx =
    clearSpace === "compact"
      ? 0
      : surface === "photo"
        ? height
        : Math.round(height * 0.5);
  const file = fileFor(variant, suffix);
  return (
    <span
      className={cn("inline-flex items-center", className)}
      style={{ padding: safeAreaPx }}
    >
      <Image
        src={file}
        alt={alt}
        width={Math.round(height * variantWidthRatio[variant])}
        height={height}
        preload={preload}
      />
    </span>
  );
}
