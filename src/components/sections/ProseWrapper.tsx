import type { ReactNode } from "react";

interface ProseWrapperProps {
  children: ReactNode;
}

export function ProseWrapper({ children }: ProseWrapperProps) {
  return (
    <div className="[&>p:first-child]:text-[22px] [&>p:first-child]:font-light [&>p:first-child]:leading-[1.45] [&>p:first-child]:text-(--foreground) [&>p:first-child]:mb-10 [&>p:first-child]:max-w-[640px] [&_h2]:font-display [&_h2]:font-normal [&_h2]:uppercase [&_h2]:text-[36px] [&_h2]:leading-none [&_h2]:tracking-[-0.01em] [&_h2]:text-(--foreground) [&_h2]:mt-16 [&_h2]:mb-6 [&_h3]:font-display [&_h3]:font-normal [&_h3]:uppercase [&_h3]:text-2xl [&_h3]:mt-10 [&_h3]:mb-3 [&_p]:text-[17px] [&_p]:font-light [&_p]:leading-[1.6] [&_p]:text-(--gray-700) [&_p]:mb-4 [&_p]:max-w-[640px] [&_ul]:list-none [&_ul]:my-6 [&_ul]:p-0 [&_ul_li]:relative [&_ul_li]:max-w-[640px] [&_ul_li]:border-t [&_ul_li]:border-(--border) [&_ul_li]:py-4 [&_ul_li]:pl-6 [&_ul_li]:text-base [&_ul_li]:text-(--foreground) [&_ul_li]:before:absolute [&_ul_li]:before:left-0 [&_ul_li]:before:top-[22px] [&_ul_li]:before:size-2.5 [&_ul_li]:before:bg-(--brand-orange) [&_ul_li]:before:content-[''] [&_ul_li:last-child]:border-b [&_strong]:font-medium [&_strong]:text-(--foreground) [&_a]:text-(--brand-orange) [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-(--brand-orange-hover) [&_h2:first-child]:mt-0">
      {children}
    </div>
  );
}
