import { useRef } from "react";
import { motion } from "framer-motion";
import { Target, Users, ShieldAlert, Sparkles, DollarSign, TrendingUp } from "lucide-react";

const features = [
  { icon: <Target className="w-6 h-6" />, title: "Market Validation", description: "TAM/SAM/SOM sizing with demand forecasting and trend analysis" },
  { icon: <Users className="w-6 h-6" />, title: "Competitor Analysis", description: "Auto-discover competitors, compare features, find your edge" },
  { icon: <ShieldAlert className="w-6 h-6" />, title: "Risk Score", description: "Technical, legal, market, and financial risk quantification" },
  { icon: <Sparkles className="w-6 h-6" />, title: "AI Suggestions", description: "Actionable improvements to increase your success probability" },
  { icon: <DollarSign className="w-6 h-6" />, title: "Revenue Model", description: "Unit economics, pricing strategy, and CAC/LTV projections" },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Startup Score", description: "Overall viability score with detailed breakdown and benchmarks" },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-2px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass rounded-2xl p-6 h-full hover:border-primary/30 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_0_30px_-10px_hsl(220_90%_60%/0.2)] cursor-default"
        style={{ transition: "transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s" }}
      >
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
          {feature.icon}
        </div>
        <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
};

const FeatureCards = () => {
  return (
    <section className="luxury-container py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm text-primary mb-4 uppercase tracking-widest font-medium">Features</p>
        <h2 className="text-heading font-bold mb-4">
          Everything you need to <span className="gradient-text">decide with confidence</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Six dimensions of analysis, powered by specialized AI agents
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {features.map((feature, i) => (
          <FeatureCard key={i} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
