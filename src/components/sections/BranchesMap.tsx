"use client";

import dynamic from "next/dynamic";

import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { ContactContent } from "@/content-lib/schemas/contact.schema";
import type { Branch } from "@/content-lib/schemas/site.schema";

const BranchesMapCanvas = dynamic(() => import("./BranchesMapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 size-full animate-pulse bg-(--gray-800)" />
  ),
});

interface BranchesMapProps {
  content: ContactContent["map"];
  branches: Branch[];
}

export function BranchesMap({ content, branches }: BranchesMapProps) {
  return (
    <Section variant="dark">
      <Reveal mode="scroll">
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          accentWord={content.accentWord}
          tone="dark"
          display
          eyebrowAccent
          className="mb-10"
        />
        <div className="relative isolate aspect-[16/10] w-full overflow-hidden bg-(--gray-900) sm:aspect-[21/9]">
          <BranchesMapCanvas branches={branches} />
          <span className="absolute left-5 top-5 z-[500] bg-(--brand-orange) px-3 py-2 font-mono text-[11px] uppercase tracking-[0.07em] text-(--brand-white)">
            ● {content.badge}
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
