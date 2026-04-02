import { useRef } from "react";
import { motion } from "framer-motion";
import { BarChart3, Shield, Target, Sparkles, DollarSign, TrendingUp } from "lucide-react";

const features = [
  { icon: <Target className="w-6 h-6" />, title: "Market Validation", description: "AI-powered TAM/SAM analysis with real competitor mapping" },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Competitor Analysis", description: "Deep weakness mapping across your competitive landscape" },
  { icon: <Shield className="w-6 h-6" />, title: "Risk Score", description: "Multi-dimensional execution risk assessment" },
  { icon: <Sparkles className="w-6 h-6" />, title: "AI Suggestions", description: "Personalized pivot suggestions and action plans" },
  { icon: <DollarSign className="w-6 h-6" />, title: "Revenue Model", description: "Unit economics projection with pricing psychology" },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Startup Score", description: "Confidence score calibrated against 100K+ outcomes" },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `perspective(600px) rotateY(${x / 40}deg) rotateX(${-y / 40}deg) translateY(-2px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass rounded-2xl p-8 transition-all duration-280 hover:border-primary/25 group cursor-default"
        style={{ willChange: "transform" }}
      >
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary mb-5 group-hover:glow-subtle transition-all duration-280">
          {feature.icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed font-sans">{feature.description}</p>
      </div>
    </motion.div>
  );
};

const FeatureCards = () => {
  return (
    <section className="luxury-container py-28 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm text-primary mb-4 uppercase tracking-widest font-medium font-sans">Capabilities</p>
        <h2 className="text-heading font-bold mb-4">
          Intelligence <span className="gradient-text italic">you can trust</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto font-sans">
          Every analysis dimension calibrated against real-world founder outcomes
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <FeatureCard key={i} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;