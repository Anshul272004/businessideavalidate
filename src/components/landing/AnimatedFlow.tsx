import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Lightbulb, Brain, BarChart3, Target, Crown } from "lucide-react";
import GlassNode from "@/components/brand/GlassNode";
import LightBeam from "@/components/brand/LightBeam";

const nodes = [
  { label: "IDEA", icon: <Lightbulb className="w-6 h-6" /> },
  { label: "DEMAND", icon: <Target className="w-6 h-6" /> },
  { label: "PAIN", icon: <Brain className="w-6 h-6" /> },
  { label: "MARKET", icon: <BarChart3 className="w-6 h-6" /> },
  { label: "VERDICT", icon: <Crown className="w-6 h-6" /> },
];

const AnimatedFlow = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    setActiveIndex(0);
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % (nodes.length + 1));
    }, 1100);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section ref={ref} className="luxury-container py-28 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <p className="ui-label text-primary/80 mb-4">THE&nbsp;FLOW</p>
        <h2 className="editorial-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] mb-5">
          FROM&nbsp;<span className="gold-sheen">SIGNAL</span>&nbsp;TO&nbsp;VERDICT
        </h2>
        <p className="editorial-italic text-lg text-muted-foreground max-w-xl mx-auto">
          Five glass chambers. One continuous current of intelligence.
        </p>
      </motion.div>

      {/* Desktop flow */}
      <div className="hidden md:flex items-center justify-between max-w-5xl mx-auto px-4 relative">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center flex-shrink-0">
            <GlassNode
              label={node.label}
              icon={node.icon}
              index={i + 1}
              active={activeIndex === i}
            />
            {i < nodes.length - 1 && (
              <LightBeam
                className="w-16 lg:w-24 mx-2"
                active={activeIndex === i}
                delay={300}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile flow — vertical */}
      <div className="md:hidden flex flex-col items-center gap-4 max-w-xs mx-auto">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex flex-col items-center">
            <GlassNode
              label={node.label}
              icon={node.icon}
              index={i + 1}
              active={activeIndex === i}
            />
            {i < nodes.length - 1 && (
              <div className="h-12 w-px bg-gradient-to-b from-primary/40 to-transparent my-2" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnimatedFlow;
