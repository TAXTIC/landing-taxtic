"use client";

import { Check, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { enabledLocales, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Locale = (typeof routing.locales)[number];

interface LocaleSwitcherProps {
  tone?: "light" | "dark";
}

export function LocaleSwitcher({ tone = "light" }: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const tLocale = useTranslations("locale");

  const handleSelect = (next: Locale) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  // Un solo idioma habilitado: pastilla estática, no interactiva.
  if (enabledLocales.length <= 1) {
    return (
      <span
        role="img"
        aria-label={`${tLocale("currentLabel")}: ${locale.toUpperCase()}`}
        className={cn(
          "inline-flex items-center font-mono text-xs tracking-wide px-2 py-1 border select-none",
          tone === "dark"
            ? "text-(--brand-white) border-(--brand-white)/30"
            : "text-(--foreground-muted) border-(--border)",
        )}
      >
        {locale.toUpperCase()}
      </span>
    );
  }

  const triggerClass = cn(
    "gap-1",
    tone === "dark"
      ? "text-(--brand-white) hover:bg-white/10 active:bg-white/10"
      : undefined,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost-light"
          size="sm"
          className={triggerClass}
          aria-label={tLocale("switchLabel")}
        >
          {locale.toUpperCase()}
          <ChevronDown size={14} strokeWidth={1.75} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {enabledLocales.map((option) => (
          <DropdownMenuItem
            key={option}
            onSelect={() => handleSelect(option)}
            className={cn("gap-2", option === locale ? "font-bold" : undefined)}
          >
            {tLocale(option)}
            {option === locale ? (
              <Check size={14} strokeWidth={1.75} className="ml-auto" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
