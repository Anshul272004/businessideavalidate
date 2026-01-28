import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import {
  Download,
  Brain,
  Target,
  AlertTriangle,
  DollarSign,
  ArrowRight,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Clock,
} from "lucide-react";

import ConfidenceMeter from "@/components/result/ConfidenceMeter";
import MarketAnalysis from "@/components/result/MarketAnalysis";
import FollowUpChat from "@/components/result/FollowUpChat";
import ShareButtons from "@/components/result/ShareButtons";
import PainTypeIndicator from "@/components/result/PainTypeIndicator";
import NeurosciencePanel from "@/components/result/NeurosciencePanel";
import ResearchTrail from "@/components/result/ResearchTrail";
import ObjectionHandler from "@/components/result/ObjectionHandler";
import CompetitorChart from "@/components/result/CompetitorChart";
import MultiAgentBadge from "@/components/result/MultiAgentBadge";

interface ValidationResult {
  demand_psychology: string;
  pain_realism: { 
    score: number; 
    urgency: string;
    type?: "painkiller" | "vitamin";
    frequency?: "daily" | "weekly" | "monthly" | "rarely";
  };
  mom_test_pass?: boolean;
  market_analysis?: {
    tam_estimate: string;
    tam_reasoning?: string;
    competitors: { name: string; weakness: string; market_share?: string; pricing?: string }[];
    competitive_advantage: string;
    market_timing?: "good" | "moderate" | "risky";
    timing_reason?: string;
  };
  buying_friction: string[];
  trust_barriers?: string[];
  objection_handling?: { objection: string; counter: string }[];
  regulatory_concerns?: string[] | null;
  pricing_psychology: { 
    fair: boolean; 
    suggested: string; 
    reason: string;
    anchor_strategy?: string;
  };
  neuroscience: { 
    value_triggers?: string[];
    dopamine_triggers?: string[];
    oxytocin_factors?: string[];
    cortisol_urgency?: string[];
    risk: string; 
    trust_difficulty: string;
  };
  confidence_score?: number;
  verdict: "GO" | "PIVOT" | "KILL";
  verdict_reasoning?: string;
  immediate_plan: string[];
  pivot_suggestions?: string[];
  key_assumptions?: string[];
  dealbreakers?: string[];
  unfair_advantages_needed?: string[];
  analysis_agents?: string[];
}

const Result = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [originalIdea, setOriginalIdea] = useState("");

  useEffect(() => {
    const storedResult = sessionStorage.getItem("validationResult");
    const storedData = sessionStorage.getItem("validationData");
    
    if (!storedResult) {
      navigate("/");
      return;
    }
    setResult(JSON.parse(storedResult));
    
    if (storedData) {
      const data = JSON.parse(storedData);
      setOriginalIdea(data.idea || "");
    }
  }, [navigate]);

  const handleDownloadPDF = () => window.print();

  const handleNewValidation = () => {
    sessionStorage.removeItem("validationData");
    sessionStorage.removeItem("validationResult");
    navigate("/input?paid=true");
  };

  if (!result) return null;

  const verdictConfig = {
    GO: {
      containerClass: "verdict-go",
      icon: <CheckCircle2 className="w-10 h-10" />,
      title: "GO",
      description: "Strong fundamentals. Build it.",
    },
    PIVOT: {
      containerClass: "verdict-pivot",
      icon: <RefreshCw className="w-10 h-10" />,
      title: "PIVOT",
      description: "Promising, but needs adjustment.",
    },
    KILL: {
      containerClass: "verdict-kill",
      icon: <AlertTriangle className="w-10 h-10" />,
      title: "KILL",
      description: "Not viable. Move on.",
    },
  };

  const v = verdictConfig[result.verdict];
  const painColor =
    result.pain_realism.score >= 8 ? "bg-success" :
    result.pain_realism.score >= 5 ? "bg-primary" : "bg-destructive";

  const confidenceScore = result.confidence_score || 
    (result.verdict === "GO" ? 75 : result.verdict === "PIVOT" ? 50 : 25);

  return (
    <div className="min-h-screen bg-background print:py-8">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none print:hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-success/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="luxury-container py-8 relative z-10 print:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">Validator</span>
          </div>
          <ShareButtons verdict={result.verdict} confidenceScore={confidenceScore} />
        </div>
      </nav>

      <div className="luxury-container pb-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Multi-Agent Badge */}
          <MultiAgentBadge agents={result.analysis_agents} />

          {/* Verdict Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className={`inline-flex flex-col items-center gap-4 px-16 py-12 rounded-3xl ${v.containerClass}`}>
              {v.icon}
              <div>
                <h1 className="text-6xl font-bold mb-2">{v.title}</h1>
                <p className="text-lg opacity-80">{v.description}</p>
              </div>
            </div>
            {result.verdict_reasoning && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-muted-foreground max-w-xl mx-auto"
              >
                {result.verdict_reasoning}
              </motion.p>
            )}
          </motion.div>

          {/* Confidence Meter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <ConfidenceMeter score={confidenceScore} />
          </motion.div>

          {/* Result Cards */}
          <div className="space-y-6">
            {/* Demand Psychology */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <ResultCard icon={<Brain className="w-5 h-5" />} title="Demand Psychology">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {result.demand_psychology}
                </p>
                {(result.pain_realism.type || result.pain_realism.frequency) && (
                  <PainTypeIndicator 
                    type={result.pain_realism.type || "vitamin"} 
                    frequency={result.pain_realism.frequency || "monthly"} 
                  />
                )}
              </ResultCard>
            </motion.div>

            {/* Pain Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ResultCard icon={<Target className="w-5 h-5" />} title="Pain Reality Score">
                <div className="flex items-center gap-6 mb-4">
                  <span className="text-6xl font-bold">{result.pain_realism.score}</span>
                  <div>
                    <p className="text-sm text-muted-foreground">out of 10</p>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      result.pain_realism.urgency === "high" ? "bg-success/20 text-success" :
                      result.pain_realism.urgency === "medium" ? "bg-primary/20 text-primary" :
                      "bg-destructive/20 text-destructive"
                    }`}>
                      {result.pain_realism.urgency} urgency
                    </span>
                  </div>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.pain_realism.score * 10}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${painColor}`} 
                  />
                </div>
              </ResultCard>
            </motion.div>

            {/* Research Trail (Mom Test, Assumptions, Dealbreakers) */}
            {(result.key_assumptions?.length || result.dealbreakers?.length || result.mom_test_pass !== undefined) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
              >
                <ResearchTrail
                  keyAssumptions={result.key_assumptions || []}
                  dealbreakers={result.dealbreakers || []}
                  unfairAdvantages={result.unfair_advantages_needed || []}
                  momTestPass={result.mom_test_pass ?? false}
                />
              </motion.div>
            )}

            {/* Market Analysis */}
            {result.market_analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <MarketAnalysis 
                  tam_estimate={result.market_analysis.tam_estimate}
                  competitors={result.market_analysis.competitors}
                  competitive_advantage={result.market_analysis.competitive_advantage}
                />
              </motion.div>
            )}

            {/* Competitor Chart */}
            {result.market_analysis?.competitors && result.market_analysis.competitors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.27 }}
              >
                <CompetitorChart
                  competitors={result.market_analysis.competitors}
                  yourEdge={result.market_analysis.competitive_advantage}
                />
              </motion.div>
            )}

            {/* Market Timing */}
            {result.market_analysis?.market_timing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
              >
                <ResultCard icon={<Clock className="w-5 h-5" />} title="Market Timing">
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-xl text-sm font-medium capitalize ${
                      result.market_analysis.market_timing === "good" 
                        ? "bg-success/20 text-success" 
                        : result.market_analysis.market_timing === "moderate"
                        ? "bg-primary/20 text-primary"
                        : "bg-destructive/20 text-destructive"
                    }`}>
                      {result.market_analysis.market_timing} timing
                    </div>
                    {result.market_analysis.timing_reason && (
                      <p className="text-sm text-muted-foreground">{result.market_analysis.timing_reason}</p>
                    )}
                  </div>
                </ResultCard>
              </motion.div>
            )}

            {/* Buying Friction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ResultCard icon={<AlertTriangle className="w-5 h-5" />} title="Buying Friction">
                <ul className="space-y-3">
                  {result.buying_friction.map((friction, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold">{i + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{friction}</span>
                    </li>
                  ))}
                </ul>
              </ResultCard>
            </motion.div>

            {/* Objection Handling */}
            {result.objection_handling && result.objection_handling.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
              >
                <ObjectionHandler objections={result.objection_handling} />
              </motion.div>
            )}

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <ResultCard icon={<DollarSign className="w-5 h-5" />} title="Pricing Psychology">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-4xl font-bold text-primary">{result.pricing_psychology.suggested}</span>
                  <span className="text-sm text-muted-foreground">recommended</span>
                </div>
                <p className="text-muted-foreground mb-4">{result.pricing_psychology.reason}</p>
                {result.pricing_psychology.anchor_strategy && (
                  <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                    <p className="text-sm font-medium text-primary mb-1">💡 Anchoring Strategy</p>
                    <p className="text-sm text-muted-foreground">{result.pricing_psychology.anchor_strategy}</p>
                  </div>
                )}
              </ResultCard>
            </motion.div>

            {/* Neuroscience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <NeurosciencePanel 
                dopamine_triggers={result.neuroscience.dopamine_triggers || result.neuroscience.value_triggers || []}
                oxytocin_factors={result.neuroscience.oxytocin_factors || []}
                cortisol_urgency={result.neuroscience.cortisol_urgency || []}
                risk={result.neuroscience.risk}
                trust_difficulty={result.neuroscience.trust_difficulty}
              />
            </motion.div>

            {/* Pivot Suggestions */}
            {result.verdict === "PIVOT" && result.pivot_suggestions && result.pivot_suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <ResultCard icon={<Lightbulb className="w-5 h-5" />} title="Pivot Suggestions">
                  <ul className="space-y-3">
                    {result.pivot_suggestions.map((suggestion, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">{i + 1}</span>
                        </div>
                        <span className="text-muted-foreground">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </ResultCard>
              </motion.div>
            )}

            {/* Immediate Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ResultCard icon={<ArrowRight className="w-5 h-5" />} title="Your Action Plan">
                <ol className="space-y-4">
                  {result.immediate_plan.map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                        {i + 1}
                      </div>
                      <span className="text-muted-foreground pt-2">{step}</span>
                    </li>
                  ))}
                </ol>
              </ResultCard>
            </motion.div>
          </div>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 print:hidden"
          >
            <LuxuryButton onClick={handleDownloadPDF} variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </LuxuryButton>
            <LuxuryButton onClick={handleNewValidation} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Validate Another
            </LuxuryButton>
          </motion.div>

          {/* Disclaimer */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground/60 italic text-center">
              This is decision support, not financial, legal, or medical advice. Always validate with real customers.
            </p>
          </div>
        </div>
      </div>

      {/* Follow-up Chat */}
      <FollowUpChat originalIdea={originalIdea} validationResult={result} />
    </div>
  );
};

const ResultCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-2xl p-8">
    <div className="flex items-center gap-3 mb-6">
      <div className="text-primary">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    {children}
  </div>
);

export default Result;
