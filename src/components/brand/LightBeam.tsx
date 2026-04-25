import { cn } from "@/lib/utils";

interface LightBeamProps {
  active?: boolean;
  className?: string;
  /** Delay (ms) before the beam pulse starts when active. */
  delay?: number;
}

/**
 * LightBeam — horizontal connector between GlassNodes with a traveling gold pulse.
 */
const LightBeam = ({ active, className, delay = 0 }: LightBeamProps) => {
  return (
    <div
      className={cn(
        "relative flex-1 h-px overflow-hidden",
        "bg-gradient-to-r from-transparent via-primary/30 to-transparent",
        className
      )}
    >
      {active && (
        <span
          className="absolute top-1/2 -translate-y-1/2 h-2 w-12 rounded-full blur-[6px] animate-light-beam"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(45 93% 60%), transparent)",
            animationDelay: `${delay}ms`,
          }}
        />
      )}
    </div>
  );
};

export default LightBeam;
