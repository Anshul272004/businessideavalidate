import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const analysisSteps = [
  "Analyzing market opportunity...",
  "Scanning competitor landscape...",
  "Evaluating demand signals...",
  "Calculating risk factors...",
  "Generating startup score...",
];

const InteractiveInput = () => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [demoText, setDemoText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const fullText = "AI-powered resume builder for students...";

  useEffect(() => {
    if (!isFocused) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDemoText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsAnalyzing(true), 400);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isFocused]);

  useEffect(() => {
    if (!isAnalyzing) return;
    if (currentStep >= analysisSteps.length) return;
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), 800);
    return () => clearTimeout(timer);
  }, [isAnalyzing, currentStep]);

  return (
    <section className="luxury-container py-28 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <p className="text-sm text-primary mb-4 uppercase tracking-widest font-medium font-sans">Try It Now</p>
        <h2 className="text-heading font-bold mb-4">
          Describe your <span className="gradient-text italic">business idea</span>
        </h2>
        <p className="text-muted-foreground mb-12 font-sans">
          Watch our AI analyze your concept in real-time
        </p>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative glass rounded-2xl p-1 cursor-pointer"
          onClick={() => {
            if (!isFocused) setIsFocused(true);
            else navigate("/input");
          }}
        >
          <div className="flex items-center gap-4 px-6 py-5 rounded-xl bg-card/80">
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="flex-1 text-left font-sans">
              {!isFocused ? (
                <span className="text-muted-foreground/50">Enter your business idea...</span>
              ) : (
                <span className="text-foreground">{demoText}<span className="inline-block w-0.5 h-5 bg-primary animate-pulse ml-0.5 align-text-bottom" /></span>
              )}
            </div>
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium font-sans flex items-center gap-1.5 hover:bg-primary/90 transition-colors haptic-click">
              Analyze
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="px-6 pb-5 overflow-hidden"
              >
                <div className="pt-4 border-t border-border/50 space-y-2">
                  {analysisSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={i <= currentStep ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.05 }}
                      className={`flex items-center gap-2 text-sm font-sans ${i < currentStep ? "text-success" : i === currentStep ? "text-primary" : "text-muted-foreground/30"}`}
                    >
                      {i < currentStep ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : i === currentStep ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-border" />
                      )}
                      {step}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default InteractiveInput;