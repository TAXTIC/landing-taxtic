"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MobileNavMenu } from "@/components/layout/MobileNavMenu";
import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/content-lib/schemas/site.schema";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 16;

type NavItem = {
  href: "/servicios" | "/nosotros" | "/contacto" | "/recursos";
  label: string;
};

interface NavbarProps {
  siteData: SiteContent;
}

export function Navbar({ siteData }: NavbarProps) {
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
          "sticky top-0 z-(--z-sticky) bg-(--surface) border-b transition-colors duration-200 ease-out",
          scrolled ? "border-(--border)" : "border-transparent",
        )}
      >
        <div className="mx-auto max-w-(--container-max) px-(--space-section-x-mobile) lg:px-(--space-section-x-desktop) h-14 lg:h-16 flex items-center justify-between">
          <Link href="/" aria-label="Taxtic">
            <BrandLogo
              variant="principal"
              surface="light"
              tone="black"
              size="md"
              preload
              className="hidden md:inline-flex"
            />
            <BrandLogo
              variant="isologo"
              surface="light"
              tone="black"
              size="md"
              className="md:hidden"
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
                      ? "font-bold text-(--foreground) border-(--brand-orange)"
                      : "text-(--foreground) border-transparent hover:text-(--brand-orange)",
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
              <a
                href={siteData.portal.url}
                target="_blank"
                rel="noopener noreferrer"
              >
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

      <MobileNavMenu
        open={menuOpen}
        onOpenChange={setMenuOpen}
        siteData={siteData}
      />
    </>
  );
}
