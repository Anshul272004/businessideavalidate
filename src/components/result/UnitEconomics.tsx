import { motion } from "framer-motion";
import { Calculator, TrendingUp, TrendingDown, DollarSign, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface UnitEconomicsProps {
  unit_economics: {
    estimated_cac?: string;
    estimated_ltv?: string;
    ltv_cac_ratio?: string;
    estimated_margin?: string;
    payback_period?: string;
    sustainability?: "good" | "moderate" | "concerning";
  } | null;
  revenue_model?: string;
}

const UnitEconomics = ({ unit_economics, revenue_model }: UnitEconomicsProps) => {
  if (!unit_economics) return null;

  const sustainabilityConfig = {
    good: {
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      icon: <CheckCircle className="w-5 h-5" />,
      label: "Healthy Economics",
    },
    moderate: {
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Needs Optimization",
    },
    concerning: {
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
      icon: <AlertTriangle className="w-5 h-5" />,
      label: "Unit Economics Risk",
    },
  };

  const config = sustainabilityConfig[unit_economics.sustainability || "moderate"];

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold">Unit Economics</h3>
        </div>
        
        {/* Revenue Model Badge */}
        {revenue_model && (
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full capitalize">
            {revenue_model} Model
          </span>
        )}
      </div>

      {/* Sustainability Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-4 rounded-xl border mb-6 ${config.bgColor} ${config.borderColor}`}
      >
        <div className="flex items-center gap-3">
          <div className={config.color}>{config.icon}</div>
          <div>
            <p className={`font-medium ${config.color}`}>{config.label}</p>
            <p className="text-sm text-muted-foreground">
              {unit_economics.sustainability === "good" 
                ? "Your unit economics look sustainable for growth"
                : unit_economics.sustainability === "concerning"
                ? "Consider adjusting pricing or reducing CAC"
                : "Optimize to improve profitability"
              }
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* CAC */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-muted/50 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Est. CAC</span>
          </div>
          <p className="text-2xl font-bold">{unit_economics.estimated_cac || "TBD"}</p>
          <p className="text-xs text-muted-foreground mt-1">Customer Acquisition Cost</p>
        </motion.div>

        {/* LTV */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-muted/50 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-xs text-muted-foreground">Est. LTV</span>
          </div>
          <p className="text-2xl font-bold text-success">{unit_economics.estimated_ltv || "TBD"}</p>
          <p className="text-xs text-muted-foreground mt-1">Lifetime Value</p>
        </motion.div>

        {/* LTV:CAC Ratio */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-primary/5 border border-primary/10 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">LTV:CAC Ratio</span>
          </div>
          <p className="text-2xl font-bold text-primary">{unit_economics.ltv_cac_ratio || "TBD"}</p>
          <p className="text-xs text-muted-foreground mt-1">Target: 3:1 or higher</p>
        </motion.div>

        {/* Gross Margin */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-muted/50 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Gross Margin</span>
          </div>
          <p className="text-2xl font-bold">{unit_economics.estimated_margin || "TBD"}</p>
          <p className="text-xs text-muted-foreground mt-1">Software: 70-90% typical</p>
        </motion.div>

        {/* Payback Period */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 bg-muted/50 rounded-xl sm:col-span-2 lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Payback Period</span>
          </div>
          <p className="text-2xl font-bold">{unit_economics.payback_period || "TBD"}</p>
          <p className="text-xs text-muted-foreground mt-1">Time to recover CAC. Target: under 12 months</p>
        </motion.div>
      </div>
    </div>
  );
};

export default UnitEconomics;