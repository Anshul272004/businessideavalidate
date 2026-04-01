import { motion } from "framer-motion";
import { Lightbulb, Brain, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Idea Input",
    description: "Describe your business concept, target market, and revenue model",
    detail: "5-minute structured input",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI Analysis",
    description: "Multi-agent system evaluates market, competitors, risks, and demand",
    detail: "8 specialized agents",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Validated Output",
    description: "Receive your startup score, action plan, and strategic recommendations",
    detail: "Complete blueprint",
  },
];

const AnimatedFlow = () => {
  return (
    <section className="luxury-container py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm text-primary mb-4 uppercase tracking-widest font-medium">How It Works</p>
        <h2 className="text-heading font-bold mb-4">
          From idea to <span className="gradient-text">validated strategy</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A clear, three-step transformation powered by specialized AI agents
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Connection line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2">
          <div className="h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          {/* Animated particle on line */}
          <motion.div
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/60 blur-sm"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group"
            >
              <div className="relative glass rounded-2xl p-8 text-center hover:border-primary/30 transition-all duration-300 hover-lift">
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                  Step {i + 1}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 group-hover:glow-box transition-all duration-300">
                  {step.icon}
                </div>

                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                <span className="text-xs text-primary font-medium">{step.detail}</span>
              </div>

              {/* Arrow between cards on mobile */}
              {i < 2 && (
                <div className="flex justify-center py-4 md:hidden">
                  <ArrowRight className="w-5 h-5 text-primary/40" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedFlow;
