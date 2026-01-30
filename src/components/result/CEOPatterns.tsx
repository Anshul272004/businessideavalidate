import { motion } from "framer-motion";
import { 
  Rocket, 
  Brain, 
  Target, 
  TrendingUp, 
  Zap,
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb
} from "lucide-react";

interface CEOPatternsProps {
  ceo_patterns: {
    pattern_matches?: {
      regret_minimization?: { score: number; reasoning: string };
      first_principles?: { passes: boolean; fundamental_truths: string[] };
      speed_to_test?: { weeks_to_mvp: number; validation_speed: string };
      zero_to_one?: { is_10x: boolean; improvement_type: string };
      circle_of_competence?: { in_circle: boolean; gaps: string[] | null };
      value_equation?: {
        dream_outcome_score: number;
        likelihood_score: number;
        time_delay_score: number;
        effort_score: number;
        total_value_score: number;
      };
    } | null;
    yc_pattern_match?: {
      matches_successful_patterns: boolean;
      similar_successful_companies: string[];
      pattern_type: string;
    } | null;
    anti_patterns?: Array<{
      pattern: string;
      severity: "critical" | "warning" | "minor";
      explanation: string;
    }>;
    founder_archetype?: string;
    scalability?: {
      score: number;
      bottlenecks: string[];
    };
    exit_potential?: {
      acquisition_likely: boolean;
      potential_acquirers: string[];
      ipo_viable: boolean;
      exit_timeline: string;
    } | null;
    pivot_risk?: {
      likelihood: string;
      likely_pivot_directions: string[];
    } | null;
  } | null;
}

const CEOPatterns = ({ ceo_patterns }: CEOPatternsProps) => {
  if (!ceo_patterns) return null;

  const patterns = ceo_patterns.pattern_matches;
  const ycMatch = ceo_patterns.yc_pattern_match;
  const antiPatterns = ceo_patterns.anti_patterns || [];
  
  const archetypeEmojis: Record<string, string> = {
    visionary: "🔮",
    operator: "⚙️",
    technical: "💻",
    "domain-expert": "🎓",
    hustler: "🚀",
  };

  const severityColors = {
    critical: "bg-destructive/10 border-destructive/30 text-destructive",
    warning: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    minor: "bg-muted border-border text-muted-foreground",
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary">
          <Award className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">CEO Success Patterns</h3>
        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          From 1000+ Founders
        </span>
      </div>

      {/* Pattern Match Grid */}
      {patterns && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Bezos Regret Minimization */}
          {patterns.regret_minimization && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-muted/50 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Bezos Regret Test</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold">{patterns.regret_minimization.score}/10</span>
                {patterns.regret_minimization.score >= 7 ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">{patterns.regret_minimization.reasoning}</p>
            </motion.div>
          )}

          {/* First Principles */}
          {patterns.first_principles && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="p-4 bg-muted/50 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Musk First Principles</span>
              </div>
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                patterns.first_principles.passes 
                  ? "bg-success/20 text-success" 
                  : "bg-destructive/20 text-destructive"
              }`}>
                {patterns.first_principles.passes ? "PASSES" : "FAILS"}
              </div>
              {patterns.first_principles.fundamental_truths?.slice(0, 2).map((truth, i) => (
                <p key={i} className="text-xs text-muted-foreground">• {truth}</p>
              ))}
            </motion.div>
          )}

          {/* Zero to One */}
          {patterns.zero_to_one && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-4 rounded-xl border ${
                patterns.zero_to_one.is_10x 
                  ? "bg-success/5 border-success/20" 
                  : "bg-muted/50 border-border"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Thiel Zero-to-One</span>
              </div>
              <p className={`text-lg font-bold ${patterns.zero_to_one.is_10x ? "text-success" : "text-muted-foreground"}`}>
                {patterns.zero_to_one.improvement_type}
              </p>
              {patterns.zero_to_one.is_10x && (
                <span className="text-xs text-success">✨ 10x Innovation</span>
              )}
            </motion.div>
          )}

          {/* Speed to Test */}
          {patterns.speed_to_test && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-4 bg-muted/50 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Zuckerberg Speed</span>
              </div>
              <p className="text-2xl font-bold">{patterns.speed_to_test.weeks_to_mvp} weeks</p>
              <p className="text-xs text-muted-foreground capitalize">{patterns.speed_to_test.validation_speed} validation</p>
            </motion.div>
          )}

          {/* Value Equation */}
          {patterns.value_equation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-muted/50 rounded-xl col-span-1 md:col-span-2"
            >
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Hormozi Value Equation</span>
                <span className="text-2xl font-bold text-primary ml-auto">
                  {patterns.value_equation.total_value_score}/100
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Dream", score: patterns.value_equation.dream_outcome_score },
                  { label: "Likelihood", score: patterns.value_equation.likelihood_score },
                  { label: "Speed", score: patterns.value_equation.time_delay_score },
                  { label: "Ease", score: patterns.value_equation.effort_score },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-bold">{item.score}</div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* YC Pattern Match */}
      {ycMatch && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={`p-4 rounded-xl border ${
            ycMatch.matches_successful_patterns 
              ? "bg-success/5 border-success/20" 
              : "bg-muted/50 border-border"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Y Combinator Pattern Match</span>
            {ycMatch.matches_successful_patterns && (
              <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full ml-auto">
                MATCHES YC WINNERS
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize">
              {ycMatch.pattern_type}
            </span>
            {ycMatch.similar_successful_companies?.map((company, i) => (
              <span key={i} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Founder Archetype */}
      {ceo_patterns.founder_archetype && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl"
        >
          <span className="text-3xl">{archetypeEmojis[ceo_patterns.founder_archetype] || "👤"}</span>
          <div>
            <p className="text-sm text-muted-foreground">Founder Archetype</p>
            <p className="text-lg font-bold capitalize">{ceo_patterns.founder_archetype}</p>
          </div>
          {ceo_patterns.scalability && (
            <div className="ml-auto text-right">
              <p className="text-sm text-muted-foreground">Scalability</p>
              <p className="text-lg font-bold">{ceo_patterns.scalability.score}/10</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Anti-Patterns */}
      {antiPatterns.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium">Warning Signs Detected</span>
          </div>
          <div className="space-y-2">
            {antiPatterns.map((pattern, i) => (
              <div key={i} className={`p-3 rounded-xl border ${severityColors[pattern.severity]}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium uppercase">{pattern.severity}</span>
                  <span className="font-medium">{pattern.pattern}</span>
                </div>
                <p className="text-xs opacity-80">{pattern.explanation}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Exit Potential */}
      {ceo_patterns.exit_potential && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <div className="p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">Exit Timeline</p>
            <p className="text-xl font-bold">{ceo_patterns.exit_potential.exit_timeline}</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">Potential Acquirers</p>
            <div className="flex flex-wrap gap-2">
              {ceo_patterns.exit_potential.potential_acquirers?.map((acquirer, i) => (
                <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {acquirer}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CEOPatterns;
