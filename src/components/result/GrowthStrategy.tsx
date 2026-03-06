import { motion } from "framer-motion";
import { Rocket, Share2, BarChart3, DollarSign } from "lucide-react";

interface GrowthStrategyProps {
  validationResult: any;
}

const GrowthStrategy = ({ validationResult }: GrowthStrategyProps) => {
  const channels = validationResult?.distribution_channels || [];
  const network = validationResult?.network_effects;
  const unitEcon = validationResult?.unit_economics;
  const confidence = validationResult?.confidence_score || 50;

  // Top channels by viability
  const sortedChannels = [...channels]
    .sort((a: any, b: any) => {
      const order: Record<string, number> = { high: 3, medium: 2, low: 1 };
      return (order[b.viability] || 0) - (order[a.viability] || 0);
    })
    .slice(0, 3);

  // Viral loop potential
  const viralScore = network?.has_network_effects
    ? network.strength === "strong" ? 9 : network.strength === "moderate" ? 6 : 3
    : 2;

  // Revenue simulation (simple projections)
  const baseRevenue = unitEcon?.estimated_ltv ? parseFloat(unitEcon.estimated_ltv.replace(/[^0-9.]/g, "")) || 500 : 500;
  const growthMultiplier = confidence > 70 ? 3.5 : confidence > 50 ? 2.5 : 1.8;
  const year1 = Math.round(baseRevenue * 20); // 20 customers
  const year3 = Math.round(year1 * growthMultiplier * 5);
  const year5 = Math.round(year3 * growthMultiplier * 3);

  const formatRevenue = (n: number) => {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n}`;
  };

  // Startup Score breakdown
  const painScore = validationResult?.pain_realism?.score || 5;
  const marketScore = validationResult?.market_analysis?.tam_estimate?.includes("B") ? 9 : 6;
  const executionScore = validationResult?.execution_risks?.tech_complexity === "low" ? 8 : 5;
  const founderScore = validationResult?.founder_market_fit?.score || 5;
  const overallScore = Math.round((painScore * 2 + marketScore * 2 + executionScore + founderScore + viralScore) / 8 * 10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="premium-card rounded-2xl p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary"><Rocket className="w-5 h-5" /></div>
        <h3 className="text-lg font-semibold">Growth Strategy</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Growth Channels */}
        {sortedChannels.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" /> Top Channels
            </h4>
            <div className="space-y-2">
              {sortedChannels.map((ch: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      ch.viability === "high" ? "bg-success" : ch.viability === "medium" ? "bg-primary" : "bg-destructive"
                    }`} />
                    <span className="text-sm font-medium">{ch.channel}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">CAC: {ch.cac_estimate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Viral Loop Potential */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-primary" /> Viral Potential
          </h4>
          <div className="p-4 rounded-xl bg-muted/30 border border-border mb-4">
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-bold font-mono">{viralScore}</span>
              <span className="text-sm text-muted-foreground mb-1">/10</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${viralScore * 10}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`h-full rounded-full ${viralScore >= 7 ? "bg-success" : viralScore >= 4 ? "bg-primary" : "bg-destructive"}`}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {network?.has_network_effects
                ? `${network.type} network effects with ${network.strength} strength`
                : "No inherent network effects — focus on referral mechanics"}
            </p>
          </div>
        </div>
      </div>

      {/* Revenue Simulator */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" /> Revenue Simulator
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            { year: "Year 1", rev: year1, customers: "~20" },
            { year: "Year 3", rev: year3, customers: `~${Math.round(year3 / baseRevenue)}` },
            { year: "Year 5", rev: year5, customers: `~${Math.round(year5 / baseRevenue)}` },
          ].map((proj, i) => (
            <motion.div
              key={proj.year}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10"
            >
              <p className="text-xs text-muted-foreground mb-1">{proj.year}</p>
              <p className="text-xl font-bold font-mono text-primary">{formatRevenue(proj.rev)}</p>
              <p className="text-xs text-muted-foreground mt-1">{proj.customers} customers</p>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic">
          * Projections based on validation data and industry benchmarks. Actual results vary.
        </p>
      </div>

      {/* Startup Score */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold">Startup Score</h4>
          <span className="text-2xl font-bold font-mono text-primary">{overallScore}/100</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${overallScore}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={`h-full rounded-full ${overallScore >= 70 ? "bg-success" : overallScore >= 40 ? "bg-primary" : "bg-destructive"}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default GrowthStrategy;
