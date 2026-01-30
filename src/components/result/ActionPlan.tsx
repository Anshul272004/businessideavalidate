import { motion } from "framer-motion";
import { Calendar, Target, CheckCircle, ArrowRight, Lightbulb, BookOpen } from "lucide-react";

interface ActionPlanProps {
  immediate_plan: Array<{
    day: string;
    action: string;
    goal: string;
  }> | string[];
  what_would_change_verdict?: string[];
  recommended_reading?: string[];
}

const ActionPlan = ({ immediate_plan, what_would_change_verdict, recommended_reading }: ActionPlanProps) => {
  if (!immediate_plan || immediate_plan.length === 0) return null;

  // Handle both old format (string[]) and new format (object[])
  const formattedPlan = immediate_plan.map((item) => {
    if (typeof item === "string") {
      // Parse old format "Day X: action"
      const match = item.match(/^([^:]+):\s*(.+)$/);
      if (match) {
        return { day: match[1], action: match[2], goal: "Complete this step" };
      }
      return { day: "Step", action: item, goal: "Complete this step" };
    }
    return item;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary">
          <Calendar className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">30-Day Action Plan</h3>
        <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full ml-auto">
          Start Today
        </span>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
        
        <div className="space-y-4">
          {formattedPlan.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-10"
            >
              {/* Timeline dot */}
              <div className={`absolute left-2 top-2 w-5 h-5 rounded-full flex items-center justify-center ${
                index === 0 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }`}>
                <span className="text-xs font-bold">{index + 1}</span>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-xl hover:bg-muted/70 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    {step.day}
                  </span>
                  {index === 0 && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                      START HERE
                    </span>
                  )}
                </div>
                <p className="font-medium mb-1">{step.action}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Target className="w-3 h-3" />
                  Goal: {step.goal}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* What Would Change Verdict */}
      {what_would_change_verdict && what_would_change_verdict.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">What Would Upgrade This Verdict</span>
          </div>
          <ul className="space-y-2">
            {what_would_change_verdict.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ArrowRight className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Recommended Reading */}
      {recommended_reading && recommended_reading.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 p-4 bg-muted/50 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Recommended Reading</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommended_reading.map((book, i) => (
              <span key={i} className="px-3 py-1 bg-card border border-border text-xs rounded-full">
                📚 {book}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ActionPlan;
