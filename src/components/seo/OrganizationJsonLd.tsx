import type { SiteContent } from "@/content-lib/schemas/site.schema";

interface OrganizationJsonLdProps {
  site: SiteContent;
}

export function OrganizationJsonLd({ site }: OrganizationJsonLdProps) {
  const baseUrl = site.canonicalUrl.replace(/\/$/, "");
  const json = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.org.legalName,
    url: baseUrl,
    logo: `${baseUrl}/brand/imagotipo-principal-naranjo.svg`,
    telephone: site.channels.whatsapp.tel,
    email: site.channels.email.primary,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: site.hours.weekdays.open,
        closes: site.hours.weekdays.close,
      },
    ],
    sameAs: [site.social.instagram, site.social.facebook, site.social.linkedin],
    location: site.branches.map((branch) => ({
      "@type": "Place",
      name: branch.label,
      address: {
        "@type": "PostalAddress",
        streetAddress: branch.address.street,
        addressLocality: branch.address.city,
        addressRegion: branch.address.region,
        addressCountry: branch.address.countryCode,
      },
      telephone: branch.phoneLandline.tel,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
