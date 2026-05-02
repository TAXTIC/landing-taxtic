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
    <div className="mt-10">
      <p className="max-w-(--container-prose) text-lg leading-relaxed text-(--gray-700) mb-10">
        {lead}
      </p>
      <ol className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-10">
        {principles.map((principle, idx) => (
          <li
            key={principle.label}
            className="flex gap-4 border-l-[3px] border-(--brand-orange) bg-(--background) p-6 lg:p-8"
          >
            <span
              aria-hidden="true"
              className="flex-shrink-0 w-10 h-10 bg-(--brand-orange) text-(--brand-white) flex items-center justify-center text-base font-bold"
            >
              {idx + 1}
            </span>
            <div>
              <h3 className="text-base font-bold text-(--gray-900) mb-2">
                {principle.label}
              </h3>
              <p className="text-base leading-relaxed text-(--gray-700)">
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
