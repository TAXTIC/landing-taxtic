import { useTranslations } from "next-intl";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/content-lib/schemas/site.schema";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface FooterProps {
  siteData: SiteContent;
}

export function Footer({ siteData }: FooterProps) {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const year = new Date().getFullYear();

  const navItems = [
    { href: "/servicios", label: tNav("items.servicios") },
    { href: "/nosotros", label: tNav("items.nosotros") },
    { href: "/contacto", label: tNav("items.contacto") },
  ] as const;

  return (
    <footer className="bg-(--surface-inverse) text-(--brand-white) py-16 lg:py-20">
      <div className="mx-auto max-w-(--container-max) px-(--space-section-x-mobile) lg:px-(--space-section-x-desktop)">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            {/* El chrome oscuro del footer ya da el aire visual; el diseño
                lo renderiza flush con el texto a 180px de ancho (50px de alto). */}
            <BrandLogo
              variant="principal"
              surface="dark"
              size={50}
              clearSpace="compact"
            />
            <p className="max-w-[280px] text-sm leading-normal text-(--gray-300)">
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
                    className="text-sm text-(--brand-white) hover:text-(--brand-orange) transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Sucursales */}
          <FooterColumn header={tFooter("branchesHeader")}>
            <ul className="flex flex-col gap-4 text-sm not-italic">
              {siteData.branches.map((branch, index) => (
                <li key={branch.id} className="flex flex-col gap-1">
                  {index > 0 ? (
                    <hr className="border-t border-(--gray-700) mb-3" />
                  ) : null}
                  <span className="text-xs uppercase tracking-wide text-(--gray-400)">
                    {branch.label}
                  </span>
                  <span>
                    {branch.address.street} · {branch.address.city}
                  </span>
                  <a
                    href={`tel:${branch.phoneLandline.tel}`}
                    className="hover:text-(--brand-orange) transition-colors w-fit"
                  >
                    {branch.phoneLandline.display}
                  </a>
                </li>
              ))}
              <li className="flex flex-col gap-1 pt-3 border-t border-(--gray-700)">
                <a
                  href={`mailto:${siteData.channels.email.primary}`}
                  className="hover:text-(--brand-orange) transition-colors w-fit"
                >
                  {siteData.channels.email.primary}
                </a>
                <span className="text-(--gray-300)">{tFooter("hours")}</span>
              </li>
            </ul>
          </FooterColumn>

          {/* Síguenos + Portal */}
          <FooterColumn header={tFooter("socialHeader")}>
            <div className="flex gap-4">
              <SocialLink href={siteData.social.instagram} label="Instagram">
                <InstagramIcon size={20} />
              </SocialLink>
              <SocialLink href={siteData.social.facebook} label="Facebook">
                <FacebookIcon size={20} />
              </SocialLink>
              <SocialLink href={siteData.social.linkedin} label="LinkedIn">
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
                href={siteData.portal.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tNav("portal")}
              </a>
            </Button>
          </FooterColumn>
        </div>

        <hr className="mt-12 border-(--gray-700)" />
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.06em] text-(--gray-400)">
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
      <span className="label-upper text-(--gray-400)">{header}</span>
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
      className="text-(--brand-white) hover:text-(--brand-orange) transition-colors"
    >
      {children}
    </a>
  );
}
