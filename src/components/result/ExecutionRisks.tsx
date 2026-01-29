import { motion } from "framer-motion";
import { 
  Briefcase, 
  Clock, 
  DollarSign, 
  Code, 
  Users, 
  Shield,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface ExecutionRisksProps {
  execution_risks: {
    team_requirements?: string[];
    capital_needed?: string;
    tech_complexity?: "low" | "medium" | "high";
    tech_challenges?: string[];
    time_to_mvp?: string;
    critical_hires?: string[];
    moat_difficulty?: "easy" | "medium" | "hard";
  } | null;
  regulatory_concerns?: string[] | null;
  legal_considerations?: string[] | null;
}

const ExecutionRisks = ({ 
  execution_risks, 
  regulatory_concerns, 
  legal_considerations 
}: ExecutionRisksProps) => {
  if (!execution_risks) return null;

  const complexityColor = {
    low: "text-success bg-success/10 border-success/20",
    medium: "text-primary bg-primary/10 border-primary/20",
    high: "text-destructive bg-destructive/10 border-destructive/20",
  };

  const moatColor = {
    easy: "text-success",
    medium: "text-primary",
    hard: "text-destructive",
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-destructive">
          <Briefcase className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">Execution Reality Check</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Capital & Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Capital Needed */}
          <div className="p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Capital Needed</span>
            </div>
            <p className="text-2xl font-bold text-primary">
              {execution_risks.capital_needed || "TBD"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">To reach MVP/traction</p>
          </div>

          {/* Time to MVP */}
          <div className="p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Time to MVP</span>
            </div>
            <p className="text-2xl font-bold">
              {execution_risks.time_to_mvp || "TBD"}
            </p>
          </div>

          {/* Tech Complexity */}
          <div className={`p-4 rounded-xl border ${complexityColor[execution_risks.tech_complexity || "medium"]}`}>
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-4 h-4" />
              <span className="text-sm font-medium">Tech Complexity</span>
            </div>
            <p className="text-lg font-bold capitalize">
              {execution_risks.tech_complexity || "Medium"}
            </p>
          </div>
        </motion.div>

        {/* Team & Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Critical Hires */}
          {execution_risks.critical_hires && execution_risks.critical_hires.length > 0 && (
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Critical Hires Needed</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {execution_risks.critical_hires.map((role, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tech Challenges */}
          {execution_risks.tech_challenges && execution_risks.tech_challenges.length > 0 && (
            <div className="p-4 bg-destructive/5 border border-destructive/10 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium">Tech Challenges</span>
              </div>
              <ul className="space-y-2">
                {execution_risks.tech_challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-destructive mt-0.5">•</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Moat Difficulty */}
          <div className="p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Building a Moat</span>
            </div>
            <p className={`text-lg font-bold capitalize ${moatColor[execution_risks.moat_difficulty || "medium"]}`}>
              {execution_risks.moat_difficulty || "Medium"} to defend
            </p>
          </div>
        </motion.div>
      </div>

      {/* Regulatory & Legal */}
      {(regulatory_concerns?.length || legal_considerations?.length) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 grid md:grid-cols-2 gap-4"
        >
          {regulatory_concerns && regulatory_concerns.length > 0 && (
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
              <p className="text-sm font-medium text-amber-400 mb-2">⚠️ Regulatory Concerns</p>
              <ul className="space-y-1">
                {regulatory_concerns.map((concern, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {concern}</li>
                ))}
              </ul>
            </div>
          )}

          {legal_considerations && legal_considerations.length > 0 && (
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
              <p className="text-sm font-medium text-amber-400 mb-2">⚖️ Legal Considerations</p>
              <ul className="space-y-1">
                {legal_considerations.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ExecutionRisks;