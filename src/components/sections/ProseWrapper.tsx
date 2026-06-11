import type { ReactNode } from "react";

interface ProseWrapperProps {
  children: ReactNode;
}

export function ProseWrapper({ children }: ProseWrapperProps) {
  return (
    <div className="[&>p:first-child]:text-xl [&>p:first-child]:font-light [&>p:first-child]:leading-snug [&>p:first-child]:text-(--foreground) [&>p:first-child]:mb-8 [&_h2]:font-display [&_h2]:font-normal [&_h2]:uppercase [&_h2]:text-2xl [&_h2]:tracking-tight [&_h2]:text-(--foreground) [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-(--foreground-muted) [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ul]:text-(--foreground-muted) [&_strong]:font-medium [&_strong]:text-(--foreground) [&_a]:text-(--brand-orange) [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-(--brand-orange-hover) [&_h2:first-child]:mt-0">
      {children}
    </div>
  );
}
