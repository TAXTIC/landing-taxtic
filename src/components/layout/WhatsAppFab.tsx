"use client";

import { useTranslations } from "next-intl";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { track } from "@/lib/analytics";

const WHATSAPP_URL = "https://wa.me/56942204624";

export function WhatsAppFab() {
  const tFab = useTranslations("fab");

  const handleClick = () => {
    track("whatsapp_click", { position: "floating" });
  };

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={tFab("whatsappLabel")}
      className={
        "fixed bottom-6 right-6 z-[var(--z-fab)] " +
        "h-14 w-14 inline-flex items-center justify-center rounded-none " +
        "bg-[var(--brand-orange)] text-[var(--brand-white)] " +
        "hover:bg-[var(--brand-orange-hover)] active:bg-[var(--brand-orange-active)] " +
        "transition-colors " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      }
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
