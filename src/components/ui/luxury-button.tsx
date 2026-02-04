import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const luxuryButtonVariants = cva(
  "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden group",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
        secondary:
          "bg-card border border-border text-foreground hover:border-primary/50 hover:bg-card/80 active:scale-[0.98]",
        ghost:
          "text-foreground hover:text-primary hover:bg-primary/5",
        outline:
          "border border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-[0.98]",
        ice:
          "bg-ice text-ice-foreground hover:bg-ice/90 active:scale-[0.98] shadow-lg shadow-ice/25",
        glow:
          "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 active:scale-[0.98] animate-glow-pulse",
      },
      size: {
        default: "h-12 px-6 text-sm rounded-xl",
        sm: "h-10 px-5 text-sm rounded-lg",
        lg: "h-14 px-8 text-base rounded-xl",
        xl: "h-16 px-10 text-lg rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
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
    VariantProps<typeof luxuryButtonVariants> {
  isLoading?: boolean;
  loadingText?: string;
}

const LuxuryButton = React.forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  ({ className, variant, size, isLoading, loadingText, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(luxuryButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </span>
        
        {/* Content */}
        <span className="relative flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {loadingText || "Loading..."}
            </>
          ) : (
            children
          )}
        </span>
      </button>
    );
  }
);
LuxuryButton.displayName = "LuxuryButton";

export { LuxuryButton, luxuryButtonVariants };
