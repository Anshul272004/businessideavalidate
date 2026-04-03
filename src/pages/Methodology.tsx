import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowLeft, ArrowRight, Brain, Target, Shield, Scale, TrendingUp, Users, Globe, Fingerprint, BarChart3 } from "lucide-react";

const frameworks = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Dopamine Detective",
    description: "Analyzes emotional drivers and buying urgency. Identifies whether your solution triggers genuine desire or manufactured interest.",
    factors: ["The Mom Test application", "Pain frequency analysis", "Emotional vs rational purchase patterns"],
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Money Trail",
    description: "Maps market dynamics, competitor weaknesses, and unit economics. Determines if the numbers work before you write code.",
    factors: ["TAM/SAM/SOM calculation", "Competitor weakness mapping", "LTV:CAC modeling"],
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Amygdala Audit",
    description: "Identifies trust barriers and execution risks. Surfaces the objections customers will have before they voice them.",
    factors: ["Buying friction analysis", "Switching cost reality", "Regulatory considerations"],
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "CEO Pattern Matcher",
    description: "Compares your profile against 100,000+ founder outcomes. Determines if founders like you have succeeded with ideas like this.",
    factors: ["Founder archetype classification", "Historical pattern matching", "Anti-pattern detection"],
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "USP Generator",
    description: "Creates personalized positioning based on your unique background. Builds a narrative only you can credibly tell.",
    factors: ["Credibility anchor identification", "Story framework creation", "Differentiation matrix"],
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Regional Market Analyst",
    description: "Evaluates geographic and cultural factors. Analyzes local market psychology, payment landscapes, and infrastructure dependencies.",
    factors: ["Cultural fit scoring", "Local competitor mapping", "Infrastructure risk assessment"],
  },
  {
    icon: <Fingerprint className="w-6 h-6" />,
    title: "Cognitive Bias Analyst",
    description: "Detects founder and customer biases that distort validation. Adjusts the verdict for human delusion and blind spots.",
    factors: ["Confirmation bias detection", "Dunning-Kruger assessment", "Reality score calibration"],
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Macro Environment Analyst",
    description: "Evaluates global macroeconomic and geopolitical factors. Assesses recession resilience, inflation sensitivity, and supply chain risks.",
    factors: ["Economic climate analysis", "Geopolitical exposure assessment", "Black swan preparedness"],
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "Verdict Synthesizer",
    description: "Weighs all factors against your specific situation. Delivers a GO, PIVOT, or KILL with supporting evidence.",
    factors: ["Weighted scoring by founder goal", "Probability breakdown", "What Must Be True analysis"],
  },
];

const principles = [
  {
    title: "Founder-specific, not generic",
    description: "Your background, capital, and time constraints fundamentally change what ideas are viable for you. We account for this.",
  },
  {
    title: "Evidence over opinion",
    description: "Every verdict is supported by pattern matching against real outcomes. We show our work.",
  },
  {
    title: "Brutal honesty over comfort",
    description: "A hard truth now saves a harder lesson later. We tell you what you need to hear, not what you want to hear.",
  },
  {
    title: "Actionable over theoretical",
    description: "Every analysis ends with specific next steps tailored to your situation and resources.",
  },
];

const Methodology = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="luxury-container py-8 relative z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <LuxuryButton onClick={() => navigate("/input")} size="sm">
            Evaluate Decision
          </LuxuryButton>
        </div>
      </nav>

      <div className="luxury-container py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">How It Works</p>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6">
            The <span className="font-serif italic font-normal gradient-text">methodology</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A decision framework, not an opinion generator. Built on pattern recognition from 
            100,000+ founder outcomes and applied psychology research.
          </p>
        </motion.div>

        {/* Principles */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-sm text-muted-foreground mb-8 uppercase tracking-wide">Core Principles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((principle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="font-semibold mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Analysis Agents */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-sm text-muted-foreground mb-8 uppercase tracking-wide">The Nine Analysis Agents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks.map((framework, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {framework.icon}
                </div>
                <h3 className="font-semibold mb-2">{framework.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{framework.description}</p>
                <ul className="space-y-1">
                  {framework.factors.map((factor, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Different */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24 p-8 rounded-xl bg-card border border-border"
        >
          <h2 className="text-xl font-semibold mb-6">Why this is different</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Most idea validators ask generic questions and return generic answers. 
              They treat a first-time founder with no capital the same as a serial entrepreneur with $500K.
            </p>
            <p>
              We start with your reality: your background, your resources, your constraints, your goals. 
              Then we match your specific situation against patterns from founders who were in similar positions.
            </p>
            <p>
              The result is not "this is a good idea" but rather "this is a viable idea for someone with 
              your profile, capital, and timeline—or it isn't."
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <LuxuryButton onClick={() => navigate("/input")} size="lg" className="group">
            Evaluate Your Decision
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </LuxuryButton>
        </motion.div>
      </div>
    </div>
  );
};

export default Methodology;
