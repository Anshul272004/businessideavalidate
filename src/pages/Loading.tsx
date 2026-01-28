import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  DollarSign, 
  Shield, 
  CheckCircle2,
  Lock,
  Zap
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Multi-Agent Analysis Stages
const analysisAgents = [
  {
    name: "Dopamine Detective",
    icon: <Brain className="w-6 h-6" />,
    description: "Analyzing demand psychology & buying motivation",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/20",
    textColor: "text-purple-400",
  },
  {
    name: "Money Trail",
    icon: <DollarSign className="w-6 h-6" />,
    description: "Mapping market size & competitor weaknesses",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/20",
    textColor: "text-emerald-400",
  },
  {
    name: "Amygdala Audit",
    icon: <Shield className="w-6 h-6" />,
    description: "Evaluating risk factors & trust barriers",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/20",
    textColor: "text-orange-400",
  },
  {
    name: "Verdict Synthesizer",
    icon: <Zap className="w-6 h-6" />,
    description: "Compiling brutally honest assessment",
    color: "from-primary to-amber-500",
    bgColor: "bg-primary/20",
    textColor: "text-primary",
  },
];

const insights = [
  "89% of startups fail because they solve the wrong problem",
  "The best ideas address daily, recurring pain points",
  "Price anchoring can increase conversions by 300%",
  "Trust takes 7+ positive interactions to build",
  "Loss aversion is 2x stronger than gain motivation",
  "Social proof increases purchase intent by 63%",
  "The Mom Test: Would strangers pay before seeing it?",
  "Painkiller products outsell vitamins 10:1",
];

const Loading = () => {
  const navigate = useNavigate();
  const [currentAgent, setCurrentAgent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);
  const [completedAgents, setCompletedAgents] = useState<number[]>([]);

  useEffect(() => {
    const formDataStr = sessionStorage.getItem("validationData");
    if (!formDataStr) {
      navigate("/");
      return;
    }

    const formData = JSON.parse(formDataStr);

    // Agent progression (3 parallel + 1 synthesis = ~15 seconds total)
    const agentTimings = [0, 4000, 8000, 12000]; // When each agent "completes"
    
    agentTimings.forEach((time, index) => {
      setTimeout(() => {
        setCurrentAgent(index);
        if (index > 0) {
          setCompletedAgents(prev => [...prev, index - 1]);
        }
      }, time);
    });

    // Mark all complete near the end
    setTimeout(() => {
      setCompletedAgents([0, 1, 2, 3]);
    }, 14000);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90;
        return prev + 0.6;
      });
    }, 100);

    // Insight rotation
    const insightInterval = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % insights.length);
    }, 3500);

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
        setCompletedAgents([0, 1, 2, 3]);
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

      <div className="luxury-container text-center relative z-10 max-w-3xl mx-auto px-4">
        {/* Main Brain Animation */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-10"
        >
          <div className="w-28 h-28 mx-auto relative">
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
            <div className="relative w-28 h-28 rounded-full bg-card border border-primary/50 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain className="w-12 h-12 text-primary" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Multi-Agent Status */}
        <div className="mb-10">
          <p className="text-sm text-muted-foreground mb-4">Multi-Agent Analysis in Progress</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {analysisAgents.map((agent, index) => {
              const isActive = currentAgent === index;
              const isComplete = completedAgents.includes(index);
              
              return (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-4 rounded-xl border transition-all duration-300 ${
                    isComplete 
                      ? "bg-success/10 border-success/30" 
                      : isActive 
                      ? `${agent.bgColor} border-primary/30` 
                      : "bg-card border-border"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && !isComplete && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${agent.color} opacity-10`}
                    />
                  )}
                  
                  <div className="relative">
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                      isComplete ? "bg-success/20 text-success" : `${agent.bgColor} ${agent.textColor}`
                    }`}>
                      {isComplete ? <CheckCircle2 className="w-5 h-5" /> : agent.icon}
                    </div>
                    <p className={`text-xs font-medium ${isComplete ? "text-success" : isActive ? agent.textColor : "text-muted-foreground"}`}>
                      {agent.name}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Current Agent Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAgent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8"
          >
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border ${analysisAgents[currentAgent]?.bgColor} border-primary/20`}>
              <span className={analysisAgents[currentAgent]?.textColor}>
                {analysisAgents[currentAgent]?.icon}
              </span>
              <span className="font-medium text-sm">{analysisAgents[currentAgent]?.description}</span>
            </div>
          </motion.div>
        </AnimatePresence>

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
            className="max-w-md mx-auto p-5 bg-card/50 border border-border/50 rounded-xl"
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
          className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <Lock className="w-3 h-3" />
          Your idea is 100% confidential
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
