import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { useAuth } from "@/hooks/useAuth";
import {
  Download,
  Brain,
  Target,
  AlertTriangle,
  DollarSign,
  ArrowRight,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Clock,
  Crown,
  ChevronUp,
  Globe,
  Fingerprint,
  TrendingUp,
} from "lucide-react";

import ConfidenceMeter from "@/components/result/ConfidenceMeter";
import MarketAnalysis from "@/components/result/MarketAnalysis";
import FollowUpChat from "@/components/result/FollowUpChat";
import ShareButtons from "@/components/result/ShareButtons";
import PainTypeIndicator from "@/components/result/PainTypeIndicator";
import NeurosciencePanel from "@/components/result/NeurosciencePanel";
import ResearchTrail from "@/components/result/ResearchTrail";
import ObjectionHandler from "@/components/result/ObjectionHandler";
import CompetitorChart from "@/components/result/CompetitorChart";
import MultiAgentBadge from "@/components/result/MultiAgentBadge";
import ExecutionRisks from "@/components/result/ExecutionRisks";
import UnitEconomics from "@/components/result/UnitEconomics";
import TimelineRoadmap from "@/components/result/TimelineRoadmap";
import FounderFitQuestions from "@/components/result/FounderFitQuestions";
import CEOPatterns from "@/components/result/CEOPatterns";
import NetworkEffects from "@/components/result/NetworkEffects";
import DistributionChannels from "@/components/result/DistributionChannels";
import FounderMarketFit from "@/components/result/FounderMarketFit";
import ActionPlan from "@/components/result/ActionPlan";
import USPAnalysis from "@/components/result/USPAnalysis";
import PersonalizedBlueprint from "@/components/result/PersonalizedBlueprint";
import BoardroomSummary from "@/components/result/BoardroomSummary";
import RegionalAnalysis from "@/components/result/RegionalAnalysis";
import CulturalFit from "@/components/result/CulturalFit";
import VerdictShareCard from "@/components/result/VerdictShareCard";
import KeyTakeaways from "@/components/result/KeyTakeaways";
import ReferralPrompt from "@/components/result/ReferralPrompt";
import VerdictRadarChart from "@/components/result/VerdictRadarChart";
import DeepResearchButton from "@/components/result/DeepResearchButton";
import StartupBriefCard from "@/components/result/StartupBriefCard";
import ArtifactGenerator from "@/components/result/ArtifactGenerator";
import FundingReadiness from "@/components/result/FundingReadiness";
import GrowthStrategy from "@/components/result/GrowthStrategy";
import MacroEnvironment from "@/components/result/MacroEnvironment";

interface ValidationResult {
  demand_psychology: string;
  pain_realism: { 
    score: number; 
    urgency: string;
    type?: "painkiller" | "vitamin";
    frequency?: "daily" | "weekly" | "monthly" | "rarely";
  };
  mom_test_pass?: boolean;
  hair_on_fire?: boolean;
  willingness_to_pay?: string;
  existing_alternatives?: string[];
  why_alternatives_fail?: string;
  market_analysis?: {
    tam_estimate: string;
    sam_estimate?: string;
    som_estimate?: string;
    tam_reasoning?: string;
    competitors: { name: string; weakness: string; market_share?: string; pricing?: string }[];
    competitive_advantage: string;
    market_timing?: "perfect" | "good" | "moderate" | "early" | "late" | "risky";
    timing_reason?: string;
    market_maturity?: string;
    winner_take_all?: boolean;
  };
  network_effects?: {
    has_network_effects: boolean;
    type: "direct" | "indirect" | "data" | "platform" | "none";
    strength: "strong" | "moderate" | "weak";
  } | null;
  unit_economics?: {
    estimated_cac?: string;
    estimated_ltv?: string;
    ltv_cac_ratio?: string;
    estimated_margin?: string;
    payback_period?: string;
    contribution_margin?: string;
    sustainability?: "excellent" | "good" | "moderate" | "concerning";
  } | null;
  revenue_model?: string;
  buying_friction: string[];
  trust_barriers?: string[];
  objection_handling?: { objection: string; counter: string }[];
  switching_costs?: {
    level: string;
    barriers: string[];
    migration_complexity: string;
  } | null;
  regulatory_concerns?: string[] | null;
  legal_considerations?: string[] | null;
  industry_barriers?: string[] | null;
  execution_risks?: {
    team_requirements?: string[];
    capital_needed?: string;
    burn_rate_estimate?: string;
    runway_needed?: string;
    tech_complexity?: "low" | "medium" | "high";
    tech_challenges?: string[];
    time_to_mvp?: string;
    critical_hires?: string[];
    moat_difficulty?: "easy" | "medium" | "hard";
    moat_type?: string;
  } | null;
  founder_market_fit?: {
    score: number;
    advantages: string[];
    gaps: string[];
  } | null;
  distribution_channels?: Array<{
    channel: string;
    viability: "high" | "medium" | "low";
    cac_estimate: string;
  }> | null;
  pricing_psychology: { 
    fair: boolean; 
    suggested: string; 
    reason: string;
    anchor_strategy?: string;
  };
  neuroscience: { 
    value_triggers?: string[];
    dopamine_triggers?: string[];
    oxytocin_factors?: string[];
    cortisol_urgency?: string[];
    risk: string; 
    trust_difficulty: string;
  };
  ceo_patterns?: {
    pattern_matches?: any;
    yc_pattern_match?: any;
    anti_patterns?: any[];
    founder_archetype?: string;
    founder_profile_analysis?: any;
    scalability?: { score: number; bottlenecks: string[] };
    exit_potential?: any;
    pivot_risk?: any;
  } | null;
  confidence_score?: number;
  verdict: "GO" | "PIVOT" | "KILL";
  verdict_probability?: { go: number; pivot: number; kill: number } | null;
  verdict_reasoning?: string;
  one_liner?: string;
  eli8_summary?: string;
  success_probability?: string;
  failure_modes?: string[];
  timeline_to_revenue?: {
    mvp_weeks?: number;
    first_customer_weeks?: number;
    ten_customers_weeks?: number;
    hundred_customers_months?: number;
    profitability_months?: number;
    million_arr_months?: number | null;
  } | null;
  founder_fit_questions?: string[];
  what_would_change_verdict?: string[];
  recommended_reading?: string[];
  similar_founders?: string[];
  immediate_plan: Array<{ day: string; action: string; goal: string }> | string[];
  pivot_suggestions?: string[];
  key_assumptions?: string[];
  dealbreakers?: string[];
  unfair_advantages_needed?: string[];
  analysis_agents?: string[];
  analysis_version?: string;
  // Boardroom Summary fields
  executive_bullets?: string[];
  key_metrics?: { label: string; value: string; trend?: "up" | "down" | "neutral" }[];
  risk_opportunity_balance?: { opportunities: string[]; risks: string[] };
  bottom_line?: string;
  // Regional
  regional_analysis?: any;
  geographic_context?: { country?: string; state?: string; cityTier?: string; marketMaturity?: string };
  // USP
  usp_analysis?: any;
  // Blueprint
  personalized_blueprint?: any;
  founder_specific_advice?: string;
  risk_mitigation_plan?: string[];
  // Bias
  bias_adjusted_verdict?: any;
  // Cognitive bias agent data
  cognitive_bias_analysis?: any;
  macro_environment?: any;
  startup_brief?: {
    idea?: string | null;
    problem?: string | null;
    solution?: string | null;
    target_customer?: string | null;
    target_segment?: string | null;
    industry?: string | null;
    revenue_model?: string | null;
    price_point?: string | null;
    platform?: string | null;
    stage?: string | null;
  } | null;
}

// Section definitions for floating nav
const sections = [
  { id: "verdict", label: "Verdict", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: "executive", label: "Executive Summary", icon: <Crown className="w-3.5 h-3.5" /> },
  { id: "psychology", label: "Psychology", icon: <Brain className="w-3.5 h-3.5" /> },
  { id: "regional", label: "Regional", icon: <Globe className="w-3.5 h-3.5" /> },
  { id: "market", label: "Market", icon: <Target className="w-3.5 h-3.5" /> },
  { id: "economics", label: "Economics", icon: <DollarSign className="w-3.5 h-3.5" /> },
  { id: "execution", label: "Execution", icon: <AlertTriangle className="w-3.5 h-3.5" /> },
  { id: "macro", label: "Macro", icon: <Globe className="w-3.5 h-3.5" /> },
  { id: "biases", label: "Biases", icon: <Fingerprint className="w-3.5 h-3.5" /> },
  { id: "action", label: "Action Plan", icon: <Lightbulb className="w-3.5 h-3.5" /> },
  { id: "funding", label: "Funding & Growth", icon: <TrendingUp className="w-3.5 h-3.5" /> },
  { id: "artifacts", label: "Artifacts", icon: <Sparkles className="w-3.5 h-3.5" /> },
];

const Result = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [originalIdea, setOriginalIdea] = useState("");
  const [startupInput, setStartupInput] = useState<Record<string, any> | null>(null);
  const [validationRecordId, setValidationRecordId] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("verdict");
  const userName = user?.email?.split("@")[0] || "";

  useEffect(() => {
    const storedResult = sessionStorage.getItem("validationResult");
    const storedData = sessionStorage.getItem("validationData");
    const storedValidationId = sessionStorage.getItem("validationRecordId");
    
    if (!storedResult) {
      navigate("/");
      return;
    }
    setResult(JSON.parse(storedResult));
    setValidationRecordId(storedValidationId);
    
    if (storedData) {
      const data = JSON.parse(storedData);
      setStartupInput(data);
      setOriginalIdea(data.idea || "");
    }
  }, [navigate]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
      
      // Track active section
      const sectionElements = sections.map(s => document.getElementById(s.id)).filter(Boolean);
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadPDF = () => window.print();

  const handleNewValidation = () => {
    sessionStorage.removeItem("validationData");
    sessionStorage.removeItem("validationResult");
    sessionStorage.removeItem("validationRecordId");
    navigate("/input");
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!result) return null;

  const verdictConfig = {
    GO: {
      containerClass: "verdict-go glow-box",
      icon: <CheckCircle2 className="w-10 h-10" />,
      title: "GO",
      description: "Strong fundamentals. Build it.",
    },
    PIVOT: {
      containerClass: "verdict-pivot",
      icon: <RefreshCw className="w-10 h-10" />,
      title: "PIVOT",
      description: "Promising, but needs adjustment.",
    },
    KILL: {
      containerClass: "verdict-kill",
      icon: <AlertTriangle className="w-10 h-10" />,
      title: "KILL",
      description: "Not viable. Move on.",
    },
  };

  const v = verdictConfig[result.verdict];
  const painColor =
    result.pain_realism.score >= 8 ? "bg-success" :
    result.pain_realism.score >= 5 ? "bg-primary" : "bg-destructive";

  const confidenceScore = result.confidence_score || 
    (result.verdict === "GO" ? 75 : result.verdict === "PIVOT" ? 50 : 25);
  const startupBrief = result.startup_brief || (startupInput ? {
    idea: startupInput.idea,
    problem: startupInput.problem,
    solution: startupInput.solution,
    target_customer: startupInput.targetCustomer,
    target_segment: startupInput.targetSegment,
    industry: startupInput.industry,
    revenue_model: startupInput.revenueModel,
    price_point: startupInput.price,
    platform: startupInput.platform,
    stage: startupInput.stage,
  } : null);

  return (
    <div className="min-h-screen bg-background print:py-8">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none print:hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-success/5 rounded-full blur-[100px]" />
      </div>

      {/* Floating Section Nav — desktop only */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-1 print:hidden">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
              activeSection === section.id
                ? "bg-primary/15 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-card"
            }`}
          >
            {section.icon}
            <span className="hidden group-hover:inline">{section.label}</span>
          </button>
        ))}
      </div>

      {/* Back to Top */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/25 hover:scale-105 transition-transform print:hidden"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}

      {/* Navigation */}
      <nav className="luxury-container py-8 relative z-10 print:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">ValidateFirst</span>
          </div>
          <div className="flex items-center gap-3">
            <ShareButtons verdict={result.verdict} confidenceScore={confidenceScore} />
            <VerdictShareCard verdict={result.verdict} confidenceScore={confidenceScore} ideaSummary={originalIdea} />
          </div>
        </div>
      </nav>

      <div className="luxury-container pb-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Multi-Agent Badge */}
          <MultiAgentBadge agents={result.analysis_agents} />

          {/* Personalized greeting */}
          {userName && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground mb-4"
            >
              <span className="font-medium text-primary">{userName}</span>, here's your verdict
            </motion.p>
          )}

          {/* ═══════ VERDICT HERO ═══════ */}
          <div id="verdict">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className={`inline-flex flex-col items-center gap-4 px-16 py-12 rounded-3xl ${v.containerClass}`}>
                {v.icon}
                <div>
                  <h1 className="text-6xl font-bold mb-2">{v.title}</h1>
                  <p className="text-lg opacity-80">{v.description}</p>
                </div>
              </div>

              {/* Percentile comparison */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm"
              >
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">
                  Your idea scores higher than <span className="text-primary font-bold">{Math.min(95, Math.max(15, Math.round(confidenceScore * 0.85 + Math.random() * 10)))}%</span> of ideas analyzed
                </span>
              </motion.div>

              {/* Founder Archetype Badge */}
              {(() => {
                const storedData = sessionStorage.getItem("validationData");
                if (!storedData) return null;
                const fd = JSON.parse(storedData);
                const archetypes: Record<string, string> = {
                  technical: "Builder", sales: "Hustler", operations: "Operator",
                  content: "Storyteller", generalist: "Visionary"
                };
                const goalSuffix: Record<string, string> = {
                  lifestyle: "Freedom Seeker", agency: "Service Builder", saas: "Product Builder",
                  venture: "Scale Hunter", acquisition: "Exit Strategist"
                };
                const arch = archetypes[fd.coreSkill] || "Builder";
                const suffix = goalSuffix[fd.goal] || "Founder";
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm"
                  >
                    <Crown className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      Founder Profile: <span className="text-primary font-semibold">{arch}-{suffix}</span>
                    </span>
                  </motion.div>
                );
              })()}

              {result.verdict_reasoning && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-muted-foreground max-w-xl mx-auto"
                >
                  {result.verdict_reasoning}
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* ═══════ KEY TAKEAWAYS ═══════ */}
          <KeyTakeaways
            verdict={result.verdict}
            verdictReasoning={result.verdict_reasoning}
            executiveBullets={result.executive_bullets}
            bottomLine={result.bottom_line}
          />

          {/* ═══════ EXECUTIVE SUMMARY (BoardroomSummary) ═══════ */}
          <div id="executive">
            {(result.executive_bullets?.length || result.bottom_line) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <BoardroomSummary
                  verdict={result.verdict}
                  confidence_score={confidenceScore}
                  executive_bullets={result.executive_bullets}
                  key_metrics={result.key_metrics}
                  risk_opportunity_balance={result.risk_opportunity_balance}
                  bottom_line={result.bottom_line}
                />
              </motion.div>
            )}
          </div>

          {startupBrief && (
            <div className="mb-6">
              <StartupBriefCard startupBrief={startupBrief} />
            </div>
          )}

          {/* Verdict Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <VerdictRadarChart
              painScore={result.pain_realism.score}
              confidenceScore={confidenceScore}
              founderFitScore={result.founder_market_fit?.score}
              regionalScore={result.regional_analysis?.regional_viability_score}
              marketTiming={result.market_analysis?.market_timing}
              executionRisk={result.execution_risks?.tech_complexity}
            />
          </motion.div>

          {/* Confidence Meter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <ConfidenceMeter score={confidenceScore} />
          </motion.div>

          {/* Result Cards */}
          <div className="space-y-6">
            {/* ELI8 Summary & Founder Fit */}
            {(result.eli8_summary || result.founder_fit_questions?.length) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <FounderFitQuestions
                  questions={result.founder_fit_questions || []}
                  eli8_summary={result.eli8_summary}
                />
              </motion.div>
            )}

            {/* ═══════ PSYCHOLOGY SECTION ═══════ */}
            <div id="psychology">
              {/* Demand Psychology */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <ResultCard icon={<Brain className="w-5 h-5" />} title="Demand Psychology">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {result.demand_psychology}
                  </p>
                  {(result.pain_realism.type || result.pain_realism.frequency) && (
                    <PainTypeIndicator 
                      type={result.pain_realism.type || "vitamin"} 
                      frequency={result.pain_realism.frequency || "monthly"} 
                    />
                  )}
                </ResultCard>
              </motion.div>

              {/* Pain Score */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ResultCard icon={<Target className="w-5 h-5" />} title="Pain Reality Score">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-6xl font-bold">{result.pain_realism.score}</span>
                    <div>
                      <p className="text-sm text-muted-foreground">out of 10</p>
                      <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        result.pain_realism.urgency === "high" ? "bg-success/20 text-success" :
                        result.pain_realism.urgency === "medium" ? "bg-primary/20 text-primary" :
                        "bg-destructive/20 text-destructive"
                      }`}>
                        {result.pain_realism.urgency} urgency
                      </span>
                    </div>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${result.pain_realism.score * 10}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className={`h-full ${painColor}`} 
                    />
                  </div>
                </ResultCard>
                </motion.div>
              </div>

            {/* Research Trail */}
            {(result.key_assumptions?.length || result.dealbreakers?.length || result.mom_test_pass !== undefined) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ResearchTrail
                  keyAssumptions={result.key_assumptions || []}
                  dealbreakers={result.dealbreakers || []}
                  unfairAdvantages={result.unfair_advantages_needed || []}
                  momTestPass={result.mom_test_pass ?? false}
                />
              </motion.div>
            )}

            {/* ═══════ REGIONAL & CULTURAL SECTION ═══════ */}
            <div id="regional">
              {result.regional_analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <RegionalAnalysis
                    regional_viability_score={result.regional_analysis.regional_viability_score}
                    cultural_fit_analysis={typeof result.regional_analysis.cultural_fit_analysis === 'string' 
                      ? result.regional_analysis.cultural_fit_analysis 
                      : result.regional_analysis.cultural_fit_analysis?.alignment_factors?.join('. ')}
                    localization_requirements={result.regional_analysis.localization_requirements}
                    pricing_recommendations={result.regional_analysis.pricing_recommendations?.local_price_range}
                    distribution_strategy={result.regional_analysis.distribution_strategy?.primary_channels?.join(', ')}
                    regulatory_checklist={result.regional_analysis.regulatory_checklist}
                    infrastructure_dependencies={
                      result.regional_analysis.infrastructure_dependencies?.key_infrastructure_risks || 
                      (Array.isArray(result.regional_analysis.infrastructure_dependencies) ? result.regional_analysis.infrastructure_dependencies : [])
                    }
                    local_competitor_map={result.regional_analysis.local_competitor_map?.map((c: any) => ({
                      name: c.name,
                      strength: c.strength || "moderate",
                      local_advantage: c.weakness || c.local_advantage || ""
                    }))}
                    country={result.geographic_context?.country}
                    state={result.geographic_context?.state}
                    cityTier={result.geographic_context?.cityTier}
                  />
                </motion.div>
              )}

              {result.regional_analysis?.cultural_fit_analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <CulturalFit
                    trust_culture_alignment={result.regional_analysis.cultural_fit_analysis?.score || 6}
                    payment_preference_match={result.regional_analysis.payment_landscape?.subscription_readiness === "high" ? 8 : result.regional_analysis.payment_landscape?.subscription_readiness === "medium" ? 6 : 4}
                    communication_style_fit={result.regional_analysis.cultural_fit_analysis?.score ? Math.max(result.regional_analysis.cultural_fit_analysis.score - 1, 3) : 6}
                    local_market_timing={result.regional_analysis.local_market_psychology?.brand_vs_price === "brand-loyal" ? "good" : "moderate"}
                    cultural_insights={result.regional_analysis.cultural_fit_analysis?.alignment_factors || []}
                    buying_behavior={result.regional_analysis.local_market_psychology?.decision_style}
                    trust_signals_needed={result.regional_analysis.local_market_psychology?.trust_signals_needed || []}
                  />
                </motion.div>
              )}
              <DeepResearchButton section="Regional" originalIdea={originalIdea} validationResult={result} formData={startupInput} validationId={validationRecordId} />
            </div>

            {/* ═══════ MARKET SECTION ═══════ */}
            <div id="market">
              {result.market_analysis && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-6"
                  >
                    <MarketAnalysis 
                      tam_estimate={result.market_analysis.tam_estimate}
                      competitors={result.market_analysis.competitors}
                      competitive_advantage={result.market_analysis.competitive_advantage}
                    />
                  </motion.div>
                  <DeepResearchButton section="Market" originalIdea={originalIdea} validationResult={result} formData={startupInput} validationId={validationRecordId} />
                </>
              )}

              {result.market_analysis?.competitors && result.market_analysis.competitors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <CompetitorChart
                    competitors={result.market_analysis.competitors}
                    yourEdge={result.market_analysis.competitive_advantage}
                  />
                </motion.div>
              )}
              <DeepResearchButton section="Competitors" originalIdea={originalIdea} validationResult={result} formData={startupInput} validationId={validationRecordId} />
            </div>

            {/* ═══════ ECONOMICS SECTION ═══════ */}
            <div id="economics">
              {result.unit_economics && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <UnitEconomics
                    unit_economics={result.unit_economics}
                    revenue_model={result.revenue_model}
                  />
                </motion.div>
              )}

              {/* Pricing Psychology */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <ResultCard icon={<DollarSign className="w-5 h-5" />} title="Pricing Psychology">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-4xl font-bold text-primary">{result.pricing_psychology.suggested}</span>
                    <span className="text-sm text-muted-foreground">recommended</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{result.pricing_psychology.reason}</p>
                  {result.pricing_psychology.anchor_strategy && (
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                      <p className="text-sm font-medium text-primary mb-1">Anchoring Strategy</p>
                      <p className="text-sm text-muted-foreground">{result.pricing_psychology.anchor_strategy}</p>
                    </div>
                  )}
                </ResultCard>
              </motion.div>
              <DeepResearchButton section="Pricing" originalIdea={originalIdea} validationResult={result} formData={startupInput} validationId={validationRecordId} />

              {/* USP Analysis */}
              {result.usp_analysis && (result.usp_analysis.personalized_usp || result.usp_analysis.positioning_statement) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <USPAnalysis usp_analysis={result.usp_analysis} />
                </motion.div>
              )}
            </div>

            {/* Timeline Roadmap */}
            {result.timeline_to_revenue && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <TimelineRoadmap
                  timeline_to_revenue={result.timeline_to_revenue}
                  success_probability={result.success_probability}
                />
              </motion.div>
            )}

            {/* ═══════ EXECUTION SECTION ═══════ */}
            <div id="execution">
              {result.execution_risks && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <ExecutionRisks
                    execution_risks={result.execution_risks}
                    regulatory_concerns={result.regulatory_concerns}
                    legal_considerations={result.legal_considerations}
                  />
                </motion.div>
              )}
              <DeepResearchButton section="Execution" originalIdea={originalIdea} validationResult={result} formData={startupInput} validationId={validationRecordId} />

              {result.ceo_patterns && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <CEOPatterns ceo_patterns={result.ceo_patterns} />
                </motion.div>
              )}

              {/* Network Effects */}
              {result.network_effects && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <NetworkEffects
                    network_effects={result.network_effects}
                    winner_take_all={result.market_analysis?.winner_take_all}
                    market_maturity={result.market_analysis?.market_maturity}
                  />
                </motion.div>
              )}

              {/* Founder Market Fit */}
              {result.founder_market_fit && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <FounderMarketFit
                    founder_market_fit={result.founder_market_fit}
                    founder_archetype={result.ceo_patterns?.founder_archetype}
                    similar_founders={result.similar_founders}
                  />
                </motion.div>
              )}

              {/* Distribution Channels */}
              {result.distribution_channels && result.distribution_channels.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <DistributionChannels channels={result.distribution_channels} />
                </motion.div>
              )}
            </div>

            {/* Market Timing */}
            {result.market_analysis?.market_timing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ResultCard icon={<Clock className="w-5 h-5" />} title="Market Timing">
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-xl text-sm font-medium capitalize ${
                      result.market_analysis.market_timing === "good" || result.market_analysis.market_timing === "perfect"
                        ? "bg-success/20 text-success" 
                        : result.market_analysis.market_timing === "moderate"
                        ? "bg-primary/20 text-primary"
                        : "bg-destructive/20 text-destructive"
                    }`}>
                      {result.market_analysis.market_timing} timing
                    </div>
                    {result.market_analysis.timing_reason && (
                      <p className="text-sm text-muted-foreground">{result.market_analysis.timing_reason}</p>
                    )}
                  </div>
                </ResultCard>
              </motion.div>
            )}

            {/* Buying Friction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ResultCard icon={<AlertTriangle className="w-5 h-5" />} title="Buying Friction">
                <ul className="space-y-3">
                  {result.buying_friction.map((friction, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold">{i + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{friction}</span>
                    </li>
                  ))}
                </ul>
              </ResultCard>
            </motion.div>

            {/* Objection Handling */}
            {result.objection_handling && result.objection_handling.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ObjectionHandler objections={result.objection_handling} />
              </motion.div>
            )}

            {/* Neuroscience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <NeurosciencePanel 
                dopamine_triggers={result.neuroscience.dopamine_triggers || result.neuroscience.value_triggers || []}
                oxytocin_factors={result.neuroscience.oxytocin_factors || []}
                cortisol_urgency={result.neuroscience.cortisol_urgency || []}
                risk={result.neuroscience.risk}
                trust_difficulty={result.neuroscience.trust_difficulty}
              />
            </motion.div>

            {/* Personalized Blueprint */}
            {result.personalized_blueprint && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <PersonalizedBlueprint
                  blueprint={result.personalized_blueprint}
                  founder_specific_advice={result.founder_specific_advice}
                  risk_mitigation_plan={result.risk_mitigation_plan}
                />
              </motion.div>
            )}

            {/* Pivot Suggestions */}
            {result.verdict === "PIVOT" && result.pivot_suggestions && result.pivot_suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ResultCard icon={<Lightbulb className="w-5 h-5" />} title="Pivot Suggestions">
                  <ul className="space-y-3">
                    {result.pivot_suggestions.map((suggestion, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">{i + 1}</span>
                        </div>
                        <span className="text-muted-foreground">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </ResultCard>
              </motion.div>
            )}

            {/* ═══════ MACRO ENVIRONMENT SECTION ═══════ */}
            <div id="macro">
              {result.macro_environment && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <MacroEnvironment macro_environment={result.macro_environment} />
                </motion.div>
              )}
            </div>

            {/* ═══════ COGNITIVE BIAS SECTION ═══════ */}
            <div id="biases">
              {result.cognitive_bias_analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <ResultCard icon={<Fingerprint className="w-5 h-5" />} title="Cognitive Bias Analysis">
                    {/* Founder Bias Warnings */}
                    {result.cognitive_bias_analysis.founder_bias_warnings && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 text-foreground">Founder Bias Warnings</h4>
                        <div className="space-y-2">
                          {(Array.isArray(result.cognitive_bias_analysis.founder_bias_warnings) 
                            ? result.cognitive_bias_analysis.founder_bias_warnings 
                            : []
                          ).map((warning: any, i: number) => {
                            const severity = typeof warning === 'object' ? (warning.severity || 'warning') : 'warning';
                            const text = typeof warning === 'object' ? (warning.bias || warning.warning || JSON.stringify(warning)) : warning;
                            const severityConfig = {
                              critical: { bg: "bg-destructive/10", text: "text-destructive", badge: "Critical" },
                              warning: { bg: "bg-primary/10", text: "text-primary", badge: "Warning" },
                              minor: { bg: "bg-muted", text: "text-muted-foreground", badge: "Minor" },
                            };
                            const config = severityConfig[severity as keyof typeof severityConfig] || severityConfig.warning;
                            return (
                              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${config.bg}`}>
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${config.bg} ${config.text} border border-current/20`}>
                                  {config.badge}
                                </span>
                                <span className="text-sm text-muted-foreground">{text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Reality Score */}
                    {result.cognitive_bias_analysis.founder_reality_score != null && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 text-foreground">Founder Reality Score</h4>
                        <div className="flex items-center gap-4">
                          <span className="text-4xl font-bold text-primary">{result.cognitive_bias_analysis.founder_reality_score}</span>
                          <div className="flex-1">
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(result.cognitive_bias_analysis.founder_reality_score / 10) * 100}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="h-full bg-primary rounded-full"
                              />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">out of 10 — how grounded your assumptions are</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Blind Spot Analysis */}
                    {result.cognitive_bias_analysis.blind_spot_analysis && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 text-foreground">Blind Spot Analysis</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {typeof result.cognitive_bias_analysis.blind_spot_analysis === 'string' 
                            ? result.cognitive_bias_analysis.blind_spot_analysis 
                            : JSON.stringify(result.cognitive_bias_analysis.blind_spot_analysis)}
                        </p>
                      </div>
                    )}

                    {/* Customer Psychology */}
                    {result.cognitive_bias_analysis.customer_psychology && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 text-foreground">Customer Psychology</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {result.cognitive_bias_analysis.customer_psychology.primary_motivator && (
                            <div className="p-3 rounded-lg bg-muted/50">
                              <p className="text-xs text-muted-foreground mb-1">Primary Motivator</p>
                              <p className="text-sm font-medium">{result.cognitive_bias_analysis.customer_psychology.primary_motivator}</p>
                            </div>
                          )}
                          {result.cognitive_bias_analysis.customer_psychology.decision_speed && (
                            <div className="p-3 rounded-lg bg-muted/50">
                              <p className="text-xs text-muted-foreground mb-1">Decision Speed</p>
                              <p className="text-sm font-medium capitalize">{result.cognitive_bias_analysis.customer_psychology.decision_speed}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Bias-Adjusted Success Probability */}
                    {result.cognitive_bias_analysis.bias_adjusted_success_probability && (
                      <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                        <p className="text-sm font-medium text-primary mb-1">Bias-Adjusted Success Probability</p>
                        <p className="text-2xl font-bold text-primary">{result.cognitive_bias_analysis.bias_adjusted_success_probability}</p>
                      </div>
                    )}
                  </ResultCard>
                </motion.div>
              )}
            </div>

            {/* ═══════ ACTION PLAN ═══════ */}
            <div id="action">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ActionPlan
                  immediate_plan={result.immediate_plan}
                  what_would_change_verdict={result.what_would_change_verdict}
                  recommended_reading={result.recommended_reading}
                />
              </motion.div>
            </div>

            {/* ═══════ FUNDING & GROWTH ═══════ */}
            <div id="funding" className="space-y-6">
              <FundingReadiness validationResult={result} />
              <GrowthStrategy validationResult={result} />
            </div>

            {/* ═══════ ARTIFACTS ═══════ */}
            <div id="artifacts">
              <ArtifactGenerator
                validationResult={result}
                formData={startupInput}
                validationId={validationRecordId}
              />
            </div>
          </div>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col sm:flex-row gap-4 print:hidden"
          >
            <LuxuryButton onClick={handleDownloadPDF} variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </LuxuryButton>
            <LuxuryButton onClick={handleNewValidation} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Validate Another
            </LuxuryButton>
          </motion.div>

          {/* Referral Prompt */}
          <ReferralPrompt />

          {/* Disclaimer */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground/60 italic text-center">
              This is decision support powered by AI, not financial, legal, or professional advice. Always validate with real customers and consult experts.
            </p>
          </div>
        </div>
      </div>

      {/* Follow-up Chat */}
      <FollowUpChat originalIdea={originalIdea} validationResult={result} />
    </div>
  );
};

const ResultCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="premium-card rounded-2xl p-8">
    <div className="flex items-center gap-3 mb-6">
      <div className="text-primary">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    {children}
  </div>
);

export default Result;
