import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { routing } from "@/i18n/routing";
import { loadSite } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://taxtic.com"),
  title: {
    template: "%s | Taxtic",
    default: "Taxtic — Asesoría Tributaria Integral",
  },
  description:
    "Asesoría contable, tributaria, legal y laboral para empresas en Chile. 10 años acompañando desde Curicó con servicio integral y atención cercana.",
  openGraph: {
    type: "website",
    siteName: "Taxtic",
    locale: "es_CL",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Taxtic — Asesoría Tributaria Integral",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const site = await loadSite();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <NextIntlClientProvider>
          <OrganizationJsonLd site={site} />
          <Navbar siteData={site} />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer siteData={site} />
          <WhatsAppFab siteData={site} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
