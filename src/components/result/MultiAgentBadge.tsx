import { motion } from "framer-motion";
import { Brain, DollarSign, Shield, Sparkles } from "lucide-react";

interface MultiAgentBadgeProps {
  agents?: string[];
}

const agentIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  "Dopamine Detective": { 
    icon: <Brain className="w-3.5 h-3.5" />, 
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30" 
  },
  "Money Trail": { 
    icon: <DollarSign className="w-3.5 h-3.5" />, 
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
  },
  "Amygdala Audit": { 
    icon: <Shield className="w-3.5 h-3.5" />, 
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30" 
  },
  "Verdict Synthesizer": { 
    icon: <Sparkles className="w-3.5 h-3.5" />, 
    color: "bg-primary/20 text-primary border-primary/30" 
  },
};

const MultiAgentBadge = ({ agents = [] }: MultiAgentBadgeProps) => {
  if (!agents || agents.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 justify-center mb-6"
    >
      <span className="text-xs text-muted-foreground mr-1">Analyzed by:</span>
      {agents.map((agent, i) => {
        const config = agentIcons[agent] || { 
          icon: <Sparkles className="w-3.5 h-3.5" />, 
          color: "bg-muted text-muted-foreground border-border" 
        };
        
        return (
          <motion.span
            key={agent}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}
          >
            {config.icon}
            {agent}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default MultiAgentBadge;
