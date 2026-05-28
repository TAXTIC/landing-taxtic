"use client";

import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import type { ContactContent } from "@/content-lib/schemas/contact.schema";
import type { SiteContent } from "@/content-lib/schemas/site.schema";
import { track } from "@/lib/analytics";

interface ContactChannelsListProps {
  content: ContactContent["channels"];
  site: SiteContent;
}

function ChannelRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 mt-1 text-(--brand-orange)">{icon}</div>
      <div className="flex-1">
        <p className="label-upper text-(--gray-700) mb-1">{label}</p>
        <div className="text-base text-(--gray-900)">{children}</div>
      </div>
    </div>
  );
}

export function ContactChannelsList({
  content,
  site,
}: ContactChannelsListProps) {
  const primaryBranch = site.branches[0]!;

  function handleWhatsAppClick() {
    track("whatsapp_click", { position: "contacto" });
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-(--gray-900) mb-2">
        {content.sectionTitle}
      </h2>

      <ChannelRow
        icon={<MapPin size={20} strokeWidth={1.75} aria-hidden="true" />}
        label={content.labels.address}
      >
        {primaryBranch.address.street}, {primaryBranch.address.city},{" "}
        {primaryBranch.address.region}
      </ChannelRow>

      <ChannelRow
        icon={<Clock size={20} strokeWidth={1.75} aria-hidden="true" />}
        label={content.labels.hours}
      >
        {content.hoursDisplay}
      </ChannelRow>

      <ChannelRow
        icon={<Mail size={20} strokeWidth={1.75} aria-hidden="true" />}
        label={content.labels.email}
      >
        <a
          href={`mailto:${site.channels.email.primary}`}
          className="text-(--brand-orange) hover:text-(--brand-orange-hover) underline underline-offset-2"
        >
          {site.channels.email.primary}
        </a>
      </ChannelRow>

      <ChannelRow
        icon={<Phone size={20} strokeWidth={1.75} aria-hidden="true" />}
        label={content.labels.phoneLandline}
      >
        <a
          href={`tel:${primaryBranch.phoneLandline.tel}`}
          className="text-(--brand-orange) hover:text-(--brand-orange-hover) underline underline-offset-2"
        >
          {primaryBranch.phoneLandline.display}
        </a>
      </ChannelRow>

      <ChannelRow
        icon={<WhatsAppIcon size={20} aria-hidden="true" />}
        label={content.labels.whatsapp}
      >
        <Button variant="primary-orange" size="sm" asChild>
          <a
            href={site.channels.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
          >
            {site.channels.whatsapp.display}
          </a>
        </Button>
      </ChannelRow>

      <ChannelRow
        icon={<ExternalLink size={20} strokeWidth={1.75} aria-hidden="true" />}
        label={content.labels.portal}
      >
        <a
          href={site.portal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-(--brand-orange) hover:text-(--brand-orange-hover) underline underline-offset-2"
        >
          Acceder al portal
        </a>
      </ChannelRow>

      <div>
        <p className="label-upper text-(--gray-700) mb-3">
          {content.labels.social}
        </p>
        <div className="flex gap-4">
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-(--gray-700) hover:text-(--brand-orange)"
          >
            <InstagramIcon size={24} />
          </a>
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-(--gray-700) hover:text-(--brand-orange)"
          >
            <FacebookIcon size={24} />
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-(--gray-700) hover:text-(--brand-orange)"
          >
            <LinkedInIcon size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}
