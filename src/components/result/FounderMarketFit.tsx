import { motion } from "framer-motion";
import { User, CheckCircle, XCircle, AlertTriangle, Sparkles } from "lucide-react";

interface FounderMarketFitProps {
  founder_market_fit: {
    score: number;
    advantages: string[];
    gaps: string[];
  } | null;
  founder_archetype?: string;
  similar_founders?: string[];
}

const FounderMarketFit = ({ founder_market_fit, founder_archetype, similar_founders }: FounderMarketFitProps) => {
  if (!founder_market_fit) return null;

  const scoreColor = 
    founder_market_fit.score >= 8 ? "text-success" :
    founder_market_fit.score >= 6 ? "text-primary" :
    founder_market_fit.score >= 4 ? "text-amber-400" : "text-destructive";

  const scoreLabel =
    founder_market_fit.score >= 8 ? "Excellent Fit" :
    founder_market_fit.score >= 6 ? "Good Fit" :
    founder_market_fit.score >= 4 ? "Moderate Fit" : "Weak Fit";

  const archetypeEmojis: Record<string, string> = {
    visionary: "🔮",
    operator: "⚙️",
    technical: "💻",
    "domain-expert": "🎓",
    hustler: "🚀",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary">
          <User className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">Founder-Market Fit</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Score */}
        <div className="p-6 bg-muted/50 rounded-xl text-center">
          <div className={`text-5xl font-bold ${scoreColor} mb-2`}>
            {founder_market_fit.score}/10
          </div>
          <p className={`text-sm font-medium ${scoreColor}`}>{scoreLabel}</p>
          
          {/* Progress bar */}
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${founder_market_fit.score * 10}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`h-full rounded-full ${
                founder_market_fit.score >= 8 ? "bg-success" :
                founder_market_fit.score >= 6 ? "bg-primary" :
                founder_market_fit.score >= 4 ? "bg-amber-400" : "bg-destructive"
              }`}
            />
          </div>
        </div>

        {/* Archetype */}
        {founder_archetype && (
          <div className="p-6 bg-primary/5 rounded-xl text-center">
            <span className="text-4xl mb-2 block">{archetypeEmojis[founder_archetype] || "👤"}</span>
            <p className="text-sm text-muted-foreground">Your Archetype</p>
            <p className="text-lg font-bold capitalize">{founder_archetype}</p>
          </div>
        )}

        {/* Similar Founders */}
        {similar_founders && similar_founders.length > 0 && (
          <div className="p-6 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Similar Founders</span>
            </div>
            <div className="space-y-1">
              {similar_founders.slice(0, 3).map((founder, i) => (
                <p key={i} className="text-sm text-muted-foreground">{founder}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Advantages */}
        {founder_market_fit.advantages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-success/5 border border-success/20 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-success">Your Advantages</span>
            </div>
            <ul className="space-y-2">
              {founder_market_fit.advantages.map((advantage, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-success mt-0.5">✓</span>
                  {advantage}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Gaps */}
        {founder_market_fit.gaps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Gaps to Address</span>
            </div>
            <ul className="space-y-2">
              {founder_market_fit.gaps.map((gap, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-amber-400 mt-0.5">!</span>
                  {gap}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FounderMarketFit;
