import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { 
  Download, 
  Brain, 
  Target, 
  AlertTriangle, 
  DollarSign, 
  Zap,
  ArrowRight,
  RefreshCw
} from "lucide-react";

interface ValidationResult {
  demand_psychology: string;
  pain_realism: {
    score: number;
    urgency: string;
  };
  buying_friction: string[];
  pricing_psychology: {
    fair: boolean;
    suggested: string;
    reason: string;
  };
  neuroscience: {
    value_triggers: string[];
    risk: string;
    trust_difficulty: string;
  };
  verdict: "GO" | "PIVOT" | "KILL";
  immediate_plan: string[];
}

const Result = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<ValidationResult | null>(null);

  useEffect(() => {
    const storedResult = sessionStorage.getItem("validationResult");
    if (!storedResult) {
      navigate("/");
      return;
    }
    setResult(JSON.parse(storedResult));
  }, [navigate]);

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleNewValidation = () => {
    sessionStorage.removeItem("validationData");
    sessionStorage.removeItem("validationResult");
    navigate("/input?paid=true");
  };

  if (!result) return null;

  const getVerdictStyles = () => {
    switch (result.verdict) {
      case "GO":
        return {
          containerClass: "verdict-go",
          label: "GO",
          description: "Build it. The fundamentals are strong.",
        };
      case "PIVOT":
        return {
          containerClass: "verdict-pivot",
          label: "PIVOT",
          description: "Promising, but needs adjustment.",
        };
      case "KILL":
        return {
          containerClass: "verdict-kill",
          label: "KILL",
          description: "Not worth pursuing in current form.",
        };
    }
  };

  const verdictInfo = getVerdictStyles();
  const painScoreColor = 
    result.pain_realism.score >= 8 ? "bg-success" :
    result.pain_realism.score >= 5 ? "bg-warning" : "bg-destructive";

  return (
    <div className="min-h-screen bg-background py-12 md:py-20 print:py-8">
      <div className="max-w-3xl mx-auto px-6">
        {/* Verdict Badge */}
        <div className="mb-16 fade-in">
          <div
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl text-2xl font-semibold ${verdictInfo.containerClass}`}
          >
            {verdictInfo.label}
          </div>
          <p className="text-xl text-muted-foreground mt-4">
            {verdictInfo.description}
          </p>
        </div>

        {/* Result Cards */}
        <div className="space-y-8 slide-up">
          {/* Demand Psychology */}
          <ResultCard
            icon={<Brain className="w-5 h-5" />}
            title="Demand Psychology"
          >
            <p className="text-muted-foreground leading-relaxed">
              {result.demand_psychology}
            </p>
          </ResultCard>

          {/* Pain Realism Score */}
          <ResultCard
            icon={<Target className="w-5 h-5" />}
            title="Customer Pain Reality"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-semibold text-foreground">
                {result.pain_realism.score}/10
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  result.pain_realism.urgency === "high"
                    ? "bg-success/10 text-success"
                    : result.pain_realism.urgency === "medium"
                    ? "bg-warning/10 text-warning"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {result.pain_realism.urgency} urgency
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${painScoreColor} transition-all duration-500`}
                style={{ width: `${result.pain_realism.score * 10}%` }}
              />
            </div>
          </ResultCard>

          {/* Buying Friction */}
          <ResultCard
            icon={<AlertTriangle className="w-5 h-5" />}
            title="Cognitive Friction in Buying"
          >
            <ul className="space-y-3">
              {result.buying_friction.map((friction, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                  {friction}
                </li>
              ))}
            </ul>
          </ResultCard>

          {/* Pricing Psychology */}
          <ResultCard
            icon={<DollarSign className="w-5 h-5" />}
            title="Pricing Psychology"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold text-primary">
                  {result.pricing_psychology.suggested}
                </span>
                <span className="text-sm text-muted-foreground">
                  recommended range
                </span>
              </div>
              <p className="text-muted-foreground">
                {result.pricing_psychology.reason}
              </p>
            </div>
          </ResultCard>

          {/* Neuroscience Analysis */}
          <ResultCard
            icon={<Zap className="w-5 h-5" />}
            title="Neuroscience Analysis"
          >
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground/70 mb-2">
                  Value Triggers
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.neuroscience.value_triggers.map((trigger, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary rounded-full text-sm text-foreground"
                    >
                      {trigger}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-sm text-muted-foreground/70 mb-1">
                    Perceived Risk
                  </p>
                  <p className="capitalize text-foreground">
                    {result.neuroscience.risk}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground/70 mb-1">
                    Trust Building
                  </p>
                  <p className="capitalize text-foreground">
                    {result.neuroscience.trust_difficulty}
                  </p>
                </div>
              </div>
            </div>
          </ResultCard>

          {/* Immediate Plan */}
          <ResultCard
            icon={<ArrowRight className="w-5 h-5" />}
            title="Your Immediate Plan"
          >
            <ol className="space-y-3">
              {result.immediate_plan.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="text-primary font-medium">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </ResultCard>
        </div>

        {/* Actions */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 print:hidden">
          <LuxuryButton onClick={handleDownloadPDF} variant="secondary">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </LuxuryButton>
          <LuxuryButton onClick={handleNewValidation} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Validate Another Idea
          </LuxuryButton>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground/50 italic">
            This is decision support, not financial, legal, or medical advice.
            Use at your own discretion.
          </p>
        </div>
      </div>
    </div>
  );
};

// Result Card Component
interface ResultCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const ResultCard = ({ icon, title, children }: ResultCardProps) => (
  <div className="bg-card border border-border/50 rounded-xl p-6 md:p-8">
    <div className="flex items-center gap-3 mb-6">
      <div className="text-primary">{icon}</div>
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
    </div>
    {children}
  </div>
);

export default Result;
