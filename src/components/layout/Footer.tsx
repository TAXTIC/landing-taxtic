import { useTranslations } from "next-intl";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// TODO: refactorizar para consumir content/[locale]/contact.json
// vía src/content-lib/loaders.ts cuando exista el loader de contenido.
const CONTACT_DATA = {
  street: "Carmen #459",
  cityRegion: "Curicó, Región del Maule, Chile",
  phoneTelHref: "+56752221800",
  phoneDisplay: "+56 75 2 221800",
  email: "contacto@taxtic.com",
  socials: {
    instagram: "https://www.instagram.com/taxtic.chile/",
    facebook: "https://www.facebook.com/Taxtic/",
    linkedin: "https://cl.linkedin.com/company/taxtic-chile",
  },
  portalUrl: "https://sitax.taxticapp.com/login",
} as const;

export function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const year = new Date().getFullYear();

  const navItems = [
    { href: "/servicios", label: tNav("items.servicios") },
    { href: "/nosotros", label: tNav("items.nosotros") },
    { href: "/contacto", label: tNav("items.contacto") },
    { href: "/recursos", label: tNav("items.recursos") },
  ] as const;

  return (
    <footer className="bg-[var(--surface-inverse)] text-[var(--brand-white)] py-16 lg:py-20">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--space-section-x-mobile)] lg:px-[var(--space-section-x-desktop)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <BrandLogo variant="principal" surface="dark" size="md" />
            <p className="text-sm leading-normal text-[var(--gray-300)]">
              {tFooter("tagline")}
            </p>
          </div>

          {/* Navegación */}
          <FooterColumn header={tFooter("navHeader")}>
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--brand-white)] hover:text-[var(--brand-orange)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Contacto */}
          <FooterColumn header={tFooter("contactHeader")}>
            <ul className="flex flex-col gap-2 text-sm not-italic">
              <li>{CONTACT_DATA.street}</li>
              <li>{CONTACT_DATA.cityRegion}</li>
              <li>
                <a
                  href={`tel:${CONTACT_DATA.phoneTelHref}`}
                  className="hover:text-[var(--brand-orange)] transition-colors"
                >
                  {CONTACT_DATA.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_DATA.email}`}
                  className="hover:text-[var(--brand-orange)] transition-colors"
                >
                  {CONTACT_DATA.email}
                </a>
              </li>
              <li className="text-[var(--gray-300)] mt-2">
                {tFooter("hours")}
              </li>
            </ul>
          </FooterColumn>

          {/* Síguenos + Portal */}
          <FooterColumn header={tFooter("socialHeader")}>
            <div className="flex gap-4">
              <SocialLink
                href={CONTACT_DATA.socials.instagram}
                label="Instagram"
              >
                <InstagramIcon size={20} />
              </SocialLink>
              <SocialLink href={CONTACT_DATA.socials.facebook} label="Facebook">
                <FacebookIcon size={20} />
              </SocialLink>
              <SocialLink href={CONTACT_DATA.socials.linkedin} label="LinkedIn">
                <LinkedInIcon size={20} />
              </SocialLink>
            </div>
            <Button
              variant="primary-orange"
              size="md"
              className="w-full mt-2"
              asChild
            >
              <a
                href={CONTACT_DATA.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tNav("portal")}
              </a>
            </Button>
          </FooterColumn>
        </div>

        <hr className="mt-12 border-[var(--gray-700)]" />
        <p className="mt-6 text-xs text-[var(--gray-300)]">
          © {year} Taxtic. {tFooter("rights")}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  header,
  children,
  className,
}: {
  header: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <span className="label-upper text-[var(--gray-400)]">{header}</span>
      {children}
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-[var(--brand-white)] hover:text-[var(--brand-orange)] transition-colors"
    >
      {children}
    </a>
  );
}
