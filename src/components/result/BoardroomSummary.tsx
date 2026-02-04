import { motion } from "framer-motion";
import { Briefcase, TrendingUp, TrendingDown, AlertTriangle, Target, CheckCircle2 } from "lucide-react";

interface BoardroomSummaryProps {
  verdict: "GO" | "PIVOT" | "KILL";
  confidence_score: number;
  executive_bullets?: string[];
  key_metrics?: {
    label: string;
    value: string;
    trend?: "up" | "down" | "neutral";
  }[];
  risk_opportunity_balance?: {
    opportunities: string[];
    risks: string[];
  };
  bottom_line?: string;
}

const BoardroomSummary = ({
  verdict,
  confidence_score,
  executive_bullets = [],
  key_metrics = [],
  risk_opportunity_balance,
  bottom_line,
}: BoardroomSummaryProps) => {
  const verdictColors = {
    GO: "from-success/20 to-success/5 border-success/30",
    PIVOT: "from-primary/20 to-primary/5 border-primary/30",
    KILL: "from-destructive/20 to-destructive/5 border-destructive/30",
  };

  const verdictTextColors = {
    GO: "text-success",
    PIVOT: "text-primary",
    KILL: "text-destructive",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`premium-card p-8 bg-gradient-to-br ${verdictColors[verdict]} border`}
    >
      {/* Header - McKinsey Style */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-card/80 flex items-center justify-center shadow-sm">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Executive Summary</h2>
            <p className="text-sm text-muted-foreground">Boardroom-ready decision brief</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-4xl font-bold ${verdictTextColors[verdict]}`}>
            {verdict}
          </div>
          <p className="text-sm text-muted-foreground">
            {confidence_score}% confidence
          </p>
        </div>
      </div>

      {/* Key Metrics Strip */}
      {key_metrics.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {key_metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              className="p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                {metric.trend === "up" && <TrendingUp className="w-3 h-3 text-success" />}
                {metric.trend === "down" && <TrendingDown className="w-3 h-3 text-destructive" />}
                <span className="text-lg font-bold">{metric.value}</span>
              </div>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Executive Bullets - The Core 5 */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Key Findings
        </h3>
        <div className="space-y-3">
          {executive_bullets.slice(0, 5).map((bullet, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">{i + 1}</span>
              </div>
              <p className="text-foreground leading-relaxed">{bullet}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Risk / Opportunity Balance */}
      {risk_opportunity_balance && (
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Opportunities */}
          <div className="p-4 rounded-xl bg-success/5 border border-success/20">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-success">Opportunities</span>
            </div>
            <ul className="space-y-2">
              {risk_opportunity_balance.opportunities.map((opp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Target className="w-3 h-3 text-success mt-1 flex-shrink-0" />
                  {opp}
                </li>
              ))}
            </ul>
          </div>

          {/* Risks */}
          <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">Risks</span>
            </div>
            <ul className="space-y-2">
              {risk_opportunity_balance.risks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="w-3 h-3 text-destructive mt-1 flex-shrink-0" />
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Bottom Line */}
      {bottom_line && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-5 rounded-xl bg-card/80 border border-border"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Bottom Line</p>
          <p className="text-lg font-medium leading-relaxed">{bottom_line}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BoardroomSummary;
