interface ProcessStepProps {
  stepNumber: number;
  title: string;
  description: string;
}

export function ProcessStep({
  stepNumber,
  title,
  description,
}: ProcessStepProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-3xl font-bold text-(--brand-orange) leading-none">
        {stepNumber}
      </div>
      <div className="h-0.5 w-6 bg-(--brand-orange)" aria-hidden="true" />
      <h3 className="text-base font-bold text-(--gray-900)">{title}</h3>
      <p className="text-sm leading-relaxed text-(--gray-700)">{description}</p>
    </div>
  );
}
