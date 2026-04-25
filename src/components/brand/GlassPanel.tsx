import { useRef, ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Enable mouse-tracked 3D tilt on hover. Defaults to true. */
  tilt?: boolean;
  /** Tilt sensitivity (lower = stronger). Defaults to 40. */
  tiltStrength?: number;
  /** Add a subtle gentle bobbing float loop. */
  float?: boolean;
  /** Show prismatic edge highlight. Defaults to true. */
  prismatic?: boolean;
  /** Inner padding token. */
  padding?: "sm" | "md" | "lg" | "none";
}

/**
 * GlassPanel — translucent obsidian glass surface with prismatic edge,
 * gold inner hairline, and optional mouse-tracked 3D tilt.
 *
 * Use anywhere a card/panel should feel like the reference glass UI.
 */
const GlassPanel = ({
  children,
  className,
  tilt = true,
  tiltStrength = 40,
  float = false,
  prismatic = true,
  padding = "md",
  style,
  ...rest
}: GlassPanelProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.setProperty("--tilt-x", `${-y / tiltStrength}deg`);
    ref.current.style.setProperty("--tilt-y", `${x / tiltStrength}deg`);
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--tilt-x", "0deg");
    ref.current.style.setProperty("--tilt-y", "0deg");
  };

  const padClass =
    padding === "none"
      ? ""
      : padding === "sm"
      ? "p-4"
      : padding === "lg"
      ? "p-8 md:p-10"
      : "p-6 md:p-8";

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "glass-panel relative rounded-2xl",
        prismatic && "prismatic-edge",
        float && "animate-glass-float",
        padClass,
        className
      )}
      style={{
        transform: tilt
          ? "perspective(1200px) rotateX(var(--tilt-x,0deg)) rotateY(var(--tilt-y,0deg))"
          : undefined,
        transformStyle: "preserve-3d",
        transition: "transform 350ms cubic-bezier(0.16,1,0.3,1)",
        ...style,
      }}
      {...rest}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassPanel;
