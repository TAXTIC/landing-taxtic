// landing-taxtic/src/components/brand/BrandLogo.tsx
import Image from "next/image";

import { cn } from "@/lib/utils";

type Variant = "auto" | "principal" | "secundario" | "isologo";
type Surface = "light" | "dark" | "orange" | "photo";
type Tone = "black" | "orange";
type Size = "sm" | "md" | "lg";

interface BrandLogoProps {
  variant?: Variant;
  surface?: Surface;
  tone?: Tone;
  size?: Size;
  priority?: boolean;
  className?: string;
  alt?: string;
}

const sizePx: Record<Size, number> = { sm: 24, md: 40, lg: 56 };

const variantWidthRatio: Record<Exclude<Variant, "auto">, number> = {
  // Aproximaciones del aspect ratio (width/height) por SVG.
  // Permiten que el width de Image se calcule a partir del height (size).
  principal: 3.5,
  secundario: 1.6,
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
  variant: Exclude<Variant, "auto">,
  suffix: "negro" | "naranjo" | "blanco",
): string {
  const prefix = variant === "isologo" ? "isologo" : `imagotipo-${variant}`;
  return `/brand/${prefix}-${suffix}.svg`;
}

/**
 * Render del imagotipo oficial de Taxtic. Encapsula las restricciones del
 * manual de marca: blanco sobre superficies oscuras o naranjo, sin sombras,
 * sin transformaciones, área de seguridad enforced por wrapper.
 *
 * `tone` sólo aplica cuando `surface="light"`. En `surface="dark" | "orange"
 * | "photo"`, el componente fuerza la versión blanca (warning en dev si el
 * consumer pasa `tone` redundante).
 *
 * `variant="auto"` renderiza dos `<Image>`: principal en desktop (≥md),
 * secundario en mobile (<md). Trade-off aceptado por descarga doble (~24kb
 * gzip total) a cambio de mantener Server Component sin lógica cliente.
 */
export function BrandLogo({
  variant = "auto",
  surface = "light",
  tone = "black",
  size = "md",
  priority = false,
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
  const safeAreaClass = surface === "photo" ? "p-[1em]" : "p-[0.5em]";
  const wrapperClass = cn("inline-flex items-center", safeAreaClass, className);

  if (variant === "auto") {
    const desktopFile = fileFor("principal", suffix);
    const mobileFile = fileFor("secundario", suffix);
    return (
      <span className={wrapperClass}>
        <Image
          src={desktopFile}
          alt={alt}
          width={Math.round(height * variantWidthRatio.principal)}
          height={height}
          priority={priority}
          className="hidden md:block"
        />
        <Image
          src={mobileFile}
          alt={alt}
          width={Math.round(height * variantWidthRatio.secundario)}
          height={height}
          priority={priority}
          className="block md:hidden"
        />
      </span>
    );
  }

  const file = fileFor(variant, suffix);
  return (
    <span className={wrapperClass}>
      <Image
        src={file}
        alt={alt}
        width={Math.round(height * variantWidthRatio[variant])}
        height={height}
        priority={priority}
      />
    </span>
  );
}
