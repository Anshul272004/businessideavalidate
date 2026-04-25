import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, ShieldCheck, AlertTriangle, Lightbulb, Activity, Target } from "lucide-react";
import GlassPanel from "@/components/brand/GlassPanel";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return <span ref={ref}>{value}{suffix}</span>;
};

const Bar = ({ label, value, delay }: { label: string; value: number; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-[11px]">
        <span className="text-muted-foreground tracking-wider uppercase">{label}</span>
        <span className="text-primary tabular-nums">{value}%</span>
      </div>
      <div className="h-1 rounded-full bg-primary/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-primary via-champagne to-primary"
          style={{ boxShadow: "0 0 12px hsl(45 93% 47% / 0.6)" }}
        />
      </div>
    </div>
  );
};

const MockResult = () => {
  return (
    <section className="luxury-container py-32 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <p className="ui-label text-primary/80 mb-4">SAMPLE&nbsp;DOSSIER</p>
        <h2 className="editorial-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] mb-5">
          THE&nbsp;<span className="gold-sheen">VERDICT</span>
        </h2>
        <p className="editorial-italic text-lg text-muted-foreground max-w-xl mx-auto">
          A boardroom-grade dossier — every signal made tangible.
        </p>
      </motion.div>

      {/* 3D-perspective stage */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-5xl mx-auto h-[640px] md:h-[560px]"
        style={{ perspective: "1800px" }}
      >
        {/* Background card — risk matrix */}
        <div
          className="absolute hidden md:block top-0 left-0 w-[55%]"
          style={{ transform: "rotateY(14deg) rotateX(-4deg) translateZ(-40px)" }}
        >
          <GlassPanel padding="md" float className="">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="ui-label-sm text-muted-foreground">RISK&nbsp;MATRIX</span>
              </div>
              <span className="text-[10px] text-muted-foreground tabular-nums">04 / 09</span>
            </div>

            <div className="space-y-4">
              {[
                { icon: ShieldCheck, tone: "success", title: "Low Competition", desc: "3 direct competitors detected" },
                { icon: AlertTriangle, tone: "warning", title: "Tech Complexity", desc: "NLP partner recommended" },
                { icon: Lightbulb, tone: "primary", title: "Wedge", desc: "Begin with university partnerships" },
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-primary/10 bg-background/40">
                  <r.icon className={`w-4 h-4 mt-0.5 ${r.tone === "success" ? "text-success" : r.tone === "warning" ? "text-warning" : "text-primary"}`} />
                  <div>
                    <p className="text-sm text-foreground/90">{r.title}</p>
                    <p className="text-[11px] text-muted-foreground">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        {/* Right card — market signal chart */}
        <div
          className="absolute hidden md:block top-12 right-0 w-[50%]"
          style={{ transform: "rotateY(-14deg) rotateX(-4deg) translateZ(-20px)" }}
        >
          <GlassPanel padding="md" float>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="ui-label-sm text-muted-foreground">MARKET&nbsp;SIGNAL</span>
              </div>
              <span className="text-[10px] text-success">↑&nbsp;+24%</span>
            </div>

            {/* Mini sparkline */}
            <svg viewBox="0 0 200 70" className="w-full h-20 mb-5">
              <defs>
                <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(45 93% 47%)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(45 93% 47%)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,55 L20,48 L40,52 L60,40 L80,42 L100,30 L120,32 L140,22 L160,18 L180,12 L200,8 L200,70 L0,70 Z"
                fill="url(#sparkfill)"
              />
              <path
                d="M0,55 L20,48 L40,52 L60,40 L80,42 L100,30 L120,32 L140,22 L160,18 L180,12 L200,8"
                fill="none"
                stroke="hsl(45 93% 47%)"
                strokeWidth="1.5"
              />
            </svg>

            <div className="space-y-3">
              <Bar label="Demand" value={85} delay={0.1} />
              <Bar label="Revenue" value={72} delay={0.25} />
              <Bar label="Innovation" value={68} delay={0.4} />
            </div>
          </GlassPanel>
        </div>

        {/* Center card — main verdict */}
        <div
          className="md:absolute md:top-24 md:left-1/2 md:-translate-x-1/2 md:w-[58%] z-10"
          style={{ transform: "translateZ(60px)" }}
        >
          <GlassPanel padding="lg" className="relative">
            {/* Prismatic top edge */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="flex items-start justify-between mb-8 pb-6 border-b border-primary/10">
              <div className="space-y-2">
                <p className="ui-label-sm text-muted-foreground">CHAPTER&nbsp;01&nbsp;·&nbsp;THE&nbsp;VERDICT</p>
                <p className="editorial-italic text-lg text-foreground">AI Resume Builder for Students</p>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-success/40 bg-success/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <span className="ui-label-sm text-success">PROCEED</span>
                </span>
              </div>
              <div className="text-right">
                <div className="editorial-display text-5xl md:text-6xl gold-sheen tabular-nums leading-none">
                  <AnimatedCounter target={78} />
                </div>
                <p className="ui-label-sm text-muted-foreground mt-2">CONFIDENCE</p>
              </div>
            </div>

            <div className="space-y-3">
              <Bar label="Market Demand" value={85} delay={0} />
              <Bar label="Revenue Potential" value={72} delay={0.15} />
              <Bar label="Founder Fit" value={81} delay={0.3} />
              <Bar label="Macro Tailwind" value={66} delay={0.45} />
            </div>

            <div className="mt-6 pt-6 border-t border-primary/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <span className="ui-label-sm text-muted-foreground">9&nbsp;AGENTS&nbsp;CONSULTED</span>
              </div>
              <span className="ui-label-sm text-primary/80">VIEW&nbsp;FULL&nbsp;DOSSIER&nbsp;→</span>
            </div>
          </GlassPanel>
        </div>

        {/* Mobile fallback: stack cards */}
        <div className="md:hidden space-y-4 pt-4">
          {/* The desktop layout's center card is already visible; render side cards stacked */}
        </div>
      </motion.div>
    </section>
  );
};

export default MockResult;
