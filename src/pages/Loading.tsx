import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  Search, 
  Target, 
  DollarSign, 
  Zap, 
  CheckCircle2,
  Lock
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const analysisStages = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Scanning Patterns",
    description: "Analyzing market signals and behavioral data",
    duration: 2000,
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Psychology Deep-Dive",
    description: "Evaluating cognitive triggers and pain points",
    duration: 2500,
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Demand Analysis",
    description: "Measuring problem urgency and market need",
    duration: 2000,
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Pricing Psychology",
    description: "Calculating optimal price perception",
    duration: 2000,
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Neuroscience Layer",
    description: "Identifying value triggers and trust factors",
    duration: 2000,
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Generating Verdict",
    description: "Compiling brutally honest assessment",
    duration: 1500,
  },
];

const insights = [
  "89% of startups fail because they solve the wrong problem",
  "The best ideas address daily, recurring pain points",
  "Price anchoring can increase conversions by 300%",
  "Trust takes 7+ positive interactions to build",
  "Loss aversion is 2x stronger than gain motivation",
  "Social proof increases purchase intent by 63%",
];

const Loading = () => {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  useEffect(() => {
    const formDataStr = sessionStorage.getItem("validationData");
    if (!formDataStr) {
      navigate("/");
      return;
    }

    const formData = JSON.parse(formDataStr);

    // Stage progression
    let stageTimeout: NodeJS.Timeout;
    let cumulativeTime = 0;
    
    analysisStages.forEach((stage, index) => {
      setTimeout(() => {
        setCurrentStage(index);
        if (index > 0) {
          setCompletedStages(prev => [...prev, index - 1]);
        }
      }, cumulativeTime);
      cumulativeTime += stage.duration;
    });

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90;
        return prev + 0.8;
      });
    }, 100);

    // Insight rotation
    const insightInterval = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % insights.length);
    }, 4000);

    // API call
    const validateIdea = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("validate-idea", {
          body: {
            idea: formData.idea,
            targetCustomer: formData.targetCustomer,
            price: formData.price,
            experience: formData.experience,
            platform: formData.platform,
            stage: formData.stage,
          },
        });

        if (error) throw error;

        setProgress(100);
        setCompletedStages([0, 1, 2, 3, 4, 5]);
        sessionStorage.setItem("validationResult", JSON.stringify(data));
        
        setTimeout(() => navigate("/result"), 800);
      } catch (error: any) {
        console.error("Validation error:", error);
        
        if (error.message?.includes("429")) {
          toast.error("Rate limit exceeded. Please try again in a moment.");
        } else if (error.message?.includes("402")) {
          toast.error("AI credits exhausted.");
        } else {
          toast.error("Failed to analyze. Please try again.");
        }
        
        setTimeout(() => navigate("/input?paid=true"), 2000);
      }
    };

    validateIdea();

    return () => {
      clearInterval(progressInterval);
      clearInterval(insightInterval);
      clearTimeout(stageTimeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" 
        />
      </div>

      <div className="luxury-container text-center relative z-10 max-w-2xl mx-auto">
        {/* Main Brain Animation */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-12"
        >
          <div className="w-32 h-32 mx-auto relative">
            {/* Pulsing rings */}
            <motion.div 
              animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-primary" 
            />
            <motion.div 
              animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 rounded-full border border-primary" 
            />
            
            {/* Main icon */}
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/30 to-transparent"
            />
            <div className="relative w-32 h-32 rounded-full bg-card border border-primary/50 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain className="w-14 h-14 text-primary" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Current Stage Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-full mb-4">
              <span className="text-primary">{analysisStages[currentStage]?.icon}</span>
              <span className="font-semibold">{analysisStages[currentStage]?.title}</span>
            </div>
            <p className="text-muted-foreground">
              {analysisStages[currentStage]?.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Stage Progress Indicators */}
        <div className="flex justify-center gap-2 mb-12">
          {analysisStages.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                completedStages.includes(index)
                  ? "w-8 bg-success"
                  : currentStage === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Main Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="h-2 bg-card rounded-full overflow-hidden border border-border">
            <motion.div
              className="h-full gradient-bar"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex items-center justify-between mt-3 text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Analyzing...
            </span>
            <span className="font-mono text-primary">{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Insight Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={insightIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto p-6 bg-card/50 border border-border/50 rounded-xl"
          >
            <p className="text-sm text-muted-foreground">
              💡 <span className="text-foreground">{insights[insightIndex]}</span>
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <Lock className="w-3 h-3" />
          Your idea is 100% confidential
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
