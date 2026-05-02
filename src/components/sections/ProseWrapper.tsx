import type { ReactNode } from "react";

interface ProseWrapperProps {
  children: ReactNode;
}

export function ProseWrapper({ children }: ProseWrapperProps) {
  return (
    <div className="mx-auto max-w-(--container-prose) [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-(--gray-900) [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-(--gray-700) [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ul]:text-(--gray-700) [&_strong]:font-bold [&_strong]:text-(--gray-900) [&_a]:text-(--brand-orange) [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-(--brand-orange-hover) [&_h2:first-child]:mt-0">
      {children}
    </div>
  );
}
