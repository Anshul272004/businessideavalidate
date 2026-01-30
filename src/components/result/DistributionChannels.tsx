import { motion } from "framer-motion";
import { Megaphone, TrendingUp, DollarSign, Target } from "lucide-react";

interface DistributionChannelsProps {
  channels: Array<{
    channel: string;
    viability: "high" | "medium" | "low";
    cac_estimate: string;
  }> | null;
}

const DistributionChannels = ({ channels }: DistributionChannelsProps) => {
  if (!channels || channels.length === 0) return null;

  const viabilityColors = {
    high: "bg-success/10 border-success/30 text-success",
    medium: "bg-primary/10 border-primary/30 text-primary",
    low: "bg-muted border-border text-muted-foreground",
  };

  const viabilityIcons = {
    high: "🎯",
    medium: "⚡",
    low: "⚠️",
  };

  // Sort by viability (high first)
  const sortedChannels = [...channels].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.viability] - order[b.viability];
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary">
          <Megaphone className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">Distribution Channels</h3>
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full ml-auto">
          How You'll Get Customers
        </span>
      </div>

      <div className="space-y-3">
        {sortedChannels.map((channel, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border ${viabilityColors[channel.viability]} flex items-center justify-between`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{viabilityIcons[channel.viability]}</span>
              <div>
                <p className="font-medium">{channel.channel}</p>
                <p className="text-xs opacity-80 capitalize">{channel.viability} viability</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span className="font-bold">{channel.cac_estimate}</span>
              </div>
              <p className="text-xs opacity-80">Est. CAC</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-muted/50 rounded-xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Distribution Strategy</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Focus on <span className="text-success font-medium">
            {sortedChannels.filter(c => c.viability === "high").length} high-viability
          </span> channels first. 
          {sortedChannels.find(c => c.viability === "high") && (
            <> Start with <span className="text-foreground font-medium">
              {sortedChannels.find(c => c.viability === "high")?.channel}
            </span> for fastest traction.</>
          )}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DistributionChannels;
