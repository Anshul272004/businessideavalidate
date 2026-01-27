import { motion } from "framer-motion";
import { Zap, Heart, AlertTriangle } from "lucide-react";

interface NeuroscienceProps {
  dopamine_triggers: string[];
  oxytocin_factors: string[];
  cortisol_urgency: string[];
  risk: string;
  trust_difficulty: string;
}

const NeurosciencePanel = ({ dopamine_triggers, oxytocin_factors, cortisol_urgency, risk, trust_difficulty }: NeuroscienceProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary">
          <Zap className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">Neuroscience Analysis</h3>
      </div>

      <div className="space-y-6">
        {/* Dopamine Triggers */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Zap className="w-3 h-3 text-yellow-500" />
            </div>
            <p className="text-sm font-medium">Dopamine Triggers</p>
            <span className="text-xs text-muted-foreground">(Excitement & Reward)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {dopamine_triggers?.map((trigger, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="px-3 py-1.5 bg-yellow-500/10 text-yellow-500 rounded-full text-sm"
              >
                {trigger}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Oxytocin Factors */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-pink-500/10 flex items-center justify-center">
              <Heart className="w-3 h-3 text-pink-500" />
            </div>
            <p className="text-sm font-medium">Oxytocin Factors</p>
            <span className="text-xs text-muted-foreground">(Trust & Connection)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {oxytocin_factors?.map((factor, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="px-3 py-1.5 bg-pink-500/10 text-pink-500 rounded-full text-sm"
              >
                {factor}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Cortisol/Urgency */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center">
              <AlertTriangle className="w-3 h-3 text-orange-500" />
            </div>
            <p className="text-sm font-medium">Urgency Triggers</p>
            <span className="text-xs text-muted-foreground">(FOMO & Scarcity)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {cortisol_urgency?.map((trigger, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="px-3 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-sm"
              >
                {trigger}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Risk & Trust */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Perceived Risk</p>
            <p className={`font-bold capitalize ${
              risk === "low" ? "text-success" : risk === "medium" ? "text-primary" : "text-destructive"
            }`}>
              {risk}
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Trust Building</p>
            <p className={`font-bold capitalize ${
              trust_difficulty === "low" ? "text-success" : trust_difficulty === "medium" ? "text-primary" : "text-destructive"
            }`}>
              {trust_difficulty}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeurosciencePanel;
