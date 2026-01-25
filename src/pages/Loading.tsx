import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const loadingMessages = [
  "Scanning human behavior patterns...",
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

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);

    // Progress bar (slower now for real AI call)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90; // Cap at 90 until complete
        return prev + 1;
      });
    }, 150);

    // Call the AI validation function
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

        if (error) {
          throw error;
        }

        setProgress(100);
        sessionStorage.setItem("validationResult", JSON.stringify(data));
        
        // Small delay for visual feedback
        setTimeout(() => {
          navigate("/result");
        }, 500);
      } catch (error: any) {
        console.error("Validation error:", error);
        
        if (error.message?.includes("429") || error.message?.includes("Rate limit")) {
          toast.error("Rate limit exceeded. Please try again in a moment.");
        } else if (error.message?.includes("402") || error.message?.includes("credits")) {
          toast.error("AI credits exhausted. Please add credits to continue.");
        } else {
          toast.error("Failed to analyze your idea. Please try again.");
        }
        
        setTimeout(() => {
          navigate("/input?paid=true");
        }, 2000);
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
      <div className="luxury-container text-center">
        {/* Brain Animation */}
        <div className="relative mb-12">
          <div className="w-24 h-24 mx-auto relative">
            <Brain className="w-24 h-24 text-primary animate-pulse" />
            <div className="absolute inset-0 rounded-full animate-pulse-ring bg-primary/20" />
          </div>
        </div>

        {/* Loading Message */}
        <p className="text-xl text-muted-foreground mb-8 h-8 transition-opacity duration-300 fade-in">
          {loadingMessages[messageIndex]}
        </p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground/50 mt-4">
            {progress}% complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
