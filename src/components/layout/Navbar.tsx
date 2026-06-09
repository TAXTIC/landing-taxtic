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

const SCROLL_THRESHOLD = 32;

type NavItem = {
  href: "/servicios" | "/nosotros" | "/contacto";
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
  ];

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-4 top-4 z-(--z-sticky)",
          "nav-glass border transition-colors duration-200 ease-out",
          scrolled
            ? "bg-(--glass-bg-condensed) border-(--glass-border)"
            : "bg-(--glass-bg) border-(--glass-border)",
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-(--container-max) flex items-center justify-between",
            "transition-all duration-200 ease-out",
            scrolled ? "px-4 py-2" : "px-5 py-3",
          )}
        >
          <Link href="/" aria-label="Taxtic">
            <BrandLogo
              variant="isologo"
              surface="light"
              tone="orange"
              size="md"
              clearSpace="compact"
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
                    "text-[13px] transition-colors border-b-2",
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
            <Button variant="solid-dark" size="sm" asChild>
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
