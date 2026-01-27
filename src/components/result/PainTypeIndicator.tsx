import { motion } from "framer-motion";
import { Pill, Heart } from "lucide-react";

interface PainTypeIndicatorProps {
  type: "painkiller" | "vitamin";
  frequency: "daily" | "weekly" | "monthly" | "rarely";
}

const PainTypeIndicator = ({ type, frequency }: PainTypeIndicatorProps) => {
  const isPainkiller = type === "painkiller";

  const frequencyLabel = {
    daily: "Daily occurrence",
    weekly: "Weekly occurrence",
    monthly: "Monthly occurrence",
    rarely: "Rare occurrence",
  };

  const frequencyColor = {
    daily: "text-success",
    weekly: "text-primary",
    monthly: "text-yellow-500",
    rarely: "text-destructive",
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
          isPainkiller ? "bg-success/20" : "bg-primary/20"
        }`}
      >
        {isPainkiller ? (
          <Pill className="w-7 h-7 text-success" />
        ) : (
          <Heart className="w-7 h-7 text-primary" />
        )}
      </motion.div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`text-lg font-bold ${isPainkiller ? "text-success" : "text-primary"}`}>
            {isPainkiller ? "Painkiller" : "Vitamin"}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            isPainkiller ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
          }`}>
            {isPainkiller ? "Must-have" : "Nice-to-have"}
          </span>
        </div>
        <p className={`text-sm ${frequencyColor[frequency]}`}>
          {frequencyLabel[frequency]}
        </p>
      </div>
    </div>
  );
};

export default PainTypeIndicator;
