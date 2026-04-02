import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, ShieldCheck, AlertTriangle, Lightbulb } from "lucide-react";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setValue(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return <span ref={ref}>{value}{suffix}</span>;
};

const ProgressBar = ({ label, value, color }: { label: string; value: number; color: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-sm font-sans">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
};

const MockResult = () => {
  return (
    <section className="luxury-container py-28 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm text-primary mb-4 uppercase tracking-widest font-medium font-sans">Sample Output</p>
        <h2 className="text-heading font-bold mb-4">
          Your <span className="gradient-text italic">AI-powered results</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto font-sans">
          See what a validated business report looks like
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto glass rounded-2xl p-10 md:p-12"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-8 border-b border-border/50">
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-sans">AI Resume Builder for Students</p>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-success/15 text-success text-sm font-semibold border border-success/30 font-sans">
                GO
              </span>
              <span className="text-muted-foreground text-sm font-sans">Strong market opportunity detected</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary text-glow font-serif">
              <AnimatedCounter target={78} suffix="%" />
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-sans">Success Probability</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2 font-sans">
              <TrendingUp className="w-4 h-4 text-primary" /> Strengths
            </h4>
            <ProgressBar label="Market Demand" value={85} color="bg-primary" />
            <ProgressBar label="Revenue Potential" value={72} color="bg-primary" />
            <ProgressBar label="Innovation Score" value={68} color="bg-champagne" />
          </div>

          <div className="space-y-5">
            <div className="glass rounded-xl p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1 font-sans">Low Competition Risk</p>
                  <p className="text-xs text-muted-foreground font-sans">Only 3 direct competitors identified in this niche</p>
                </div>
              </div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1 font-sans">Technical Complexity: Medium</p>
                  <p className="text-xs text-muted-foreground font-sans">ATS parsing requires NLP expertise — consider partnering</p>
                </div>
              </div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1 font-sans">Key Suggestion</p>
                  <p className="text-xs text-muted-foreground font-sans">Start with university partnerships for early traction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MockResult;