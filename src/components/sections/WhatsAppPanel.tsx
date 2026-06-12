"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ContactContent } from "@/content-lib/schemas/contact.schema";
import type { ResolvedCta } from "@/content-lib/schemas/cta.schema";
import { track } from "@/lib/analytics";

interface WhatsAppPanelProps {
  content: ContactContent["whatsappPanel"];
  whatsappCta: ResolvedCta;
  email: string;
}

/**
 * Panel de contacto por WhatsApp. Ocupa la columna ancha de la sección de
 * datos; esa columna queda reservada para el formulario de contacto cuando
 * exista — al introducirlo, este panel se reemplaza in situ.
 */
export function WhatsAppPanel({
  content,
  whatsappCta,
  email,
}: WhatsAppPanelProps) {
  return (
    <div className="relative flex flex-col justify-center overflow-hidden bg-(--surface-inverse) p-10 lg:p-12">
      <span
        className="absolute right-0 top-0 size-12 bg-(--brand-orange)"
        aria-hidden="true"
      />
      <span className="label-upper text-(--brand-orange)">
        {content.eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-normal uppercase leading-none tracking-tight text-(--brand-white) sm:text-4xl">
        {content.title}
      </h2>
      <p className="mt-4 max-w-[40ch] text-base font-light leading-relaxed text-(--gray-300)">
        {content.lead}
      </p>
      <div className="mt-8">
        <Button variant="primary-orange" size="lg" asChild>
          <a
            href={whatsappCta.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { position: "contacto" })}
          >
            {whatsappCta.label}
            <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </Button>
      </div>
      <p className="mt-6 text-sm text-(--gray-400)">
        {content.altEmailPrefix}{" "}
        <a
          href={`mailto:${email}`}
          className="text-(--brand-white) underline underline-offset-2"
        >
          {email}
        </a>
      </p>
    </div>
  );
}
