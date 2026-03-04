import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Brain, Sparkles, ArrowRight, X } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";

const steps = [
  {
    icon: <Target className="w-10 h-10 text-primary" />,
    title: "Validate Before You Build",
    desc: "Stop guessing. Get an AI-powered GO, PIVOT, or KILL verdict before you invest time and money.",
  },
  {
    icon: <Brain className="w-10 h-10 text-primary" />,
    title: "8 AI Agents Analyze Everything",
    desc: "Market psychology, regional fit, unit economics, founder-market fit, execution risk, and cognitive biases — analyzed in 60 seconds.",
  },
  {
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    title: "Your First Analysis Is Free",
    desc: "Fill a 5-minute form. Get a boardroom-ready decision report. No credit card needed.",
  },
];

interface OnboardingOverlayProps {
  onComplete: () => void;
  onStartValidation: () => void;
}

const OnboardingOverlay = ({ onComplete, onStartValidation }: OnboardingOverlayProps) => {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < 2) setStep(step + 1);
    else {
      onComplete();
      onStartValidation();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-xl p-6"
    >
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="max-w-md w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8">
              {steps[step].icon}
            </div>
            <h2 className="text-2xl font-semibold mb-4">{steps[step].title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-10">{steps[step].desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === step ? "w-6 bg-primary" : i < step ? "bg-primary/50" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-3">
          <LuxuryButton onClick={next} size="lg" className="w-full group">
            {step < 2 ? "Next" : "Validate My First Idea — Free"}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </LuxuryButton>
          <button onClick={onComplete} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Skip
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingOverlay;
