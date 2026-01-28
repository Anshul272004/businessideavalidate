import { motion } from "framer-motion";
import { Trophy, TrendingDown, Target } from "lucide-react";

interface Competitor {
  name: string;
  weakness: string;
  market_share?: string;
  pricing?: string;
}

interface CompetitorChartProps {
  competitors: Competitor[];
  yourEdge: string;
}

const CompetitorChart = ({ competitors, yourEdge }: CompetitorChartProps) => {
  if (!competitors || competitors.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary">
          <Trophy className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">Competitor Battlefield</h3>
      </div>

      {/* Visual Comparison */}
      <div className="space-y-4 mb-6">
        {competitors.map((competitor, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative"
          >
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border border-border hover:border-destructive/30 transition-colors group">
              {/* Competitor Icon */}
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-destructive">
                  {competitor.name.charAt(0)}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold truncate">{competitor.name}</h4>
                  {competitor.pricing && (
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                      {competitor.pricing}
                    </span>
                  )}
                </div>
                
                {/* Weakness Bar */}
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-3 h-3 text-destructive flex-shrink-0" />
                  <p className="text-sm text-muted-foreground truncate">
                    {competitor.weakness}
                  </p>
                </div>
              </div>

              {/* Market Share Badge */}
              {competitor.market_share && (
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-muted-foreground">Market</p>
                  <p className="text-sm font-medium">{competitor.market_share}</p>
                </div>
              )}
            </div>

            {/* Attack Arrow */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Target className="w-2 h-2 text-primary-foreground" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Your Edge Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative p-5 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl border border-primary/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-xl">🎯</span>
          </div>
          <div>
            <p className="text-xs text-primary font-medium mb-1">YOUR COMPETITIVE EDGE</p>
            <p className="text-foreground font-medium">{yourEdge}</p>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl -z-10" />
      </motion.div>
    </div>
  );
};

export default CompetitorChart;
