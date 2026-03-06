import { motion } from "framer-motion";
import { TrendingUp, Users, Wallet, CheckCircle2, Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FundingReadinessProps {
  validationResult: any;
}

const FundingReadiness = ({ validationResult }: FundingReadinessProps) => {
  const market = validationResult?.market_analysis;
  const unitEcon = validationResult?.unit_economics;
  const execution = validationResult?.execution_risks;
  const network = validationResult?.network_effects;
  const founderFit = validationResult?.founder_market_fit;
  const ceoPatterns = validationResult?.ceo_patterns;

  // Derive VC Readiness (0-100)
  const scalabilityScore = ceoPatterns?.scalability?.score || 5;
  const hasNetworkEffects = network?.has_network_effects ? 15 : 0;
  const marketSize = market?.tam_estimate?.includes("B") ? 25 : market?.tam_estimate?.includes("M") ? 15 : 5;
  const vcReadiness = Math.min(100, Math.round(scalabilityScore * 6 + hasNetworkEffects + marketSize));

  // Derive Angel Readiness (0-100)
  const techComplexity = execution?.tech_complexity === "low" ? 25 : execution?.tech_complexity === "medium" ? 15 : 5;
  const founderScore = founderFit?.score || 5;
  const angelReadiness = Math.min(100, Math.round(founderScore * 5 + techComplexity + 20));

  // Bootstrap Potential (0-100)
  const goodMargin = unitEcon?.sustainability === "excellent" ? 30 : unitEcon?.sustainability === "good" ? 20 : 10;
  const lowBurn = execution?.burn_rate_estimate?.includes("under") ? 20 : 10;
  const bootstrapPotential = Math.min(100, Math.round(goodMargin + lowBurn + 30));

  const scores = [
    { label: "VC Readiness", score: vcReadiness, icon: TrendingUp, color: "text-primary" },
    { label: "Angel Readiness", score: angelReadiness, icon: Users, color: "text-success" },
    { label: "Bootstrap Potential", score: bootstrapPotential, icon: Wallet, color: "text-amber-500" },
  ];

  // Investor checklist
  const checklist = [
    { label: "Clear problem-solution fit", met: (validationResult?.pain_realism?.score || 0) >= 6 },
    { label: "Large addressable market", met: !!market?.tam_estimate?.match(/\$\d+[BM]/) },
    { label: "Competitive moat identified", met: !!market?.competitive_advantage },
    { label: "Positive unit economics", met: unitEcon?.sustainability === "excellent" || unitEcon?.sustainability === "good" },
    { label: "Scalable distribution channels", met: (validationResult?.distribution_channels?.filter((d: any) => d.viability === "high")?.length || 0) >= 2 },
    { label: "Founder-market fit established", met: (founderFit?.score || 0) >= 7 },
  ];

  const metCount = checklist.filter(c => c.met).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="premium-card rounded-2xl p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary"><TrendingUp className="w-5 h-5" /></div>
        <h3 className="text-lg font-semibold">Funding Readiness</h3>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {scores.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-muted/30 border border-border"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-sm font-medium">{s.label}</span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-bold font-mono tabular-nums">{s.score}</span>
                <span className="text-sm text-muted-foreground mb-1">/100</span>
              </div>
              <Progress value={s.score} className="h-2" />
            </motion.div>
          );
        })}
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          Investor Checklist
          <span className="text-xs text-muted-foreground font-normal">({metCount}/{checklist.length} met)</span>
        </h4>
        <div className="space-y-2">
          {checklist.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              {item.met ? (
                <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
              )}
              <span className={item.met ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FundingReadiness;
