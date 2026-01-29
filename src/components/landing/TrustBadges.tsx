import { motion } from "framer-motion";
import { Shield, Lock, Award, Clock, Brain, Zap } from "lucide-react";

const badges = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Multi-Agent AI",
    description: "4 specialized agents",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "100% Confidential",
    description: "Never stored or shared",
    gradient: "from-success/20 to-teal-500/20",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "5 Min Analysis",
    description: "Fast & comprehensive",
    gradient: "from-primary/20 to-amber-500/20",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Money-Back",
    description: "24-hour guarantee",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Bank-grade encryption",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-Time",
    description: "Instant results",
    gradient: "from-orange-500/20 to-red-500/20",
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
            className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 text-center"
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${badge.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {badge.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TrustBadges;