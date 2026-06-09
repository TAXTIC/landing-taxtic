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
    <div className="relative h-full p-8 transition-colors duration-200 ease-out hover:bg-(--gray-900)">
      <span
        className="absolute left-0 top-0 h-2 w-14 bg-(--brand-orange)"
        aria-hidden="true"
      />
      <div className="font-display text-6xl leading-none text-(--brand-orange)">
        {String(stepNumber).padStart(2, "0")}
      </div>
      <h3 className="mt-5 text-xl font-bold leading-snug text-(--brand-white)">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-normal text-(--gray-300)">
        {description}
      </p>
    </div>
  );
}
