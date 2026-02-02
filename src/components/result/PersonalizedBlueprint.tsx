import { motion } from "framer-motion";
import { Map, Target, Rocket, DollarSign, Users, Flag, CheckCircle2 } from "lucide-react";

interface PersonalizedBlueprintProps {
  blueprint: {
    phase_1: { title: string; duration: string; actions: string[]; budget_needed: string; goal: string };
    phase_2: { title: string; duration: string; actions: string[]; budget_needed: string; goal: string };
    phase_3: { title: string; duration: string; actions: string[]; budget_needed: string; goal: string };
    phase_4: { title: string; duration: string; actions: string[]; budget_needed: string; goal: string };
  } | null;
  founder_specific_advice?: string;
  risk_mitigation_plan?: string[];
}

const phaseIcons = [
  <Target className="w-5 h-5" />,
  <Rocket className="w-5 h-5" />,
  <Users className="w-5 h-5" />,
  <Flag className="w-5 h-5" />,
];

const phaseColors = [
  "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
  "from-primary/20 to-primary/5 border-primary/30 text-primary",
  "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
  "from-success/20 to-success/5 border-success/30 text-success",
];

const PersonalizedBlueprint = ({ blueprint, founder_specific_advice, risk_mitigation_plan }: PersonalizedBlueprintProps) => {
  if (!blueprint) return null;

  const phases = [blueprint.phase_1, blueprint.phase_2, blueprint.phase_3, blueprint.phase_4];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card p-8 overflow-hidden relative"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-primary via-purple-500 to-success" />
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary border border-primary/20">
          <Map className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Your Personalized Blueprint</h3>
          <p className="text-sm text-muted-foreground">Tailored roadmap based on your unique situation</p>
        </div>
      </div>

      {/* Founder Specific Advice */}
      {founder_specific_advice && (
        <div className="mb-8 p-5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <p className="text-sm font-medium text-foreground leading-relaxed">
            💡 {founder_specific_advice}
          </p>
        </div>
      )}

      {/* Phases Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {phases.map((phase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-xl bg-gradient-to-br ${phaseColors[i].split(' ').slice(0, 2).join(' ')} border ${phaseColors[i].split(' ').slice(2, 3).join(' ')}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg bg-card/50 flex items-center justify-center ${phaseColors[i].split(' ').slice(3).join(' ')}`}>
                {phaseIcons[i]}
              </div>
              <div>
                <h4 className="font-bold">{phase.title}</h4>
                <p className="text-xs text-muted-foreground">{phase.duration}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {phase.actions.map((action, j) => (
                <div key={j} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{action}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-1.5 text-xs">
                <DollarSign className="w-3.5 h-3.5 text-primary" />
                <span className="text-muted-foreground">{phase.budget_needed}</span>
              </div>
              <div className="text-xs text-right">
                <span className="text-muted-foreground">Goal: </span>
                <span className="font-medium text-foreground">{phase.goal}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Risk Mitigation */}
      {risk_mitigation_plan && risk_mitigation_plan.length > 0 && (
        <div className="p-5 rounded-xl bg-card/50 border border-border/50">
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">Risk Mitigation Plan</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {risk_mitigation_plan.map((risk, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-amber-500 mt-0.5">⚠️</span>
                <span className="text-muted-foreground">{risk}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PersonalizedBlueprint;
