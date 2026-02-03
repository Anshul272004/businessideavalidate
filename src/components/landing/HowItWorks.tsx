import { motion } from "framer-motion";
import { FileText, Brain, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <FileText className="w-5 h-5" />,
    step: "01",
    title: "Describe your situation",
    description: "Your idea, background, resources, and goals. We need the full picture to give you an accurate verdict.",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    step: "02",
    title: "Pattern-matched analysis",
    description: "Five specialized agents analyze your situation against 100,000+ founder outcomes in parallel.",
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    step: "03",
    title: "Receive your verdict",
    description: "A GO, PIVOT, or KILL with supporting evidence, probability breakdown, and personalized action steps.",
  },
];

const HowItWorks = () => {
  return (
    <section className="luxury-container py-20 border-t border-border/50">
      <div className="text-center mb-16">
        <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">The Process</p>
        <h2 className="text-3xl md:text-5xl font-semibold mb-4">
          How it <span className="font-serif italic font-normal gradient-text">works</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          From uncertainty to clarity in under five minutes
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
            className="text-center"
          >
            <div className="relative mx-auto w-16 h-16 mb-6">
              <div className="absolute inset-0 rounded-xl bg-primary/5 rotate-3" />
              <div className="relative w-full h-full rounded-xl bg-card border border-border flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary">{step.step}</span>
              </div>
            </div>
            <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HowItWorks;
