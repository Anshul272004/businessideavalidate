import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const loadingMessages = [
  "Scanning behavioral patterns...",
  "Analyzing market psychology...",
  "Evaluating buying friction...",
  "Mapping cognitive triggers...",
  "Processing neuroscience signals...",
  "Generating honest assessment...",
];

const Loading = () => {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const formDataStr = sessionStorage.getItem("validationData");
    if (!formDataStr) {
      navigate("/");
      return;
    }

    const formData = JSON.parse(formDataStr);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90;
        return prev + 1;
      });
    }, 150);

    const validateIdea = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("validate-idea", {
          body: {
            idea: formData.idea,
            targetCustomer: formData.targetCustomer,
            price: formData.price,
            experience: formData.experience,
          },
        });

        if (error) throw error;

        setProgress(100);
        sessionStorage.setItem("validationResult", JSON.stringify(data));
        
        setTimeout(() => navigate("/result"), 500);
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
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="luxury-container text-center relative z-10">
        {/* Animated Icon */}
        <div className="relative mb-16">
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-4 rounded-full bg-primary/30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
            <div className="relative w-32 h-32 rounded-full bg-card border border-primary/50 flex items-center justify-center animate-pulse-glow">
              <Brain className="w-14 h-14 text-primary" />
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="h-8 mb-8">
          <p className="text-xl text-muted-foreground animate-fade-up" key={messageIndex}>
            {loadingMessages[messageIndex]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-sm mx-auto">
          <div className="h-1.5 bg-card rounded-full overflow-hidden border border-border">
            <div
              className="h-full gradient-bar transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>{progress}% complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
