import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DeepResearchButtonProps {
  section: string;
  originalIdea: string;
  validationResult: any;
}

const sectionPrompts: Record<string, string> = {
  Market: "Provide a deep-dive market analysis: TAM/SAM/SOM breakdown, market growth rate, key trends shaping this space, emerging opportunities, and potential market disruptions. Be specific with data points.",
  Competitors: "Do a thorough competitive analysis: map all direct and indirect competitors, analyze their strengths/weaknesses, identify gaps in the market, and suggest specific competitive positioning strategies.",
  Pricing: "Analyze pricing strategy in depth: optimal pricing models, price elasticity considerations, competitive pricing benchmarks, freemium vs premium tradeoffs, and specific pricing experiments to run.",
  Regional: "Deep-dive into regional market dynamics: local regulatory landscape, cultural adoption patterns, payment infrastructure maturity, local competitor advantages, and market entry strategies specific to this region.",
  Execution: "Provide detailed execution analysis: critical path to MVP, team composition needed, technology stack considerations, partnerships to pursue, and a month-by-month resource allocation plan.",
};

const DeepResearchButton = ({ section, originalIdea, validationResult }: DeepResearchButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deepInsight, setDeepInsight] = useState("");

  const handleDeepResearch = async () => {
    if (deepInsight) {
      setIsExpanded(!isExpanded);
      return;
    }

    setIsExpanded(true);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("follow-up", {
        body: {
          question: sectionPrompts[section] || `Provide deeper analysis on the ${section} aspect of this idea.`,
          originalIdea,
          validationResult,
        },
      });

      if (error) throw error;
      setDeepInsight(data?.answer || "No additional insights available.");
    } catch (e: any) {
      toast.error(e.message || "Failed to generate deep research");
      setIsExpanded(false);
    }

    setIsLoading(false);
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleDeepResearch}
        className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
      >
        <Search className="w-3.5 h-3.5" />
        {deepInsight ? (isExpanded ? "Hide Deep Research" : "Show Deep Research") : "Go Deeper"}
        {deepInsight ? (
          isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
        ) : null}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
              {isLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating deep research...
                </div>
              ) : (
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {deepInsight}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeepResearchButton;
