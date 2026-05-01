"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MobileNavMenu } from "@/components/layout/MobileNavMenu";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const PORTAL_URL = "https://sitax.taxticapp.com/login";
const SCROLL_THRESHOLD = 16;

type NavItem = {
  href: "/servicios" | "/nosotros" | "/contacto" | "/recursos";
  label: string;
};

export function Navbar() {
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items: NavItem[] = [
    { href: "/servicios", label: tNav("items.servicios") },
    { href: "/nosotros", label: tNav("items.nosotros") },
    { href: "/contacto", label: tNav("items.contacto") },
    { href: "/recursos", label: tNav("items.recursos") },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[var(--z-sticky)] bg-[var(--surface)] border-b transition-colors duration-200 ease-out",
          scrolled ? "border-[var(--border)]" : "border-transparent",
        )}
      >
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--space-section-x-mobile)] lg:px-[var(--space-section-x-desktop)] h-[72px] md:h-14 lg:h-16 flex items-center justify-between">
          <Link href="/" aria-label="Taxtic">
            <BrandLogo
              variant="auto"
              surface="light"
              tone="black"
              size="md"
              sizeMobile="lg"
              preload
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm transition-colors border-b-2",
                    isActive
                      ? "font-bold text-[var(--foreground)] border-[var(--brand-orange)]"
                      : "text-[var(--foreground)] border-transparent hover:text-[var(--brand-orange)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LocaleSwitcher tone="light" />
            <Button variant="primary-orange" size="sm" asChild>
              <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer">
                {tNav("portal")}
              </a>
            </Button>
          </div>

          <Button
            variant="ghost-light"
            size="icon"
            className="md:hidden"
            aria-label={tNav("menuToggle")}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} strokeWidth={1.75} />
          </Button>
        </div>
      </header>

      <MobileNavMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
}
