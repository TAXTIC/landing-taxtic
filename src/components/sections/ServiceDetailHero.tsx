import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import type { ServiceItem } from "@/content-lib/schemas/services.schema";
import { Link } from "@/i18n/navigation";
import { splitFirstWord } from "@/lib/text";

interface ServiceDetailHeroProps {
  service: ServiceItem;
}

export function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  const t = useTranslations("services");
  const [titleFirst, titleRest] = splitFirstWord(service.title);

  return (
    <div className="flex flex-col gap-5">
      <Link
        href={"/servicios" as never}
        className="inline-flex items-center gap-2 text-sm text-(--foreground-muted) transition-colors hover:text-(--brand-orange)"
      >
        <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
        {t("breadcrumb.back")}
      </Link>
      <h1 className="font-display font-normal uppercase leading-[0.98] tracking-tight text-4xl text-(--foreground) sm:text-5xl lg:text-display-l">
        {titleFirst}
        {titleRest ? (
          <>
            <br />
            <span className="text-(--brand-orange)">{titleRest}.</span>
          </>
        ) : null}
      </h1>
      <p className="max-w-[40rem] text-lg leading-normal text-(--foreground-muted)">
        {service.shortDescription}
      </p>
    </div>
  );
}
