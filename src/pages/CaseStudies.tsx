import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle, 
  RefreshCw,
  XCircle,
  Quote,
  DollarSign,
  Users,
  Clock
} from "lucide-react";

const caseStudies = [
  {
    verdict: "GO",
    idea: "AI-powered legal document review for small law firms",
    founder: "Sarah Chen",
    avatar: "SC",
    before: {
      stage: "Just an idea",
      uncertainty: "High - didn't know if small firms would pay",
    },
    after: {
      mrr: "$12k MRR",
      timeline: "4 months",
      customers: "23 law firms",
    },
    keyInsight: "The validator identified that small firms spend 40% of billable hours on document review - a clear 'bleeding neck' problem. The 30-day action plan led directly to first 3 customers.",
    quote: "The multi-agent analysis found competitor weaknesses I hadn't considered. Knowing my TAM was $2.4B gave me confidence to quit my job.",
  },
  {
    verdict: "PIVOT",
    idea: "Social fitness app for gym-goers",
    founder: "Marcus Johnson",
    avatar: "MJ",
    before: {
      stage: "Had MVP built",
      uncertainty: "Moderate - some traction but low retention",
    },
    pivot: {
      from: "B2C social fitness",
      to: "B2B gym retention platform",
    },
    after: {
      mrr: "$8k MRR",
      timeline: "6 months",
      customers: "12 gym chains",
    },
    keyInsight: "The Amygdala Audit revealed high switching costs for consumers. The pivot suggestion to sell to gyms instead transformed the business model.",
    quote: "I was about to raise funding for the wrong idea. The PIVOT verdict hurt, but the pivot suggestions led to actual revenue.",
  },
  {
    verdict: "KILL",
    idea: "Blockchain-based loyalty points exchange",
    founder: "David Park",
    avatar: "DP",
    before: {
      stage: "Pre-seed raised",
      uncertainty: "Low - was confident this would work",
    },
    avoided: {
      wasted: "$200k in runway",
      time: "18 months of building",
    },
    keyInsight: "The Money Trail agent exposed that 94% of loyalty points are never redeemed - there's no 'hair on fire' problem. The KILL verdict saved $200k in wasted funding.",
    quote: "Getting a KILL was devastating, but the detailed reasoning convinced me. I pivoted to a different startup that's now doing $50k MRR.",
    newVenture: "Now running profitable SaaS",
  },
];

const CaseStudies = () => {
  const navigate = useNavigate();

  const verdictConfig = {
    GO: {
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-success",
      bg: "bg-success/10",
      border: "border-success/30",
    },
    PIVOT: {
      icon: <RefreshCw className="w-6 h-6" />,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/30",
    },
    KILL: {
      icon: <XCircle className="w-6 h-6" />,
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/30",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="luxury-container py-8 relative z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">ValidateFirst</span>
          </button>
          <LuxuryButton onClick={() => navigate("/input")} size="sm">
            Validate My Idea
          </LuxuryButton>
        </div>
      </nav>

      <div className="luxury-container py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Real founders, <span className="font-serif italic font-normal gradient-text">real results</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            See how our validation helped founders make better decisions
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => {
            const config = verdictConfig[study.verdict as keyof typeof verdictConfig];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="p-8 border-b border-border">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 flex items-center justify-center text-lg font-bold">
                        {study.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{study.founder}</h3>
                        <p className="text-muted-foreground text-sm">{study.idea}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${config.bg} ${config.border} border ${config.color}`}>
                      {config.icon}
                      <span className="font-bold">{study.verdict}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Before */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-4">BEFORE VALIDATION</p>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <span className="text-xs text-muted-foreground">Stage</span>
                          <p className="font-medium">{study.before.stage}</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <span className="text-xs text-muted-foreground">Uncertainty Level</span>
                          <p className="font-medium">{study.before.uncertainty}</p>
                        </div>
                      </div>
                    </div>

                    {/* After */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-4">
                        {study.verdict === "KILL" ? "WHAT WAS AVOIDED" : "AFTER VALIDATION"}
                      </p>
                      {study.after && (
                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 bg-success/10 border border-success/20 rounded-lg text-center">
                            <DollarSign className="w-4 h-4 text-success mx-auto mb-1" />
                            <p className="font-bold text-success">{study.after.mrr}</p>
                          </div>
                          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-center">
                            <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                            <p className="font-bold text-primary">{study.after.timeline}</p>
                          </div>
                          <div className="p-3 bg-muted rounded-lg text-center">
                            <Users className="w-4 h-4 mx-auto mb-1" />
                            <p className="font-bold">{study.after.customers}</p>
                          </div>
                        </div>
                      )}
                      {study.avoided && (
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-success/10 border border-success/20 rounded-lg text-center">
                            <p className="text-xs text-success mb-1">Saved</p>
                            <p className="font-bold text-success">{study.avoided.wasted}</p>
                          </div>
                          <div className="p-3 bg-success/10 border border-success/20 rounded-lg text-center">
                            <p className="text-xs text-success mb-1">Time Saved</p>
                            <p className="font-bold text-success">{study.avoided.time}</p>
                          </div>
                        </div>
                      )}
                      {study.pivot && (
                        <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                          <p className="text-xs text-primary mb-2">Pivot Direction</p>
                          <p className="text-sm">
                            <span className="line-through text-muted-foreground">{study.pivot.from}</span>
                            <ArrowRight className="w-3 h-3 inline mx-2" />
                            <span className="font-medium">{study.pivot.to}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Key Insight */}
                  <div className="mt-8 p-4 bg-muted/50 rounded-xl">
                    <p className="text-sm font-medium text-primary mb-2">Key Insight from Validation</p>
                    <p className="text-muted-foreground">{study.keyInsight}</p>
                  </div>

                  {/* Quote */}
                  <div className="mt-6 flex gap-4">
                    <Quote className="w-8 h-8 text-primary/30 flex-shrink-0" />
                    <div>
                      <p className="italic text-muted-foreground">"{study.quote}"</p>
                      <p className="text-sm font-medium mt-2">{study.founder}</p>
                      {study.newVenture && (
                        <p className="text-xs text-success mt-1">{study.newVenture}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to validate your idea?</h2>
          <p className="text-muted-foreground mb-8">
            Join 2,847+ founders who've made better decisions with our validation
          </p>
          <LuxuryButton onClick={() => navigate("/input")} size="lg" className="glow-box">
            Validate My Idea
            <ArrowRight className="w-5 h-5 ml-2" />
          </LuxuryButton>
        </motion.div>
      </div>
    </div>
  );
};

export default CaseStudies;
