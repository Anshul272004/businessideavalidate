import { motion } from "framer-motion";
import { Sparkles, Copy } from "lucide-react";
import { toast } from "sonner";

interface KeyTakeawaysProps {
  verdict: string;
  verdictReasoning?: string;
  executiveBullets?: string[];
  bottomLine?: string;
}

const KeyTakeaways = ({ verdict, verdictReasoning, executiveBullets, bottomLine }: KeyTakeawaysProps) => {
  const insights: string[] = [];
  
  if (bottomLine) insights.push(bottomLine);
  if (verdictReasoning) insights.push(verdictReasoning);
  if (executiveBullets) insights.push(...executiveBullets.slice(0, 3 - insights.length));

  const topInsights = insights.slice(0, 3);

  if (topInsights.length === 0) return null;

  const copyInsight = (text: string) => {
    navigator.clipboard.writeText(`[ValidateFirst ${verdict}] ${text}`);
    toast.success("Insight copied!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Key Takeaways</h3>
      </div>
      <div className="space-y-3">
        {topInsights.map((insight, i) => (
          <div key={i} className="flex items-start gap-3 group">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
              {i + 1}
            </span>
            <p className="text-sm text-foreground leading-relaxed flex-1">
              {insight.length > 150 ? insight.slice(0, 150) + "..." : insight}
            </p>
            <button
              onClick={() => copyInsight(insight)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary flex-shrink-0"
              title="Copy insight"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default KeyTakeaways;
