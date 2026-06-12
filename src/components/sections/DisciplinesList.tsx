import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";

export interface Discipline {
  areaLabel: string;
  title: string;
  body: string;
}

interface DisciplinesListProps {
  eyebrow: string;
  title: string;
  accentWord: string;
  items: Discipline[];
}

export function DisciplinesList({
  eyebrow,
  title,
  accentWord,
  items,
}: DisciplinesListProps) {
  return (
    <Section variant="muted">
      <Reveal mode="scroll">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          accentWord={accentWord}
          display
          eyebrowAccent
          className="mb-12 lg:mb-14"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="flex flex-col gap-3 border border-(--glass-border) bg-(--glass-bg) p-8 transition-transform duration-300 hover:-translate-y-1"
              style={{ backdropFilter: "blur(var(--glass-blur))" }}
            >
              <span className="font-mono text-xs tracking-wide text-(--brand-orange)">
                {item.areaLabel}
              </span>
              <h3 className="font-display text-xl font-normal uppercase leading-tight tracking-tight text-(--foreground)">
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-(--foreground-muted)">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
