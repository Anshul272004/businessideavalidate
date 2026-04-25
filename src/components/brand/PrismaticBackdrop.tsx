/**
 * PrismaticBackdrop — fixed, full-viewport ambient layer.
 * Pure CSS / SVG. Mounted once globally behind everything.
 *
 * Layers:
 *   1) Slow drifting gold + champagne light shafts
 *   2) Faint circuit-line traces (SVG)
 *   3) Soft particle drift (CSS-animated dots)
 *   4) Vignette to keep edges grounded
 */
const PrismaticBackdrop = () => {
  return (
    <div
      aria-hidden
      className="prismatic-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Drifting light shafts */}
      <div className="absolute -inset-[20%] opacity-60">
        <div className="prism-shaft prism-shaft--gold" />
        <div className="prism-shaft prism-shaft--champagne" />
        <div className="prism-shaft prism-shaft--cool" />
      </div>

      {/* Circuit-line traces */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="circuit-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(45 93% 47%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(45 93% 60%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(45 93% 47%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="url(#circuit-grad)" strokeWidth="0.5" fill="none">
          <path d="M0,140 L260,140 L300,180 L520,180 L560,140 L900,140" />
          <path d="M0,360 L180,360 L220,400 L600,400 L640,360 L1200,360" />
          <path d="M0,560 L320,560 L360,600 L740,600 L780,560 L1400,560" />
          <path d="M0,760 L240,760 L280,800 L640,800 L680,760 L1100,760" />
          <path d="M120,0 L120,120 L160,160 L160,420" />
          <path d="M880,0 L880,80 L920,120 L920,360" />
        </g>
      </svg>

      {/* Particle drift */}
      <div className="absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="prism-particle"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animationDelay: `${(i * 0.7) % 12}s`,
              animationDuration: `${14 + (i % 6) * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(240_10%_3%_/_0.85)_100%)]" />
    </div>
  );
};

export default PrismaticBackdrop;
