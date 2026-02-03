import { motion } from "framer-motion";
import { Brain, Shield, Target, TrendingUp, Clock, Users } from "lucide-react";

const badges = [
  {
    icon: <Brain className="w-5 h-5" />,
    title: "5 Analysis Agents",
    stat: "Parallel processing",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "100,000+ Patterns",
    stat: "Founder outcomes",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Confidential",
    stat: "Data purged after delivery",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "94% Accuracy",
    stat: "Pattern-matched verdicts",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Under 60 Seconds",
    stat: "Complete analysis",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "12,847 Evaluated",
    stat: "Founder decisions",
  },
];

const TrustBadges = () => {
  return (
    <section className="luxury-container py-16 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="p-4 rounded-xl bg-card border border-border text-center hover:border-primary/30 transition-colors"
          >
            <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              {badge.icon}
            </div>
            <p className="font-medium text-sm mb-0.5">{badge.title}</p>
            <p className="text-xs text-muted-foreground">{badge.stat}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TrustBadges;
