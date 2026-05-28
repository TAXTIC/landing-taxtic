import { ExternalLink, Phone } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { Branch } from "@/content-lib/schemas/site.schema";

interface BranchCardProps {
  branch: Branch;
  iframeTitleTemplate: string;
  openInMapsLabel: string;
}

function applyTitleTemplate(
  template: string,
  values: { label: string; street: string; city: string },
): string {
  return template
    .replace("{{label}}", values.label)
    .replace("{{street}}", values.street)
    .replace("{{city}}", values.city);
}

export function BranchCard({
  branch,
  iframeTitleTemplate,
  openInMapsLabel,
}: BranchCardProps) {
  const { label, address, phoneLandline } = branch;
  const iframeTitle = applyTitleTemplate(iframeTitleTemplate, {
    label,
    street: address.street,
    city: address.city,
  });
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address.street}, ${address.city}, ${address.country}`)}`;

  return (
    <Card variant="with-orange-border" className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-(--gray-900)">{label}</h3>
      <p className="text-base text-(--gray-700)">
        {address.street}, {address.city}, {address.region}
      </p>
      <a
        href={`tel:${phoneLandline.tel}`}
        className="inline-flex items-center gap-2 text-base text-(--brand-orange) hover:text-(--brand-orange-hover) underline underline-offset-2 w-fit"
      >
        <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
        {phoneLandline.display}
      </a>
      <div className="relative w-full h-[280px] md:h-[340px] border border-(--border)">
        <iframe
          src={address.mapEmbedUrl}
          title={iframeTitle}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={externalMapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-(--brand-orange) hover:text-(--brand-orange-hover) w-fit"
      >
        {openInMapsLabel}
        <ExternalLink size={16} strokeWidth={1.75} aria-hidden="true" />
      </a>
    </Card>
  );
}
