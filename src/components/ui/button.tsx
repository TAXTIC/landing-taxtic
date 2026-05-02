import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold rounded-none transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--background) " +
    "disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        "primary-orange":
          "bg-(--brand-orange) text-(--brand-white) " +
          "hover:bg-(--brand-orange-hover) active:bg-(--brand-orange-active)",
        "outline-dark":
          "border border-(--border-strong) text-(--foreground) bg-transparent " +
          "hover:bg-(--surface-muted) hover:border-(--brand-orange) " +
          "active:bg-(--brand-orange-soft)",
        "ghost-light":
          "text-(--foreground) bg-transparent " +
          "hover:bg-(--surface-muted) active:bg-(--surface-muted)",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary-orange", size: "md" },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
