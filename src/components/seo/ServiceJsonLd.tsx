import type { ServiceItem } from "@/content-lib/schemas/services.schema";
import type { SiteContent } from "@/content-lib/schemas/site.schema";

interface ServiceJsonLdProps {
  service: ServiceItem;
  site: SiteContent;
}

export function ServiceJsonLd({ service, site }: ServiceJsonLdProps) {
  const primaryBranch = site.branches[0]!;
  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "Organization",
      name: site.org.legalName,
      address: {
        "@type": "PostalAddress",
        streetAddress: primaryBranch.address.street,
        addressLocality: primaryBranch.address.city,
        addressRegion: primaryBranch.address.region,
        addressCountry: primaryBranch.address.countryCode,
      },
    },
    serviceType: service.title,
    areaServed: { "@type": "Country", name: primaryBranch.address.country },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
