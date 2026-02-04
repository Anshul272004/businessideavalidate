import { motion } from "framer-motion";
import { Heart, Wallet, MessageSquare, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface CulturalFitProps {
  trust_culture_alignment?: number;
  payment_preference_match?: number;
  communication_style_fit?: number;
  local_market_timing?: "perfect" | "good" | "moderate" | "early" | "late";
  cultural_insights?: string[];
  buying_behavior?: string;
  trust_signals_needed?: string[];
}

const CulturalFit = ({
  trust_culture_alignment = 7,
  payment_preference_match = 8,
  communication_style_fit = 6,
  local_market_timing = "good",
  cultural_insights = [],
  buying_behavior,
  trust_signals_needed = [],
}: CulturalFitProps) => {
  const overallScore = Math.round((trust_culture_alignment + payment_preference_match + communication_style_fit) / 3);
  
  const getScoreIcon = (score: number) => {
    if (score >= 7) return <CheckCircle2 className="w-4 h-4 text-success" />;
    if (score >= 5) return <AlertCircle className="w-4 h-4 text-warning" />;
    return <XCircle className="w-4 h-4 text-destructive" />;
  };

  const getTimingColor = (timing: string) => {
    switch (timing) {
      case "perfect": return "bg-success/10 text-success border-success/20";
      case "good": return "bg-primary/10 text-primary border-primary/20";
      case "moderate": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const metrics = [
    { 
      icon: <Heart className="w-5 h-5" />, 
      label: "Trust Culture Alignment", 
      score: trust_culture_alignment,
      desc: "How well your approach matches local trust-building norms"
    },
    { 
      icon: <Wallet className="w-5 h-5" />, 
      label: "Payment Preference Match", 
      score: payment_preference_match,
      desc: "Compatibility with local payment habits and preferences"
    },
    { 
      icon: <MessageSquare className="w-5 h-5" />, 
      label: "Communication Style Fit", 
      score: communication_style_fit,
      desc: "How your messaging resonates with local audiences"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Cultural Fit Indicator</h3>
            <p className="text-sm text-muted-foreground">Market-culture compatibility analysis</p>
          </div>
        </div>

        {/* Overall Score */}
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-lg border ${getTimingColor(local_market_timing)}`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium capitalize">{local_market_timing} Timing</span>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${
              overallScore >= 7 ? "text-success" : 
              overallScore >= 5 ? "text-primary" : "text-destructive"
            }`}>
              {overallScore}/10
            </div>
            <p className="text-xs text-muted-foreground">Overall Fit</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="p-4 rounded-xl bg-muted/30 border border-border"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                {metric.icon}
              </div>
              {getScoreIcon(metric.score)}
            </div>
            <p className="font-medium text-sm mb-1">{metric.label}</p>
            <p className="text-xs text-muted-foreground mb-3">{metric.desc}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.score * 10}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  className={`h-full ${
                    metric.score >= 7 ? "bg-success" :
                    metric.score >= 5 ? "bg-primary" : "bg-destructive"
                  }`}
                />
              </div>
              <span className="text-sm font-semibold">{metric.score}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Buying Behavior */}
      {buying_behavior && (
        <div className="mb-6 p-4 rounded-xl bg-card border border-border">
          <p className="text-sm font-medium mb-2">Local Buying Behavior</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{buying_behavior}</p>
        </div>
      )}

      {/* Cultural Insights */}
      {cultural_insights.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium mb-3">Key Cultural Insights</p>
          <div className="space-y-2">
            {cultural_insights.map((insight, i) => (
              <div 
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/20"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-primary font-medium">{i + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trust Signals Needed */}
      {trust_signals_needed.length > 0 && (
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-sm font-medium mb-3 text-primary">Trust Signals Required</p>
          <div className="flex flex-wrap gap-2">
            {trust_signals_needed.map((signal, i) => (
              <span 
                key={i}
                className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
              >
                {signal}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CulturalFit;
