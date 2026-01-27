import { motion } from "framer-motion";

interface ConfidenceMeterProps {
  score: number;
}

const ConfidenceMeter = ({ score }: ConfidenceMeterProps) => {
  const getColor = () => {
    if (score >= 70) return "text-success";
    if (score >= 40) return "text-primary";
    return "text-destructive";
  };

  const getGradient = () => {
    if (score >= 70) return "from-success to-success/50";
    if (score >= 40) return "from-primary to-primary/50";
    return "from-destructive to-destructive/50";
  };

  const getLabel = () => {
    if (score >= 80) return "Very High";
    if (score >= 60) return "Good";
    if (score >= 40) return "Moderate";
    if (score >= 20) return "Low";
    return "Very Low";
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Viability Confidence</h3>
        <span className={`text-sm font-medium ${getColor()}`}>{getLabel()}</span>
      </div>
      
      <div className="relative">
        {/* Background track */}
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${getGradient()}`}
          />
        </div>
        
        {/* Score indicator */}
        <motion.div
          initial={{ left: "0%" }}
          animate={{ left: `${Math.min(score, 95)}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-1"
        >
          <div className={`w-6 h-6 rounded-full bg-card border-2 border-current ${getColor()} flex items-center justify-center shadow-lg`}>
            <span className="text-[10px] font-bold">{score}</span>
          </div>
        </motion.div>
      </div>

      {/* Scale labels */}
      <div className="flex justify-between mt-3 text-xs text-muted-foreground">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default ConfidenceMeter;
