import { motion } from "framer-motion";
import { Network, TrendingUp, Users, Database, ShoppingBag, Layers } from "lucide-react";

interface NetworkEffectsProps {
  network_effects: {
    has_network_effects: boolean;
    type: "direct" | "indirect" | "data" | "platform" | "none";
    strength: "strong" | "moderate" | "weak";
  } | null;
  winner_take_all?: boolean;
  market_maturity?: string;
}

const NetworkEffects = ({ network_effects, winner_take_all, market_maturity }: NetworkEffectsProps) => {
  if (!network_effects) return null;

  const typeIcons = {
    direct: <Users className="w-5 h-5" />,
    indirect: <ShoppingBag className="w-5 h-5" />,
    data: <Database className="w-5 h-5" />,
    platform: <Layers className="w-5 h-5" />,
    none: <Network className="w-5 h-5" />,
  };

  const typeDescriptions = {
    direct: "More users = more value for each user (like social networks)",
    indirect: "Two-sided marketplace effect (like Uber - drivers & riders)",
    data: "More data improves the product (like Google Search)",
    platform: "Third-party builders add value (like App Store)",
    none: "No network effects - linear scaling",
  };

  const strengthColors = {
    strong: "text-success bg-success/10 border-success/20",
    moderate: "text-primary bg-primary/10 border-primary/20",
    weak: "text-muted-foreground bg-muted border-border",
  };

  const maturityColors: Record<string, string> = {
    nascent: "text-success",
    growing: "text-primary",
    mature: "text-amber-400",
    declining: "text-destructive",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary">
          <Network className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">Network Effects & Market Dynamics</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Network Effect Type */}
        <div className="p-4 bg-muted/50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-primary">
              {typeIcons[network_effects.type]}
            </div>
            <span className="text-sm font-medium">Effect Type</span>
          </div>
          <p className="text-xl font-bold capitalize mb-2">{network_effects.type}</p>
          <p className="text-xs text-muted-foreground">{typeDescriptions[network_effects.type]}</p>
        </div>

        {/* Strength */}
        <div className={`p-4 rounded-xl border ${strengthColors[network_effects.strength]}`}>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Strength</span>
          </div>
          <p className="text-xl font-bold capitalize">{network_effects.strength}</p>
          <p className="text-xs opacity-80 mt-1">
            {network_effects.strength === "strong" && "Powerful moat potential"}
            {network_effects.strength === "moderate" && "Some defensibility"}
            {network_effects.strength === "weak" && "Limited protection"}
          </p>
        </div>

        {/* Market Dynamics */}
        <div className="p-4 bg-muted/50 rounded-xl space-y-3">
          {winner_take_all !== undefined && (
            <div>
              <span className="text-xs text-muted-foreground">Winner-Take-All</span>
              <p className={`font-bold ${winner_take_all ? "text-success" : "text-muted-foreground"}`}>
                {winner_take_all ? "Yes - Race to dominate" : "No - Room for many players"}
              </p>
            </div>
          )}
          {market_maturity && (
            <div>
              <span className="text-xs text-muted-foreground">Market Maturity</span>
              <p className={`font-bold capitalize ${maturityColors[market_maturity] || "text-foreground"}`}>
                {market_maturity}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Visual Representation */}
      {network_effects.has_network_effects && network_effects.type !== "none" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-success/5 border border-success/20 rounded-xl"
        >
          <p className="text-sm text-success font-medium">
            ✨ This business has {network_effects.strength} {network_effects.type} network effects - 
            {network_effects.strength === "strong" 
              ? " a powerful competitive moat that compounds over time"
              : network_effects.strength === "moderate"
              ? " some built-in defensibility as you scale"
              : " limited but present network dynamics"}
          </p>
        </motion.div>
      )}

      {!network_effects.has_network_effects && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl"
        >
          <p className="text-sm text-amber-400 font-medium">
            ⚠️ No network effects detected - you'll need other moats (brand, tech, scale, data) to defend against competitors
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NetworkEffects;
