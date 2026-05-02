import { Check } from "lucide-react";

import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import type { ResolvedCta } from "@/content-lib/schemas/cta.schema";
import type { HomeContent } from "@/content-lib/schemas/home.schema";
import { Link } from "@/i18n/navigation";

interface AboutTeaserProps {
  content: Omit<HomeContent["aboutTeaser"], "cta">;
  cta: ResolvedCta;
}

export function AboutTeaser({ content, cta }: AboutTeaserProps) {
  if (!content.highlights.length) return null;

  return (
    <Section variant="light" id="nosotros">
      <div className="max-w-[var(--container-prose)] mx-auto">
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          align="left"
        />
        <p className="text-base leading-relaxed text-[var(--foreground-muted)] mt-6">
          {content.lead}
        </p>
        <ul className="space-y-3 mt-8">
          {content.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3">
              <Check
                size={20}
                strokeWidth={1.75}
                className="text-[var(--brand-orange)] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-[var(--gray-900)]">{h}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button variant="outline-dark" asChild>
            {cta.external ? (
              <a href={cta.href} target="_blank" rel="noopener noreferrer">
                {cta.label} →
              </a>
            ) : (
              <Link href={cta.href as never}>{cta.label} →</Link>
            )}
          </Button>
        </div>
      </div>
    </Section>
  );
}
