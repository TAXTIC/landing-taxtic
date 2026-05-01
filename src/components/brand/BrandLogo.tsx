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
  /**
   * Sólo aplica con `variant="auto"`. Permite usar un `size` distinto en
   * mobile (<md) cuando el variant secundario tiene el descriptor más
   * comprimido y necesita más altura para que sea legible. Si no se pasa,
   * mobile usa el mismo `size` que desktop.
   */
  sizeMobile?: Size;
  preload?: boolean;
  className?: string;
  alt?: string;
}

const sizePx: Record<Size, number> = { sm: 24, md: 40, lg: 56 };

// Aspect ratios derivados de los viewBox reales de cada SVG en public/brand/.
// Garantizan que el width que pasamos a <Image> coincide con la geometría
// real del asset (sin letterbox/pillarbox interno y sin layout shift en
// inline-flex containers).
const variantWidthRatio: Record<Exclude<Variant, "auto">, number> = {
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
  variant: Exclude<Variant, "auto">,
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
 *
 * `variant="auto"` renderiza dos `<Image>`: principal en desktop (≥md),
 * secundario en mobile (<md). Para evitar doble preload cuando se usa
 * `preload={true}` (LCP placements above-the-fold), sólo la versión desktop
 * emite el preload hint — la mobile lazy-loadea normalmente.
 */
export function BrandLogo({
  variant = "auto",
  surface = "light",
  tone = "black",
  size = "md",
  sizeMobile,
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
  const desktopHeight = sizePx[size];
  const mobileHeight = sizePx[sizeMobile ?? size];
  const wrapperClass = cn("inline-flex items-center", className);

  if (variant === "auto") {
    const desktopFile = fileFor("principal", suffix);
    const mobileFile = fileFor("secundario", suffix);
    const desktopSafeArea =
      surface === "photo" ? desktopHeight : Math.round(desktopHeight * 0.5);
    const mobileSafeArea =
      surface === "photo" ? mobileHeight : Math.round(mobileHeight * 0.5);
    return (
      <span className={wrapperClass}>
        <span
          className="hidden md:inline-flex items-center"
          style={{ padding: desktopSafeArea }}
        >
          <Image
            src={desktopFile}
            alt={alt}
            width={Math.round(desktopHeight * variantWidthRatio.principal)}
            height={desktopHeight}
            preload={preload}
          />
        </span>
        <span
          className="inline-flex md:hidden items-center"
          style={{ padding: mobileSafeArea }}
        >
          <Image
            src={mobileFile}
            alt={alt}
            width={Math.round(mobileHeight * variantWidthRatio.secundario)}
            height={mobileHeight}
            preload={false}
          />
        </span>
      </span>
    );
  }

  const file = fileFor(variant, suffix);
  const safeAreaPx =
    surface === "photo" ? desktopHeight : Math.round(desktopHeight * 0.5);
  return (
    <span className={wrapperClass} style={{ padding: safeAreaPx }}>
      <Image
        src={file}
        alt={alt}
        width={Math.round(desktopHeight * variantWidthRatio[variant])}
        height={desktopHeight}
        preload={preload}
      />
    </span>
  );
}
