import { motion } from "framer-motion";
import { Award, Lightbulb, Brain, Rocket, Target, Zap, TrendingUp } from "lucide-react";

const ceoPatterns = [
  {
    name: "Bezos",
    company: "Amazon",
    pattern: "Regret Minimization Framework",
    quote: "Will you regret NOT trying this when you're 80?",
    icon: <Lightbulb className="w-5 h-5" />,
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "Musk",
    company: "Tesla/SpaceX",
    pattern: "First Principles Thinking",
    quote: "What are the fundamental truths, not assumptions?",
    icon: <Brain className="w-5 h-5" />,
    color: "from-red-500 to-orange-500",
  },
  {
    name: "Zuckerberg",
    company: "Meta",
    pattern: "Move Fast",
    quote: "Can you build and test this in 2 weeks?",
    icon: <Zap className="w-5 h-5" />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Thiel",
    company: "PayPal/Palantir",
    pattern: "Zero to One",
    quote: "Is this 10x better, or just 10% better?",
    icon: <Rocket className="w-5 h-5" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Hormozi",
    company: "Acquisition.com",
    pattern: "Value Equation",
    quote: "Dream outcome × Likelihood ÷ (Time × Effort)",
    icon: <Target className="w-5 h-5" />,
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "YC",
    company: "Y Combinator",
    pattern: "Pattern Matching",
    quote: "Does this match patterns of $1B+ companies?",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "from-primary to-amber-500",
  },
];

const CEOPatternSection = () => {
  return (
    <section className="luxury-container py-24 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
          <Award className="w-4 h-4" />
          From 1000+ Successful Founders
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Validate like the <span className="font-serif italic font-normal gradient-text">legends</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We've studied patterns from 1000+ successful CEOs and integrated their frameworks
          into our AI validation engine
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ceoPatterns.map((pattern, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="premium-card p-6 group"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pattern.color} flex items-center justify-center text-white mb-4`}>
              {pattern.icon}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg">{pattern.name}</h3>
              <span className="text-xs text-muted-foreground">• {pattern.company}</span>
            </div>
            <p className="text-sm font-medium text-primary mb-2">{pattern.pattern}</p>
            <p className="text-sm text-muted-foreground italic">"{pattern.quote}"</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-muted-foreground">
          All these frameworks are <span className="text-primary font-medium">automatically applied</span> to your idea validation
        </p>
      </motion.div>
    </section>
  );
};

export default CEOPatternSection;
