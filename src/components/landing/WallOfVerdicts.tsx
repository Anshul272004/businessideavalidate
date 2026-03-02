import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, RefreshCw, AlertTriangle } from "lucide-react";

const verdictData = [
  { type: "GO" as const, idea: "SaaS onboarding tool", region: "USA", score: 82 },
  { type: "PIVOT" as const, idea: "AI tutoring platform", region: "India", score: 56 },
  { type: "KILL" as const, idea: "Crypto social network", region: "UK", score: 23 },
  { type: "GO" as const, idea: "B2B analytics dashboard", region: "Germany", score: 78 },
  { type: "PIVOT" as const, idea: "Marketplace for designers", region: "Brazil", score: 51 },
  { type: "GO" as const, idea: "Fintech lending platform", region: "Nigeria", score: 74 },
  { type: "KILL" as const, idea: "AR fitness app", region: "Australia", score: 19 },
  { type: "PIVOT" as const, idea: "E-commerce aggregator", region: "UAE", score: 48 },
  { type: "GO" as const, idea: "Developer tools CLI", region: "Canada", score: 85 },
  { type: "PIVOT" as const, idea: "Healthtech scheduling", region: "Singapore", score: 61 },
  { type: "GO" as const, idea: "Proptech management", region: "Israel", score: 71 },
  { type: "KILL" as const, idea: "NFT marketplace v3", region: "Netherlands", score: 15 },
];

const verdictConfig = {
  GO: { icon: <CheckCircle2 className="w-3.5 h-3.5" />, color: "text-success", bg: "bg-success/10", border: "border-success/20" },
  PIVOT: { icon: <RefreshCw className="w-3.5 h-3.5" />, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  KILL: { icon: <AlertTriangle className="w-3.5 h-3.5" />, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
};

const WallOfVerdicts = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animFrame: number;
    let paused = false;

    const scroll = () => {
      if (!paused && el) {
        el.scrollLeft += 0.5;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animFrame = requestAnimationFrame(scroll);
    };

    const pause = () => { paused = true; };
    const resume = () => { paused = false; };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    animFrame = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animFrame);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  // Duplicate for seamless loop
  const items = [...verdictData, ...verdictData];

  return (
    <section className="py-12 border-t border-border/50 relative z-10 overflow-hidden">
      <div className="luxury-container mb-6">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">Recent Verdicts — Live</p>
      </div>
      <div ref={scrollRef} className="flex gap-3 overflow-x-hidden px-6 scrollbar-hide">
        {items.map((item, i) => {
          const config = verdictConfig[item.type];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl ${config.bg} border ${config.border} backdrop-blur-sm`}
            >
              <span className={config.color}>{config.icon}</span>
              <div className="whitespace-nowrap">
                <p className="text-xs font-medium text-foreground">{item.idea}</p>
                <p className="text-[10px] text-muted-foreground">{item.region} • {item.score}% confidence</p>
              </div>
              <span className={`text-xs font-bold ${config.color}`}>{item.type}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WallOfVerdicts;
