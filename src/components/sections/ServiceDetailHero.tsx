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
    <div className="flex flex-col">
      <Link
        href={"/servicios" as never}
        className="mb-8 inline-flex w-fit items-center gap-2 border-b border-current pb-0.5 text-xs font-medium tracking-[0.02em] text-(--foreground) transition-[gap,color] duration-200 ease-out hover:gap-3.5 hover:text-(--brand-orange)"
      >
        <span aria-hidden="true">←</span>
        {t("breadcrumb.back")}
      </Link>
      <h1 className="font-display font-normal uppercase leading-[0.92] tracking-[-0.025em] text-[clamp(2.75rem,6.5vw,5.5rem)] text-(--foreground)">
        {titleFirst}
        {titleRest ? (
          <>
            <br />
            <span className="text-(--brand-orange)">{titleRest}.</span>
          </>
        ) : null}
      </h1>
      <p className="mt-10 max-w-[680px] text-[19px] font-light leading-[1.55] text-(--gray-700)">
        {service.shortDescription}
      </p>
    </div>
  );
}
