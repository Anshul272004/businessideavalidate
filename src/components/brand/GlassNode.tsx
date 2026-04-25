import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassNodeProps {
  label: string;
  index: number;
  active?: boolean;
  icon?: ReactNode;
  className?: string;
}

/**
 * GlassNode — small translucent glass cube/pill used in the AnimatedFlow.
 * Pulses gold when `active`.
 */
const GlassNode = ({ label, index, active, icon, className }: GlassNodeProps) => {
  return (
    <div className={cn("relative flex flex-col items-center gap-3", className)}>
      <div
        className={cn(
          "relative w-20 h-20 md:w-24 md:h-24 rounded-2xl",
          "glass-panel prismatic-edge flex items-center justify-center",
          "transition-all duration-500",
          active && "scale-110"
        )}
        style={{
          boxShadow: active
            ? "0 0 60px -10px hsl(45 93% 47% / 0.6), inset 0 0 30px hsl(45 93% 47% / 0.15)"
            : "0 8px 30px -10px hsl(240 10% 0% / 0.6)",
        }}
      >
        <span
          className={cn(
            "text-primary transition-all duration-500",
            active ? "scale-110" : "opacity-70"
          )}
        >
          {icon}
        </span>

        {/* Inner pulse */}
        {active && (
          <span className="absolute inset-2 rounded-xl border border-primary/40 animate-glass-pulse" />
        )}

        {/* Index marker */}
        <span
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-primary/40 flex items-center justify-center text-[10px] tabular-nums text-primary font-medium"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          {index}
        </span>
      </div>
      <span
        className={cn(
          "ui-label-sm transition-colors duration-500",
          active ? "text-primary" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default GlassNode;
