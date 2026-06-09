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
    <div className="relative h-full px-8 pt-14 pb-10 transition-[background-color,transform] duration-200 ease-out hover:-translate-y-1.5 hover:bg-(--gray-900)">
      <span
        className="absolute left-0 top-0 h-2 w-14 bg-(--brand-orange)"
        aria-hidden="true"
      />
      <div className="font-display text-6xl leading-none text-(--brand-orange)">
        {String(stepNumber).padStart(2, "0")}
      </div>
      <h3 className="mt-5 text-[22px] font-medium leading-[1.15] text-(--brand-white)">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-normal text-(--gray-300)">
        {description}
      </p>
    </div>
  );
}
