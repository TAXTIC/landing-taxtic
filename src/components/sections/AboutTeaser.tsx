import { BrandLogo } from "@/components/brand/BrandLogo";
import { Section } from "@/components/common/Section";
import type { ResolvedCta } from "@/content-lib/schemas/cta.schema";
import type { HomeContent } from "@/content-lib/schemas/home.schema";
import { Link } from "@/i18n/navigation";

interface AboutTeaserProps {
  content: Omit<HomeContent["aboutTeaser"], "cta">;
  cta: ResolvedCta;
}

function renderQuote(quote: string, accentWord: string) {
  const idx = quote.indexOf(accentWord);
  if (idx === -1) return quote;
  return (
    <>
      {quote.slice(0, idx)}
      <span className="text-(--brand-orange)">{accentWord}</span>
      {quote.slice(idx + accentWord.length)}
    </>
  );
}

export function AboutTeaser({ content, cta }: AboutTeaserProps) {
  return (
    <Section variant="light" id="nosotros">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <span className="label-upper inline-flex items-center gap-2.5 text-(--brand-orange)">
            <span
              className="inline-block size-2 bg-(--brand-orange)"
              aria-hidden="true"
            />
            {content.eyebrow}
          </span>
          <h2 className="mt-4 font-display uppercase text-4xl leading-tight tracking-tight text-(--foreground)">
            {renderQuote(content.quote, content.accentWord)}
          </h2>
          <p className="mt-6 text-lg leading-normal text-(--foreground-muted)">
            {content.body}
          </p>
          <Link
            href={cta.href as never}
            className="mt-8 inline-flex items-center gap-2 border-b border-current pb-0.5 text-sm font-bold text-(--foreground) transition-colors hover:text-(--brand-orange)"
          >
            {cta.label} →
          </Link>
        </div>

        <div className="flex aspect-square items-center justify-center bg-(--brand-orange) p-12">
          <BrandLogo variant="principal" surface="orange" size="lg" />
        </div>
      </div>
    </Section>
  );
}
