import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  metadataBase: new URL("https://taxtic.com"),
  title: {
    template: "%s | Taxtic",
    default: "Taxtic — Asesoría Tributaria Integral",
  },
  description:
    "Asesoría contable, tributaria, legal y laboral para empresas en Chile. 12 años acompañando desde Curicó con servicio integral y atención cercana.",
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

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <WhatsAppFab />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
