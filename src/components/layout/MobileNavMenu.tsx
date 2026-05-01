// landing-taxtic/src/components/layout/MobileNavMenu.tsx
"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dialog as DialogPrimitive } from "radix-ui";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface MobileNavMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PORTAL_URL = "https://sitax.taxticapp.com/login";

export function MobileNavMenu({ open, onOpenChange }: MobileNavMenuProps) {
  const tNav = useTranslations("nav");

  const items = [
    { href: "/servicios" as const, label: tNav("items.servicios") },
    { href: "/nosotros" as const, label: tNav("items.nosotros") },
    { href: "/contacto" as const, label: tNav("items.contacto") },
    { href: "/recursos" as const, label: tNav("items.recursos") },
  ];

  const handleClose = () => onOpenChange(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="hidden" />
        <DialogPrimitive.Content
          className={
            "fixed inset-0 z-[var(--z-modal)] bg-[var(--surface-inverse)] text-[var(--brand-white)] " +
            "flex flex-col p-6 " +
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 data-[state=open]:duration-200 " +
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=closed]:duration-150"
          }
        >
          <div className="flex items-center justify-between">
            <BrandLogo variant="principal" surface="dark" size="md" />
            <DialogPrimitive.Close asChild>
              <Button
                variant="ghost-light"
                size="icon"
                className="text-[var(--brand-white)] hover:bg-white/10"
                aria-label={tNav("menuClose")}
              >
                <X size={24} strokeWidth={1.75} />
              </Button>
            </DialogPrimitive.Close>
          </div>

          <nav className="flex-1 flex flex-col justify-center gap-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClose}
                className="text-2xl font-bold text-[var(--brand-white)] hover:text-[var(--brand-orange)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <LocaleSwitcher tone="dark" />
            <Button
              variant="primary-orange"
              size="md"
              className="w-full"
              asChild
            >
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
              >
                {tNav("portal")}
              </a>
            </Button>
          </div>

          <DialogPrimitive.Title className="sr-only">
            {tNav("menuToggle")}
          </DialogPrimitive.Title>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
