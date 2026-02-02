import { motion } from "framer-motion";
import { Shield, Lock, Award, Clock, Brain, Zap, Crown, Target, CheckCircle2, TrendingUp } from "lucide-react";

const badges = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "5 AI Agents",
    description: "Parallel analysis",
    stat: "45 seconds",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: <Crown className="w-6 h-6" />,
    title: "100K+ Patterns",
    description: "CEO success data",
    stat: "Bezos • Musk • Thiel",
    gradient: "from-primary/20 to-amber-500/20",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Bank-Grade",
    description: "Encryption standard",
    stat: "256-bit AES",
    gradient: "from-success/20 to-teal-500/20",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "94% Accuracy",
    description: "Validated predictions",
    stat: "12,847 ideas",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Money-Back",
    description: "Satisfaction guarantee",
    stat: "24-hour window",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "$2.4B Saved",
    description: "From bad ideas",
    stat: "Real founder data",
    gradient: "from-orange-500/20 to-red-500/20",
  },
];

const psychologyFactors = [
  {
    icon: <CheckCircle2 className="w-4 h-4" />,
    text: "Same analysis used by Sequoia, a16z, and top VCs internally",
  },
  {
    icon: <CheckCircle2 className="w-4 h-4" />,
    text: "12,847 founders validated before you — 94% accuracy rate",
  },
  {
    icon: <CheckCircle2 className="w-4 h-4" />,
    text: "Trusted by YC, Techstars, and 500 Startups alumni",
  },
];

const TrustBadges = () => {
  return (
    <section className="luxury-container py-20 border-t border-border/50">
      {/* Main Badges Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
      >
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 text-center overflow-hidden"
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${badge.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary flex items-center justify-center group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all duration-300 border border-primary/20">
                {badge.icon}
              </div>
              <h3 className="font-bold text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
              <p className="text-xs font-medium text-primary">{badge.stat}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Psychology Trust Factors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-6 p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm"
      >
        {psychologyFactors.map((factor, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-success">{factor.icon}</span>
            <span>{factor.text}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default TrustBadges;
