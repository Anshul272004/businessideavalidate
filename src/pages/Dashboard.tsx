import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { 
  Target, ArrowLeft, ArrowRight, CheckCircle2, RefreshCw, 
  AlertTriangle, Calendar, TrendingUp, Loader2, Sparkles 
} from "lucide-react";

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
  GO: { icon: <CheckCircle2 className="w-5 h-5" />, color: "text-success", bg: "bg-success/10", border: "border-success/30" },
  PIVOT: { icon: <RefreshCw className="w-5 h-5" />, color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  KILL: { icon: <AlertTriangle className="w-5 h-5" />, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30" },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [validations, setValidations] = useState<ValidationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValidations = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("validations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setValidations(data as unknown as ValidationRecord[]);
      }
      setLoading(false);
    };
    fetchValidations();
  }, [user]);

  const viewReport = (record: ValidationRecord) => {
    sessionStorage.setItem("validationResult", JSON.stringify(record.result_data));
    if (record.form_data) {
      sessionStorage.setItem("validationData", JSON.stringify(record.form_data));
    }
    navigate("/result");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <nav className="luxury-container py-8 relative z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="font-medium">ValidateFirst</span>
          </div>
        </div>
      </nav>

      <div className="luxury-container py-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-3xl md:text-5xl font-semibold mb-3">
            My <span className="font-serif italic font-normal gradient-text">Reports</span>
          </h1>
          <p className="text-muted-foreground">Your validation history and past decisions</p>
        </motion.div>

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
          <div className="grid gap-4">
            {validations.map((v, i) => {
              const config = verdictConfig[v.verdict];
              return (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => viewReport(v)}
                  className="group cursor-pointer p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-lg mb-1 truncate">{v.idea_summary}</p>
                      {v.target_customer && (
                        <p className="text-sm text-muted-foreground mb-3 truncate">Target: {v.target_customer}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(v.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        {v.confidence_score && (
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" />
                            {v.confidence_score}% confidence
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;
