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
  const primaryBranch = siteData.branches[0]!;

  const navItems = [
    { href: "/servicios", label: tNav("items.servicios") },
    { href: "/nosotros", label: tNav("items.nosotros") },
    { href: "/contacto", label: tNav("items.contacto") },
    { href: "/recursos", label: tNav("items.recursos") },
  ] as const;

  return (
    <footer className="bg-(--surface-inverse) text-(--brand-white) py-16 lg:py-20">
      <div className="mx-auto max-w-(--container-max) px-(--space-section-x-mobile) lg:px-(--space-section-x-desktop)">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <BrandLogo variant="principal" surface="dark" size="md" />
            <p className="text-sm leading-normal text-(--gray-300)">
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

          {/* Contacto */}
          <FooterColumn header={tFooter("contactHeader")}>
            <ul className="flex flex-col gap-2 text-sm not-italic">
              <li>{primaryBranch.address.street}</li>
              <li>{`${primaryBranch.address.city}, ${primaryBranch.address.region}, ${primaryBranch.address.country}`}</li>
              <li>
                <a
                  href={`tel:${primaryBranch.phoneLandline.tel}`}
                  className="hover:text-(--brand-orange) transition-colors"
                >
                  {primaryBranch.phoneLandline.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteData.channels.email.primary}`}
                  className="hover:text-(--brand-orange) transition-colors"
                >
                  {siteData.channels.email.primary}
                </a>
              </li>
              <li className="text-(--gray-300) mt-2">{tFooter("hours")}</li>
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
        <p className="mt-6 text-xs text-(--gray-300)">
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
