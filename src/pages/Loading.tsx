import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  DollarSign, 
  Shield, 
  CheckCircle2,
  Lock,
  Zap,
  Globe,
  Eye,
  Crown,
  Fingerprint
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { countries } from "@/data/countries";

const analysisAgents = [
  { name: "Dopamine Detective", icon: <Brain className="w-5 h-5" />, description: "Scanning demand psychology and buying motivation", color: "from-purple-500 to-pink-500", bgColor: "bg-purple-500/20", textColor: "text-purple-400" },
  { name: "Money Trail", icon: <DollarSign className="w-5 h-5" />, description: "Mapping market dynamics and unit economics", color: "from-emerald-500 to-teal-500", bgColor: "bg-emerald-500/20", textColor: "text-emerald-400" },
  { name: "Amygdala Audit", icon: <Shield className="w-5 h-5" />, description: "Evaluating execution risks and trust barriers", color: "from-orange-500 to-red-500", bgColor: "bg-orange-500/20", textColor: "text-orange-400" },
  { name: "CEO Pattern Matcher", icon: <Crown className="w-5 h-5" />, description: "Matching against 100,000+ founder patterns", color: "from-amber-500 to-yellow-500", bgColor: "bg-amber-500/20", textColor: "text-amber-400" },
  { name: "USP Generator", icon: <Sparkles className="w-5 h-5" />, description: "Crafting your unique positioning", color: "from-cyan-500 to-blue-500", bgColor: "bg-cyan-500/20", textColor: "text-cyan-400" },
  { name: "Regional Analyst", icon: <Globe className="w-5 h-5" />, description: "Analyzing geographic and cultural factors", color: "from-indigo-500 to-violet-500", bgColor: "bg-indigo-500/20", textColor: "text-indigo-400" },
  { name: "Cognitive Bias Analyst", icon: <Fingerprint className="w-5 h-5" />, description: "Detecting founder and customer biases", color: "from-rose-500 to-pink-500", bgColor: "bg-rose-500/20", textColor: "text-rose-400" },
  { name: "Verdict Synthesizer", icon: <Zap className="w-5 h-5" />, description: "Compiling boardroom-ready assessment", color: "from-primary to-amber-500", bgColor: "bg-primary/20", textColor: "text-primary" },
];

const insights = [
  { text: "89% of startups fail because they solve the wrong problem", category: "Market Psychology" },
  { text: "Loss aversion is 2x stronger than gain motivation — use it in your positioning", category: "Neuroscience" },
  { text: "The Dunning-Kruger Effect causes 73% of founders to overestimate market readiness", category: "Cognitive Bias" },
  { text: "Price anchoring can increase conversions by 300% when done correctly", category: "Pricing Psychology" },
  { text: "Confirmation bias is the #1 killer of objective market validation", category: "Founder Bias" },
  { text: "Social proof increases purchase intent by 63% across all demographics", category: "Trust Psychology" },
  { text: "Painkiller products outsell vitamin products 10:1 in early-stage markets", category: "Demand Science" },
  { text: "Trust takes 7+ positive interactions to build but 1 negative to destroy", category: "Behavioral Science" },
  { text: "Founders in emerging markets who localize pricing see 3.5x higher conversion", category: "Regional Intelligence" },
  { text: "The sunk cost fallacy keeps 40% of founders committed to failing ideas too long", category: "Decision Science" },
];

const Loading = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentAgent, setCurrentAgent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);
  const [completedAgents, setCompletedAgents] = useState<number[]>([]);
  const [personalFact, setPersonalFact] = useState("");

  useEffect(() => {
    const formDataStr = sessionStorage.getItem("validationData");
    if (!formDataStr) {
      navigate("/");
      return;
    }

    const formData = JSON.parse(formDataStr);
    sessionStorage.removeItem("validationRecordId");

    // Generate personalized fun fact
    const countryName = countries.find(c => c.code === formData.country)?.name || "your region";
    const userName = user?.email?.split("@")[0] || "Founder";
    const facts = [
      `${userName}, founders in ${countryName} who validate first are 3.2x more likely to succeed`,
      `${userName}, ${countryName}-based startups that use data-driven decisions raise 2.5x more funding`,
      `${userName}, 82% of successful founders in ${countryName} validated before building`,
    ];
    setPersonalFact(facts[Math.floor(Math.random() * facts.length)]);

    // Agent progression
    const agentTimings = [0, 2500, 5000, 7500, 10000, 12500, 15000, 17500];
    agentTimings.forEach((time, index) => {
      setTimeout(() => {
        setCurrentAgent(index);
        if (index > 0) setCompletedAgents(prev => [...prev, index - 1]);
      }, time);
    });

    setTimeout(() => setCompletedAgents([0, 1, 2, 3, 4, 5, 6, 7]), 19000);

    const progressInterval = setInterval(() => {
      setProgress(prev => prev >= 90 ? 90 : prev + 0.45);
    }, 100);

    const insightInterval = setInterval(() => {
      setInsightIndex(prev => (prev + 1) % insights.length);
    }, 4000);

    const validateIdea = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("validate-idea", {
          body: {
            idea: formData.idea,
            problem: formData.problem,
            solution: formData.solution,
            targetCustomer: formData.targetCustomer,
            targetSegment: formData.targetSegment,
            industry: formData.industry,
            revenueModel: formData.revenueModel,
            price: formData.price,
            platform: formData.platform,
            stage: formData.stage,
            uniqueInsight: formData.uniqueInsight,
            country: formData.country, state: formData.state, cityTier: formData.cityTier,
            marketMaturity: formData.marketMaturity, customerLocation: formData.customerLocation,
            paymentMaturity: formData.paymentMaturity, trustCulture: formData.trustCulture,
            regulatoryEnvironment: formData.regulatoryEnvironment, infrastructure: formData.infrastructure,
            age: formData.age, coreSkill: formData.coreSkill, industryYears: formData.industryYears,
            energyLevel: formData.energyLevel, previousBusiness: formData.previousBusiness,
            budget: formData.budget, monthlyBurn: formData.monthlyBurn, riskTolerance: formData.riskTolerance,
            hoursPerDay: formData.hoursPerDay, deadline: formData.deadline,
            investorAccess: formData.investorAccess, customerAccess: formData.customerAccess,
            goal: formData.goal, competitiveAdvantage: formData.competitiveAdvantage,
          },
        });
        if (error) throw error;
        setProgress(100);
        setCompletedAgents([0, 1, 2, 3, 4, 5, 6, 7]);
        sessionStorage.setItem("validationResult", JSON.stringify(data));
        if (user) {
          try {
            const { data: savedValidation } = await supabase
              .from("validations")
              .insert({
                user_id: user.id,
                idea_summary: formData.idea?.substring(0, 500) || "Untitled idea",
                target_customer: formData.targetCustomer || null,
                verdict: data.verdict,
                confidence_score: data.confidence_score || null,
                result_data: data,
                form_data: formData,
              } as any)
              .select("id")
              .single();

            if (savedValidation?.id) {
              sessionStorage.setItem("validationRecordId", savedValidation.id);
            }
          } catch (e) {
            console.error("Failed to save validation:", e);
          }
        }
        setTimeout(() => navigate("/result"), 800);
      } catch (error: any) {
        console.error("Validation error:", error);
        if (error.message?.includes("429")) toast.error("Rate limit exceeded. Please try again in a moment.");
        else if (error.message?.includes("402")) toast.error("AI credits exhausted.");
        else toast.error("Analysis failed. Please try again.");
        setTimeout(() => navigate("/input"), 2000);
      }
    };

    validateIdea();
    return () => { clearInterval(progressInterval); clearInterval(insightInterval); };
  }, [navigate]);

  const progressMarkers = [0, 25, 50, 75, 100];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" 
        />
      </div>

      <div className="luxury-container text-center relative z-10 max-w-4xl mx-auto px-4">
        {/* Brain Animation */}
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            <motion.div animate={{ scale: [1, 1.5], opacity: [0.3, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full border-2 border-primary" />
            <motion.div animate={{ scale: [1, 1.3], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute inset-0 rounded-full border border-primary" />
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/30 to-transparent" />
            <div className="relative w-24 h-24 rounded-full bg-card border border-primary/50 flex items-center justify-center">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Brain className="w-10 h-10 text-primary" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Progress Number with spring */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-2">
          <motion.span 
            key={Math.floor(progress)}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-5xl font-bold font-mono gradient-text inline-block"
          >
            {Math.floor(progress)}%
          </motion.span>
        </motion.div>
        <p className="text-sm text-muted-foreground mb-2">8-Agent Multi-Dimensional Analysis</p>
        <p className="text-xs text-muted-foreground/60 mb-6">Estimated time: ~30 seconds</p>

        {/* Progress Bar */}
        <div className="max-w-lg mx-auto mb-10">
          <div className="relative h-3 bg-card rounded-full overflow-hidden border border-border">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-success" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>
          <div className="flex justify-between mt-2">
            {progressMarkers.map(marker => (
              <span key={marker} className={`text-xs font-mono ${progress >= marker ? 'text-primary' : 'text-muted-foreground/50'}`}>{marker}%</span>
            ))}
          </div>
        </div>

        {/* Agent Grid */}
        <div className="mb-8">
          <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">Specialist Agents</p>
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {analysisAgents.map((agent, index) => {
              const isActive = currentAgent === index;
              const isComplete = completedAgents.includes(index);
              return (
                <motion.div key={agent.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                  className={`relative p-3 md:p-4 rounded-xl border transition-all duration-300 ${
                    isComplete ? "bg-success/10 border-success/30" : isActive ? `${agent.bgColor} border-primary/30` : "bg-card/50 border-border/50"
                  }`}
                >
                  {isActive && !isComplete && (
                    <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} className={`absolute inset-0 rounded-xl bg-gradient-to-r ${agent.color} opacity-10`} />
                  )}
                  <div className="relative">
                    <div className={`w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center ${isComplete ? "bg-success/20 text-success" : `${agent.bgColor} ${agent.textColor}`}`}>
                      {isComplete ? <CheckCircle2 className="w-4 h-4" /> : agent.icon}
                    </div>
                    <p className={`text-[10px] md:text-xs font-medium leading-tight ${isComplete ? "text-success" : isActive ? agent.textColor : "text-muted-foreground/70"}`}>
                      {agent.name}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Current Agent Description */}
        <AnimatePresence mode="wait">
          <motion.div key={currentAgent} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6">
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border ${analysisAgents[currentAgent]?.bgColor} border-primary/20`}>
              <motion.span animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className={analysisAgents[currentAgent]?.textColor}>
                {analysisAgents[currentAgent]?.icon}
              </motion.span>
              <span className="font-medium text-sm">{analysisAgents[currentAgent]?.description}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Personalized Fun Fact */}
        {personalFact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="mb-6 max-w-md mx-auto p-4 rounded-xl bg-primary/5 border border-primary/15"
          >
            <p className="text-[10px] text-primary font-semibold uppercase tracking-wider mb-1">Fun Fact</p>
            <p className="text-sm text-foreground">{personalFact}</p>
          </motion.div>
        )}

        {/* Psychology Insight Carousel */}
        <AnimatePresence mode="wait">
          <motion.div key={insightIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}
            className="max-w-md mx-auto p-5 bg-card/60 border border-border/50 rounded-xl backdrop-blur-sm"
          >
            <p className="text-[10px] text-primary font-semibold uppercase tracking-wider mb-2">{insights[insightIndex].category}</p>
            <p className="text-sm text-foreground leading-relaxed">{insights[insightIndex].text}</p>
          </motion.div>
        </AnimatePresence>

        {/* Security Badge */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-10 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><Lock className="w-3 h-3" /><span>100% Confidential</span></div>
          <span className="w-px h-3 bg-border" />
          <div className="flex items-center gap-1.5"><Eye className="w-3 h-3" /><span>Your data is never stored</span></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
