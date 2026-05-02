import { ExternalLink } from "lucide-react";

interface ContactMapEmbedProps {
  embedUrl: string;
  iframeTitle: string;
  openInMapsLabel: string;
  externalUrl: string;
}

export function ContactMapEmbed({
  embedUrl,
  iframeTitle,
  openInMapsLabel,
  externalUrl,
}: ContactMapEmbedProps) {
  return (
    <div className="space-y-3">
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] border border-[var(--border)]">
        <iframe
          src={embedUrl}
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
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-[var(--brand-orange)] hover:text-[var(--brand-orange-hover)]"
      >
        {openInMapsLabel}
        <ExternalLink size={16} strokeWidth={1.75} aria-hidden="true" />
      </a>
    </div>
  );
}
