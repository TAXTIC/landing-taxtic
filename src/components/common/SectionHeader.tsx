import { cn } from "@/lib/utils";

type Tone = "light" | "dark";
type Heading = "h1" | "h2" | "h3";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: Heading;
  tone?: Tone;
  /**
   * Cuadrado naranjo antes del eyebrow — lenguaje visual V2. Default `false`
   * para no alterar páginas aún no migradas; cada página lo prende al adoptar V2.
   */
  eyebrowAccent?: boolean;
  /** Título en fuente display (Prototype) uppercase — headlines del rediseño V2. */
  display?: boolean;
  className?: string;
}

const titleSizeByLevel: Record<Heading, string> = {
  h1: "text-4xl lg:text-5xl",
  h2: "text-3xl lg:text-4xl",
  h3: "text-2xl",
};

const titleColorByTone: Record<Tone, string> = {
  light: "text-(--foreground)",
  dark: "text-(--brand-white)",
};

const subtitleColorByTone: Record<Tone, string> = {
  light: "text-(--foreground-muted)",
  dark: "text-(--gray-300)",
};

/**
 * Header de sección con eyebrow naranjo + título + subtítulo opcional.
 *
 * El consumer pasa `tone="dark"` explícitamente cuando este header vive
 * dentro de `<Section variant="dark">`, para mantener el componente simple
 * y sin context cross-component.
 *
 * @example
 * <Section variant="dark">
 *   <SectionHeader tone="dark" eyebrow="..." title="..." />
 * </Section>
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
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCenter
          ? "items-center text-center mx-auto max-w-[42rem]"
          : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="label-upper text-(--brand-orange) inline-flex items-center gap-2.5">
          {eyebrowAccent ? (
            <span
              className="inline-block size-2 bg-(--brand-orange)"
              aria-hidden="true"
            />
          ) : null}
          {eyebrow}
        </span>
      ) : null}
      <Tag
        className={cn(
          display
            ? "font-display uppercase tracking-tight leading-tight"
            : "font-bold tracking-tight leading-tight",
          titleSizeByLevel[Tag],
          titleColorByTone[tone],
        )}
      >
        {title}
      </Tag>
      {subtitle ? (
        <p
          className={cn(
            "text-lg leading-normal",
            subtitleColorByTone[tone],
            isCenter ? undefined : "max-w-[38rem]",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
