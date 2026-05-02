"use client";

import { useTranslations } from "next-intl";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import type { SiteContent } from "@/content-lib/schemas/site.schema";
import { track } from "@/lib/analytics";

interface WhatsAppFabProps {
  siteData: SiteContent;
}

export function WhatsAppFab({ siteData }: WhatsAppFabProps) {
  const tFab = useTranslations("fab");

  const handleClick = () => {
    track("whatsapp_click", { position: "floating" });
  };

  return (
    <a
      href={siteData.channels.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={tFab("whatsappLabel")}
      className={
        "fixed bottom-6 right-6 z-(--z-fab) " +
        "h-14 w-14 inline-flex items-center justify-center rounded-none " +
        "bg-(--brand-orange) text-(--brand-white) " +
        "hover:bg-(--brand-orange-hover) active:bg-(--brand-orange-active) " +
        "transition-colors " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)"
      }
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
