import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Taxtic",
    template: "%s · Taxtic",
  },
  description: "Asesoría contable, tributaria y laboral en Chile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
