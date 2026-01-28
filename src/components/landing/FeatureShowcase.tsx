import { motion } from "framer-motion";
import { 
  Brain, 
  Search, 
  DollarSign, 
  Users, 
  Zap, 
  Shield,
  MessageSquare,
  TrendingUp,
  Target,
  FlaskConical,
  BarChart3,
  Lock
} from "lucide-react";

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Multi-Agent AI Analysis",
    description: "4 specialized AI agents analyze your idea in parallel: Dopamine Detective, Money Trail, Amygdala Audit, and Verdict Synthesizer.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: <FlaskConical className="w-6 h-6" />,
    title: "The Mom Test Applied",
    description: "We apply The Mom Test principles to determine if strangers would actually pay before seeing your product built.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Competitor Weakness Mapping",
    description: "Identify exploitable weaknesses in your top 5 competitors and discover your unfair advantage.",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Market Sizing (TAM)",
    description: "Get realistic Total Addressable Market estimates with reasoning, not inflated vanity numbers.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Painkiller vs Vitamin",
    description: "Know if you're solving a 'bleeding neck' problem or a nice-to-have before you build.",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Neuroscience Triggers",
    description: "Understand the dopamine, oxytocin, and cortisol triggers that drive buying behavior.",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Objection Handling",
    description: "Get a script of common objections and exactly how to counter them in sales conversations.",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Risk Assessment",
    description: "Identify dealbreakers, regulatory concerns, and trust barriers before they become expensive lessons.",
    gradient: "from-amber-500/20 to-yellow-500/20",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Market Timing Analysis",
    description: "Understand if the market timing is right, risky, or optimal for your idea.",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Follow-Up AI Chat",
    description: "Ask unlimited follow-up questions about your results with context-aware AI assistance.",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "5-Day Action Plan",
    description: "Leave with specific day-by-day actions to validate or improve your idea immediately.",
    gradient: "from-yellow-500/20 to-amber-500/20",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "100% Confidential",
    description: "Your ideas are never stored, shared, or used for training. Complete privacy guaranteed.",
    gradient: "from-slate-500/20 to-gray-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const FeatureShowcase = () => {
  return (
    <section className="luxury-container py-24 border-t border-border/50">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
        >
          <Zap className="w-4 h-4" />
          12 Powerful Features
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Everything you need to
          <span className="font-serif italic font-normal"> validate</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          More than a simple AI analysis - a complete validation toolkit
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeatureShowcase;
