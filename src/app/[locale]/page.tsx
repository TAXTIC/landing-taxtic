/**
 * VERIFICACIÓN VISUAL TRANSITORIA — sustituir cuando aterrice el Hero final
 * que consume content/[locale]/home.json con schema validado.
 * No editar el copy aquí: se descarta entero al llegar el contenido real.
 */
import { ArrowRight } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { BrandMark } from "@/components/common/BrandMark";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatCard } from "@/components/common/StatCard";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/56942204624";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Hero — light + h1 + buttons + decorative BrandMark */}
      <Section variant="light">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <SectionHeader
              eyebrow="Consultoría contable y tributaria"
              title="Mañana a las 10:00 tendrás el informe ejecutivo en tu correo."
              subtitle="Tres escenarios claros, una recomendación, decisión tomada antes del mediodía. Así trabajamos en Taxtic."
              as="h1"
            />
            <div className="flex flex-wrap gap-3">
              <Button variant="primary-orange" size="lg" asChild>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hablemos por WhatsApp
                  <ArrowRight size={20} strokeWidth={1.75} />
                </a>
              </Button>
              <Button variant="outline-dark" size="lg" asChild>
                <a href="#stats">Ver más</a>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <BrandMark size="lg" tone="orange" />
          </div>
        </div>
      </Section>

      {/* Stats — muted + StatCard. Cifras heredadas del legacy WP, pendientes de verificación. */}
      <Section variant="muted" id="stats">
        <div className="grid gap-8 sm:grid-cols-3">
          <StatCard value="12+" label="Años en Curicó" />
          <StatCard value="200+" label="Clientes activos" />
          <StatCard value="98%" label="Tasa de retención" />
        </div>
      </Section>

      {/* Dark — variant dark + SectionHeader tone dark + BrandLogo surface dark */}
      <Section variant="dark">
        <div className="flex flex-col gap-6 items-start">
          <BrandLogo variant="principal" surface="dark" size="md" />
          <SectionHeader
            eyebrow="Sistema sobre superficie inversa"
            title="Verificación de la combinación dark"
            subtitle="Section dark + SectionHeader tone=dark + BrandLogo surface=dark. El eyebrow naranjo se mantiene visible; el logo blanco se sirve automáticamente."
            tone="dark"
          />
        </div>
      </Section>

      {/* Orange-soft — variant rara, validación de tokens */}
      <Section variant="orange-soft">
        <SectionHeader
          eyebrow="Acento naranjo suave"
          title="Verificación de orange-soft"
          subtitle="Variant de uso puntual; queda validado para reactivarse en secciones específicas más adelante."
        />
      </Section>
    </>
  );
}
