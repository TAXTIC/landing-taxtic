import { BranchCard } from "@/components/sections/BranchCard";
import type { ContactContent } from "@/content-lib/schemas/contact.schema";
import type { Branch } from "@/content-lib/schemas/site.schema";

interface BranchesListProps {
  branches: Branch[];
  content: ContactContent["branches"];
}

export function BranchesList({ branches, content }: BranchesListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-(--gray-900) mb-2">
        {content.sectionTitle}
      </h2>
      <div className="flex flex-col gap-6">
        {branches.map((branch) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            iframeTitleTemplate={content.iframeTitleTemplate}
            openInMapsLabel={content.openInMapsLabel}
          />
        ))}
      </div>
    </div>
  );
}
