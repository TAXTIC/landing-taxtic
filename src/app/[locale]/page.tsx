import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("common");

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 p-8 text-center">
      <Image
        src="/brand/imagotipo-principal-naranjo.svg"
        alt={t("siteName")}
        width={360}
        height={100}
        priority
      />
      <h1 className="text-foreground text-4xl tracking-tight">
        Hola Taxtic v2
      </h1>
      <p className="text-foreground-muted">
        Scaffold listo. Las secciones del Home llegan en Fase 1.
      </p>
    </main>
  );
}
