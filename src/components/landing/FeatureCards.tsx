import { motion } from "framer-motion";
import { BarChart3, Shield, Target, Sparkles, DollarSign, TrendingUp } from "lucide-react";
import GlassPanel from "@/components/brand/GlassPanel";

const features = [
  { icon: <Target className="w-5 h-5" />, title: "Market Validation", description: "AI-powered TAM/SAM analysis with real competitor mapping" },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Competitor Analysis", description: "Deep weakness mapping across your competitive landscape" },
  { icon: <Shield className="w-5 h-5" />, title: "Risk Score", description: "Multi-dimensional execution risk assessment" },
  { icon: <Sparkles className="w-5 h-5" />, title: "AI Suggestions", description: "Personalized pivot suggestions and action plans" },
  { icon: <DollarSign className="w-5 h-5" />, title: "Revenue Model", description: "Unit economics projection with pricing psychology" },
  { icon: <TrendingUp className="w-5 h-5" />, title: "Startup Score", description: "Confidence score calibrated against 100K+ outcomes" },
];

const FeatureCards = () => {
  return (
    <section className="luxury-container py-28 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <p className="ui-label text-primary/80 mb-4">CAPABILITIES</p>
        <h2 className="editorial-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] mb-5">
          INTELLIGENCE&nbsp;<span className="gold-sheen">YOU&nbsp;CAN&nbsp;TRUST</span>
        </h2>
        <p className="editorial-italic text-lg text-muted-foreground max-w-xl mx-auto">
          Every dimension calibrated against real-world founder outcomes.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassPanel padding="md" tilt tiltStrength={50}>
              {/* Prismatic top sliver */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

              <div className="w-11 h-11 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-center text-primary mb-5">
                {feature.icon}
              </div>
              <h3 className="editorial-display text-base text-foreground mb-2 tracking-[0.1em]">
                {feature.title.toUpperCase()}
              </h3>
              <p className="editorial-italic text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
