import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    qualities: [75, 85],
  },
  async redirects() {
    return [
      { source: "/", destination: "/es", permanent: true },
      { source: "/inicio", destination: "/es", permanent: true },
      { source: "/nosotros", destination: "/es/nosotros", permanent: true },
      { source: "/contacto", destination: "/es/contacto", permanent: true },
      {
        source: "/asesoria-contable",
        destination: "/es/servicios/asesoria-contable",
        permanent: true,
      },
      {
        source: "/asesoria-tributaria",
        destination: "/es/servicios/asesoria-tributaria",
        permanent: true,
      },
      {
        source: "/asesoria-laboral",
        destination: "/es/servicios/asesoria-laboral",
        permanent: true,
      },
      {
        source: "/accounting-advice",
        destination: "/es/servicios/asesoria-contable",
        permanent: true,
      },
      // Servicios retirados (6 → 3): legacy raíz + ruta interna → índice.
      {
        source: "/asesoria-legal",
        destination: "/es/servicios",
        permanent: true,
      },
      { source: "/outsourcing", destination: "/es/servicios", permanent: true },
      {
        source: "/documentos-electronicos",
        destination: "/es/servicios",
        permanent: true,
      },
      {
        source: "/es/servicios/asesoria-legal",
        destination: "/es/servicios",
        permanent: true,
      },
      {
        source: "/es/servicios/outsourcing",
        destination: "/es/servicios",
        permanent: true,
      },
      {
        source: "/es/servicios/documentos-electronicos",
        destination: "/es/servicios",
        permanent: true,
      },
    ];
  },
};

export default withMDX(withNextIntl(nextConfig));
