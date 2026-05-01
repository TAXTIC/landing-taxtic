import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold rounded-none transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] " +
    "disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        "primary-orange":
          "bg-[var(--brand-orange)] text-[var(--brand-white)] " +
          "hover:bg-[var(--brand-orange-hover)] active:bg-[var(--brand-orange-active)]",
        "outline-dark":
          "border border-[var(--border-strong)] text-[var(--foreground)] bg-transparent " +
          "hover:bg-[var(--surface-muted)] hover:border-[var(--brand-orange)] " +
          "active:bg-[var(--brand-orange-soft)]",
        "ghost-light":
          "text-[var(--foreground)] bg-transparent " +
          "hover:bg-[var(--surface-muted)] active:bg-[var(--surface-muted)]",
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
