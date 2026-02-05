import { motion } from "framer-motion";
import { FileText, Brain, CheckCircle, Zap, Shield, Target } from "lucide-react";

const steps = [
  {
    icon: <FileText className="w-6 h-6" />,
    step: "01",
    title: "Describe your situation",
    description: "Your idea, background, resources, and goals. We need the full picture to give you an accurate verdict.",
    time: "5 minutes",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    step: "02",
    title: "We analyze everything",
    description: "7 specialized AI agents analyze psychology, regional risk, execution feasibility, and market dynamics in parallel.",
    time: "2 minutes",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    step: "03",
    title: "Receive your verdict",
    description: "A clear GO, PIVOT, or KILL with supporting evidence, probability breakdown, and personalized action steps.",
    time: "Instant",
  },
];

const HowItWorks = () => {
  return (
    <section className="luxury-container py-24 border-t border-border/50">
      <div className="text-center mb-16">
        <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">The Process</p>
        <h2 className="text-heading font-semibold mb-4">
          How ValidateFirst <span className="font-serif italic font-normal gradient-text">works</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          From uncertainty to clarity in under 10 minutes. Structured. Disciplined. Evidence-based.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
          >
            {/* Step number badge */}
            <div className="absolute -top-4 left-8 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              Step {step.step}
            </div>
            
            <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 mt-2">
              {step.icon}
            </div>
            
            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">{step.description}</p>
            
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">{step.time}</span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border" />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Trust elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <span>Your data is encrypted</span>
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          <span>No generic AI responses</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span>Results in under 10 minutes</span>
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
