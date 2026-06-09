import { cn } from "@/lib/utils";

type Tone = "light" | "dark";
type Heading = "h1" | "h2" | "h3";
type Layout = "stacked" | "split";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: Heading;
  tone?: Tone;
  /**
   * Antepone un cuadrado naranjo al eyebrow. Default `false`; cada consumer
   * lo activa donde quiere el acento.
   */
  eyebrowAccent?: boolean;
  /** Renderiza el título en la fuente display (Prototype), en mayúsculas y al
   * tamaño grande de los encabezados de sección. */
  display?: boolean;
  /** Palabra del título que se pinta en naranjo (la primera coincidencia). */
  accentWord?: string;
  /**
   * `"stacked"` (default) apila eyebrow → título → subtítulo en una columna.
   * `"split"` reparte en dos columnas: eyebrow a la izquierda, título +
   * subtítulo a la derecha, alineados al pie. `align` se ignora en `"split"`.
   */
  layout?: Layout;
  className?: string;
}

const titleSizeByLevel: Record<Heading, string> = {
  h1: "text-4xl lg:text-5xl",
  h2: "text-3xl lg:text-4xl",
  h3: "text-2xl",
};

// Encabezado display de sección: ~36 → 48 → 64px, casi sin interlineado.
const displayTitleSize =
  "text-4xl sm:text-5xl lg:text-display-l leading-[0.98]";

const titleColorByTone: Record<Tone, string> = {
  light: "text-(--foreground)",
  dark: "text-(--brand-white)",
};

const subtitleColorByTone: Record<Tone, string> = {
  light: "text-(--foreground-muted)",
  dark: "text-(--gray-300)",
};

const eyebrowColorByTone: Record<Tone, string> = {
  light: "text-(--foreground-muted)",
  dark: "text-(--gray-300)",
};

function renderTitle(title: string, accentWord?: string) {
  if (!accentWord) return title;
  const idx = title.indexOf(accentWord);
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-(--brand-orange)">{accentWord}</span>
      {title.slice(idx + accentWord.length)}
    </>
  );
}

/**
 * Header de sección con eyebrow (cuadrito naranjo + texto gris) + título +
 * subtítulo opcional.
 *
 * El consumer pasa `tone="dark"` explícitamente cuando este header vive
 * dentro de una sección de superficie oscura, para mantener el componente
 * simple y sin context cross-component.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Tag = "h2",
  tone = "light",
  eyebrowAccent = false,
  display = false,
  accentWord,
  layout = "stacked",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isSplit = layout === "split";

  const eyebrowEl = eyebrow ? (
    <span
      className={cn(
        "label-upper inline-flex items-center gap-2.5",
        eyebrowColorByTone[tone],
      )}
    >
      {eyebrowAccent ? (
        <span
          className="inline-block size-2 bg-(--brand-orange)"
          aria-hidden="true"
        />
      ) : null}
      {eyebrow}
    </span>
  ) : null;

  const titleEl = (
    <Tag
      className={cn(
        display
          ? cn("font-display uppercase tracking-tight", displayTitleSize)
          : cn("font-bold tracking-tight leading-tight", titleSizeByLevel[Tag]),
        titleColorByTone[tone],
      )}
    >
      {renderTitle(title, accentWord)}
    </Tag>
  );

  const subtitleEl = subtitle ? (
    <p
      className={cn(
        "text-lg leading-normal",
        subtitleColorByTone[tone],
        isCenter ? undefined : "max-w-[34rem]",
      )}
    >
      {subtitle}
    </p>
  ) : null;

  if (isSplit) {
    return (
      <div
        className={cn(
          "grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-end lg:gap-16",
          className,
        )}
      >
        <div>{eyebrowEl}</div>
        <div className="flex flex-col gap-6">
          {titleEl}
          {subtitleEl}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCenter
          ? "items-center text-center mx-auto max-w-[42rem]"
          : "items-start text-left",
        className,
      )}
    >
      {eyebrowEl}
      {titleEl}
      {subtitleEl}
    </div>
  );
}
