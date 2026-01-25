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
  RefreshCw,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface ValidationResult {
  demand_psychology: string;
  pain_realism: { score: number; urgency: string };
  buying_friction: string[];
  pricing_psychology: { fair: boolean; suggested: string; reason: string };
  neuroscience: { value_triggers: string[]; risk: string; trust_difficulty: string };
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
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "GO",
      description: "Strong fundamentals. Build it.",
    },
    PIVOT: {
      containerClass: "verdict-pivot",
      icon: <RefreshCw className="w-8 h-8" />,
      title: "PIVOT",
      description: "Promising, but needs adjustment.",
    },
    KILL: {
      containerClass: "verdict-kill",
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "KILL",
      description: "Not viable. Move on.",
    },
  };

  const v = verdictConfig[result.verdict];
  const painColor =
    result.pain_realism.score >= 8 ? "bg-success" :
    result.pain_realism.score >= 5 ? "bg-primary" : "bg-destructive";

  return (
    <div className="min-h-screen bg-background print:py-8">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none print:hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="luxury-container py-8 relative z-10 print:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold">Validator</span>
        </div>
      </nav>

      <div className="luxury-container pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Verdict Hero */}
          <div className="text-center mb-16 animate-fade-up">
            <div className={`inline-flex flex-col items-center gap-4 px-12 py-10 rounded-3xl ${v.containerClass}`}>
              {v.icon}
              <div>
                <h1 className="text-5xl font-bold mb-2">{v.title}</h1>
                <p className="text-lg opacity-80">{v.description}</p>
              </div>
            </div>
          </div>

          {/* Result Cards */}
          <div className="space-y-6 animate-fade-up-delay">
            {/* Demand Psychology */}
            <ResultCard icon={<Brain className="w-5 h-5" />} title="Demand Psychology">
              <p className="text-muted-foreground leading-relaxed">
                {result.demand_psychology}
              </p>
            </ResultCard>

            {/* Pain Score */}
            <ResultCard icon={<Target className="w-5 h-5" />} title="Pain Reality Score">
              <div className="flex items-center gap-6 mb-4">
                <span className="text-5xl font-bold">{result.pain_realism.score}</span>
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
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${painColor} transition-all duration-700`} style={{ width: `${result.pain_realism.score * 10}%` }} />
              </div>
            </ResultCard>

            {/* Buying Friction */}
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

            {/* Pricing */}
            <ResultCard icon={<DollarSign className="w-5 h-5" />} title="Pricing Psychology">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">{result.pricing_psychology.suggested}</span>
                <span className="text-sm text-muted-foreground">recommended</span>
              </div>
              <p className="text-muted-foreground">{result.pricing_psychology.reason}</p>
            </ResultCard>

            {/* Neuroscience */}
            <ResultCard icon={<Zap className="w-5 h-5" />} title="Neuroscience Analysis">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Value Triggers</p>
                  <div className="flex flex-wrap gap-2">
                    {result.neuroscience.value_triggers.map((trigger, i) => (
                      <span key={i} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {trigger}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Perceived Risk</p>
                    <p className="font-semibold capitalize">{result.neuroscience.risk}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Trust Building</p>
                    <p className="font-semibold capitalize">{result.neuroscience.trust_difficulty}</p>
                  </div>
                </div>
              </div>
            </ResultCard>

            {/* Immediate Plan */}
            <ResultCard icon={<ArrowRight className="w-5 h-5" />} title="Your Next Steps">
              <ol className="space-y-4">
                {result.immediate_plan.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      {i + 1}
                    </div>
                    <span className="text-muted-foreground pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </ResultCard>
          </div>

          {/* Actions */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 print:hidden">
            <LuxuryButton onClick={handleDownloadPDF} variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </LuxuryButton>
            <LuxuryButton onClick={handleNewValidation} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Validate Another
            </LuxuryButton>
          </div>

          {/* Disclaimer */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground/60 italic text-center">
              This is decision support, not financial, legal, or medical advice.
            </p>
          </div>
        </div>
      </div>
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
