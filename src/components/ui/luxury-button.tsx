import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const luxuryButtonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "text-foreground hover:text-primary hover:bg-transparent",
        outline:
          "border border-border text-foreground hover:border-primary hover:text-primary",
      },
      size: {
        default: "h-12 px-8 text-base rounded-lg",
        sm: "h-10 px-6 text-sm rounded-md",
        lg: "h-14 px-10 text-lg rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface LuxuryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof luxuryButtonVariants> {}

const LuxuryButton = React.forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(luxuryButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
LuxuryButton.displayName = "LuxuryButton";

export { LuxuryButton, luxuryButtonVariants };
