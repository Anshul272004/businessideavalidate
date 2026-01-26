import { motion } from "framer-motion";
import { FileText, Brain, CheckCircle, Sparkles } from "lucide-react";

const steps = [
  {
    icon: <FileText className="w-6 h-6" />,
    step: "01",
    title: "Describe Your Idea",
    description: "Tell us about your business concept, target audience, and pricing in under 2 minutes.",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    step: "02",
    title: "AI Deep Analysis",
    description: "Our psychology & neuroscience engine analyzes demand, friction, and buyer behavior.",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    step: "03",
    title: "Get Your Verdict",
    description: "Receive a brutally honest GO, PIVOT, or KILL with actionable next steps.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HowItWorks = () => {
  return (
    <section className="luxury-container py-24 border-t border-border/50">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Simple 3-Step Process
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          How it <span className="font-serif italic font-normal">works</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          From idea to clarity in under 5 minutes
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-3 gap-8 relative"
      >
        {/* Connection Line */}
        <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {steps.map((step, index) => (
          <motion.div key={index} variants={itemVariants} className="relative">
            <div className="group text-center">
              {/* Step Number */}
              <div className="relative mx-auto w-20 h-20 mb-8">
                <div className="absolute inset-0 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors rotate-6" />
                <div className="relative w-full h-full rounded-2xl bg-card border border-border group-hover:border-primary/50 flex items-center justify-center transition-all">
                  <span className="text-3xl font-bold gradient-text">{step.step}</span>
                </div>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 mx-auto mb-6 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HowItWorks;
