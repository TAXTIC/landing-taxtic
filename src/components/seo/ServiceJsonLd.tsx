import type { ServiceItem } from "@/content-lib/schemas/services.schema";
import type { SiteContent } from "@/content-lib/schemas/site.schema";

interface ServiceJsonLdProps {
  service: ServiceItem;
  site: SiteContent;
}

export function ServiceJsonLd({ service, site }: ServiceJsonLdProps) {
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
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        addressCountry: site.address.countryCode,
      },
    },
    serviceType: service.title,
    areaServed: { "@type": "Country", name: site.address.country },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
