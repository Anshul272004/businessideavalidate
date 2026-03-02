import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Users, Zap } from "lucide-react";

const useAnimatedCounter = (target: number, duration: number = 2000, inView: boolean = false) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return count;
};

const LiveCounterStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const ideas = useAnimatedCounter(12847, 2500, inView);
  const activeNow = useAnimatedCounter(14, 1500, inView);
  const thisWeek = useAnimatedCounter(347, 2000, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="luxury-container py-8 relative z-10"
    >
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono tabular-nums text-foreground">
              {ideas.toLocaleString()}+
            </p>
            <p className="text-xs text-muted-foreground">Ideas validated</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-success" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold font-mono tabular-nums text-foreground">{activeNow}</p>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Founders active now</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-ice/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-ice" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono tabular-nums text-foreground">{thisWeek}</p>
            <p className="text-xs text-muted-foreground">Validated this week</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveCounterStrip;
