import { Button } from "@/components/ui/button";

interface Principle {
  label: string;
  description: string;
}

interface HowWeWorkBlockProps {
  lead: string;
  principles: Principle[];
  ctaLabel: string;
  ctaHref: string;
}

export function HowWeWorkBlock({
  lead,
  principles,
  ctaLabel,
  ctaHref,
}: HowWeWorkBlockProps) {
  if (!principles.length) return null;

  return (
    <div className="mx-auto max-w-[var(--container-prose)] mt-10">
      <p className="text-lg leading-relaxed text-[var(--gray-700)] mb-10">
        {lead}
      </p>
      <ol className="space-y-6 mb-10">
        {principles.map((principle, idx) => (
          <li key={principle.label} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex-shrink-0 w-8 h-8 bg-[var(--brand-orange)] text-[var(--brand-white)] flex items-center justify-center text-sm font-bold"
            >
              {idx + 1}
            </span>
            <div>
              <h3 className="text-base font-bold text-[var(--gray-900)] mb-1">
                {principle.label}
              </h3>
              <p className="text-base leading-relaxed text-[var(--gray-700)]">
                {principle.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <Button variant="outline-dark" asChild>
        <a href={ctaHref}>{ctaLabel} →</a>
      </Button>
    </div>
  );
}
