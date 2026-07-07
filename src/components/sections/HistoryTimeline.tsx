import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import type { AboutContent } from "@/content-lib/schemas/about.schema";

interface HistoryTimelineProps {
  eyebrow: string;
  history: AboutContent["history"];
}

/**
 * Línea de tiempo institucional: lede en display, filas año / título /
 * párrafos separadas por hairlines y párrafo de cierre en display.
 *
 * El heading accesible es un h2 sr-only — el diseño solo muestra el eyebrow,
 * y sin h2 la sección saltaría de los h2 vecinos a los h3 de los hitos. El
 * eyebrow visual queda aria-hidden para no anunciar el texto dos veces.
 */
export function HistoryTimeline({ eyebrow, history }: HistoryTimelineProps) {
  return (
    <Section variant="light">
      <h2 className="sr-only">{eyebrow}</h2>

      <Reveal mode="scroll">
        <span
          aria-hidden="true"
          className="label-upper inline-flex items-center gap-2.5 text-(--foreground-muted)"
        >
          <span
            className="inline-block size-2 bg-(--brand-orange)"
            aria-hidden="true"
          />
          {eyebrow}
        </span>
        <p className="mt-6 max-w-[640px] font-display text-2xl leading-tight font-normal text-(--foreground) lg:text-3xl">
          {history.lede}
        </p>
      </Reveal>

      <div className="mt-16">
        {history.milestones.map((milestone) => (
          <Reveal mode="scroll" key={milestone.year}>
            <div className="grid gap-4 border-t border-(--border) py-10 lg:grid-cols-[240px_1fr] lg:gap-12">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[13px] tracking-wider text-(--brand-orange)">
                  {milestone.year}
                </span>
                <h3 className="font-display text-[22px] leading-[1.1] font-normal uppercase text-(--foreground)">
                  {milestone.title}
                </h3>
              </div>
              <div className="flex max-w-[680px] flex-col gap-5">
                {milestone.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed font-light text-(--foreground-muted)"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal mode="scroll">
          <div className="border-t border-(--border) pt-10">
            <p className="max-w-[820px] font-display text-lg leading-snug font-normal text-(--foreground) lg:text-2xl">
              {history.closing}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
