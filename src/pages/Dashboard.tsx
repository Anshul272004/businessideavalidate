import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { 
  Target, ArrowLeft, ArrowRight, CheckCircle2, RefreshCw, 
  AlertTriangle, Calendar, TrendingUp, Loader2, Sparkles,
  Flame, BarChart3, User, Award, Zap, Crown, Mail, GitCompare
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface ValidationRecord {
  id: string;
  idea_summary: string;
  target_customer: string | null;
  verdict: "GO" | "PIVOT" | "KILL";
  confidence_score: number | null;
  result_data: any;
  form_data: any;
  created_at: string;
}

const verdictConfig = {
  GO: { icon: <CheckCircle2 className="w-5 h-5" />, color: "text-success", bg: "bg-success/10", border: "border-success/30", label: "GO" },
  PIVOT: { icon: <RefreshCw className="w-5 h-5" />, color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", label: "PIVOT" },
  KILL: { icon: <AlertTriangle className="w-5 h-5" />, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", label: "KILL" },
};

const getTimeGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

// Achievement definitions
const achievements = [
  { id: "first-blood", label: "First Blood", desc: "Validated your first idea", icon: <Zap className="w-4 h-4" />, threshold: 1 },
  { id: "serial-thinker", label: "Serial Thinker", desc: "Validated 3 ideas", icon: <Sparkles className="w-4 h-4" />, threshold: 3 },
  { id: "decision-machine", label: "Decision Machine", desc: "Validated 5 ideas", icon: <Crown className="w-4 h-4" />, threshold: 5 },
  { id: "validation-veteran", label: "Validation Veteran", desc: "Validated 10 ideas", icon: <Award className="w-4 h-4" />, threshold: 10 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [validations, setValidations] = useState<ValidationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showDigestPrompt, setShowDigestPrompt] = useState(true);

  const userName = user?.email?.split("@")[0] || "Founder";

  useEffect(() => {
    const fetchValidations = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("validations")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setValidations(data as unknown as ValidationRecord[]);
      setLoading(false);
    };
    fetchValidations();
  }, [user]);

  const viewReport = (record: ValidationRecord) => {
    if (compareMode) {
      setCompareIds(prev => {
        if (prev.includes(record.id)) return prev.filter(id => id !== record.id);
        if (prev.length >= 2) return [prev[1], record.id];
        return [...prev, record.id];
      });
      return;
    }
    sessionStorage.setItem("validationResult", JSON.stringify(record.result_data));
    if (record.form_data) sessionStorage.setItem("validationData", JSON.stringify(record.form_data));
    navigate("/result");
  };

  // Stats
  const goCount = validations.filter(v => v.verdict === "GO").length;
  const pivotCount = validations.filter(v => v.verdict === "PIVOT").length;
  const killCount = validations.filter(v => v.verdict === "KILL").length;
  const bestScore = validations.reduce((max, v) => Math.max(max, v.confidence_score || 0), 0);
  const avgScore = validations.length > 0 
    ? Math.round(validations.reduce((sum, v) => sum + (v.confidence_score || 0), 0) / validations.length)
    : 0;
  const streak = validations.length;

  // Unlocked achievements
  const unlockedAchievements = achievements.filter(a => streak >= a.threshold);

  // Founder archetype
  const getArchetype = () => {
    if (validations.length === 0) return null;
    const latest = validations[0];
    if (!latest.form_data) return null;
    const fd = latest.form_data as any;
    const archetypes: Record<string, string> = { technical: "Builder", sales: "Hustler", operations: "Operator", content: "Storyteller", generalist: "Visionary" };
    return archetypes[fd.coreSkill] || "Founder";
  };

  // Comparison data
  const compareItems = compareIds.map(id => validations.find(v => v.id === id)).filter(Boolean) as ValidationRecord[];

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <nav className="luxury-container py-8 relative z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /><span>Home</span>
          </button>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="font-medium">ValidateFirst</span>
          </div>
        </div>
      </nav>

      <div className="luxury-container py-8 relative z-10">
        {/* Personalized Header with Achievements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{getTimeGreeting()}</p>
              <h1 className="text-3xl md:text-5xl font-semibold mb-3">
                <span className="text-primary">{userName}'s</span>{" "}
                <span className="font-serif italic font-normal gradient-text">Reports</span>
              </h1>
              <p className="text-muted-foreground">Your validation journey and past decisions</p>
            </div>
            {/* Achievement Badges */}
            {unlockedAchievements.length > 0 && (
              <TooltipProvider>
                <div className="flex items-center gap-2">
                  {unlockedAchievements.map(badge => (
                    <Tooltip key={badge.id}>
                      <TooltipTrigger asChild>
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary cursor-pointer hover:bg-primary/20 transition-colors">
                          {badge.icon}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-semibold">{badge.label}</p>
                        <p className="text-xs text-muted-foreground">{badge.desc}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            )}
          </div>
        </motion.div>

        {/* Founder Profile Card */}
        {validations.length > 0 && getArchetype() && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-6 p-5 rounded-xl bg-card border border-border flex items-center gap-4 flex-wrap"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Crown className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Founder Archetype</p>
              <p className="text-lg font-semibold text-primary">{getArchetype()}</p>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <p className="text-2xl font-bold font-mono tabular-nums">{validations.length}</p>
                <p className="text-xs text-muted-foreground">Ideas</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono tabular-nums text-primary">{avgScore}%</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono tabular-nums text-success">{goCount}</p>
                <p className="text-xs text-muted-foreground">GO</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Strip */}
        {validations.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-xs text-muted-foreground mb-1">Total Ideas</p>
              <p className="text-2xl font-bold font-mono tabular-nums">{validations.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-success/5 border border-success/20">
              <p className="text-xs text-success mb-1">GO Verdicts</p>
              <p className="text-2xl font-bold font-mono tabular-nums text-success">{goCount}</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-xs text-primary mb-1">PIVOT</p>
              <p className="text-2xl font-bold font-mono tabular-nums text-primary">{pivotCount}</p>
            </div>
            <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
              <p className="text-xs text-destructive mb-1">KILL</p>
              <p className="text-2xl font-bold font-mono tabular-nums text-destructive">{killCount}</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-xs text-muted-foreground mb-1">Best Score</p>
              <p className="text-2xl font-bold font-mono tabular-nums text-primary">{bestScore}%</p>
            </div>
          </motion.div>
        )}

        {/* Streak + Milestones */}
        {streak >= 2 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="mb-6 flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Flame className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">You're on a {streak}-idea streak!</span>
            </div>
            {/* Next milestone */}
            {(() => {
              const next = achievements.find(a => streak < a.threshold);
              if (!next) return null;
              return (
                <span className="text-xs text-muted-foreground">
                  {next.threshold - streak} more to unlock "{next.label}"
                </span>
              );
            })()}
          </motion.div>
        )}

        {/* Weekly Digest Prompt */}
        {showDigestPrompt && validations.length >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 p-5 rounded-xl bg-card border border-border flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium mb-1">Want weekly market intelligence?</p>
              <p className="text-sm text-muted-foreground mb-3">We'll notify you of trends relevant to your validated ideas.</p>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                  I'm interested
                </button>
                <button onClick={() => setShowDigestPrompt(false)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : validations.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">No validations yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start by validating your first business idea. Get a comprehensive GO, PIVOT, or KILL verdict.
            </p>
            <LuxuryButton onClick={() => navigate("/input")} size="lg" className="group">
              Validate My First Idea
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </LuxuryButton>
          </motion.div>
        ) : (
          <>
            {/* Header + Actions */}
            <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Validation History
              </h2>
              <div className="flex items-center gap-3">
                {validations.length >= 2 && (
                  <button
                    onClick={() => { setCompareMode(!compareMode); setCompareIds([]); }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      compareMode ? "bg-primary/10 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <GitCompare className="w-4 h-4" />
                    {compareMode ? "Cancel Compare" : "Compare"}
                  </button>
                )}
                <LuxuryButton onClick={() => navigate("/input")} size="sm" className="group">
                  New Validation
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </LuxuryButton>
              </div>
            </div>

            {/* Comparison View */}
            <AnimatePresence>
              {compareMode && compareItems.length === 2 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 grid md:grid-cols-2 gap-4"
                >
                  {compareItems.map((item, i) => {
                    const cfg = verdictConfig[item.verdict];
                    return (
                      <div key={item.id} className={`p-6 rounded-xl border ${cfg.border} ${cfg.bg}`}>
                        <div className="flex items-center gap-2 mb-3">
                          {cfg.icon}
                          <span className={`font-bold text-lg ${cfg.color}`}>{item.verdict}</span>
                          <span className="font-mono text-sm text-muted-foreground ml-auto">{item.confidence_score}%</span>
                        </div>
                        <p className="text-sm font-medium mb-2 line-clamp-2">{item.idea_summary}</p>
                        <p className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</p>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {compareMode && (
              <p className="text-xs text-muted-foreground mb-4">
                Select {2 - compareIds.length} idea{compareIds.length === 1 ? "" : "s"} to compare
              </p>
            )}

            {/* Validation Timeline */}
            <div className="space-y-3">
              {validations.map((v, i) => {
                const config = verdictConfig[v.verdict];
                const isSelected = compareIds.includes(v.id);
                return (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => viewReport(v)}
                    className={`group cursor-pointer p-6 rounded-xl bg-card border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_hsl(42_78%_50%/0.15)] ${
                      isSelected ? "border-primary/50 ring-2 ring-primary/20" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                            v.verdict === "GO" ? "bg-success" : v.verdict === "PIVOT" ? "bg-primary" : "bg-destructive"
                          }`} />
                          <p className="font-semibold text-lg truncate">{v.idea_summary}</p>
                        </div>
                        {v.target_customer && (
                          <p className="text-sm text-muted-foreground mb-3 truncate ml-[22px]">
                            <User className="w-3 h-3 inline mr-1" />{v.target_customer}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground ml-[22px]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(v.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                          {v.confidence_score && (
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-3.5 h-3.5" />
                              <span className="font-mono tabular-nums">{v.confidence_score}%</span> confidence
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${config.bg} ${config.border} border ${config.color} flex-shrink-0`}>
                        {config.icon}
                        <span className="font-bold text-sm">{v.verdict}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
