import type { ContactContent } from "@/content-lib/schemas/contact.schema";
import type { Branch, SiteContent } from "@/content-lib/schemas/site.schema";

interface ContactDataColumnProps {
  content: ContactContent["dataColumn"];
  branches: Branch[];
  email: SiteContent["channels"]["email"];
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-(--border) py-4">
      <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-(--foreground-subtle)">
        {label}
      </div>
      <div className="text-base leading-relaxed text-(--foreground)">
        {children}
      </div>
    </div>
  );
}

export function ContactDataColumn({
  content,
  branches,
  email,
}: ContactDataColumnProps) {
  return (
    <div>
      <span className="label-upper inline-flex items-center gap-2.5 text-(--foreground-muted)">
        <span className="inline-block size-2 bg-(--brand-orange)" aria-hidden="true" />
        {content.eyebrow}
      </span>
      <div className="mt-6">
        {branches.map((branch) => (
          <Row key={branch.id} label={branch.label}>
            {branch.address.street}, {branch.address.city}
            <br />
            <a
              href={`tel:${branch.phoneLandline.tel}`}
              className="text-(--brand-orange) hover:text-(--brand-orange-hover)"
            >
              {branch.phoneLandline.display}
            </a>
          </Row>
        ))}
        <Row label={content.emailLabel}>
          <a
            href={`mailto:${email.primary}`}
            className="text-(--brand-orange) hover:text-(--brand-orange-hover)"
          >
            {email.primary}
          </a>
        </Row>
        <Row label={content.hoursLabel}>{content.hoursDisplay}</Row>
      </div>
    </div>
  );
}
