import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { 
  Check, 
  Sparkles, 
  Zap, 
  Crown, 
  ArrowRight, 
  Shield,
  Star,
  Brain,
  Target,
  TrendingUp
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for testing one idea",
    price: "$19",
    period: "one-time",
    features: [
      "1 idea validation",
      "4 AI agent analysis",
      "GO/PIVOT/KILL verdict",
      "Basic action plan",
      "Email support",
    ],
    icon: <Zap className="w-6 h-6" />,
    popular: false,
    cta: "Validate One Idea",
  },
  {
    name: "Founder",
    description: "Most popular for serious founders",
    price: "$49",
    period: "one-time",
    features: [
      "3 idea validations",
      "5 AI agent analysis (+ CEO Patterns)",
      "Complete unit economics",
      "30-day action plan",
      "Founder-market fit analysis",
      "Distribution channel analysis",
      "Export PDF report",
      "Priority support",
    ],
    icon: <Crown className="w-6 h-6" />,
    popular: true,
    cta: "Get Started",
  },
  {
    name: "Studio",
    description: "For agencies and serial entrepreneurs",
    price: "$149",
    period: "one-time",
    features: [
      "10 idea validations",
      "Everything in Founder",
      "White-label reports",
      "API access",
      "Bulk validation",
      "Team sharing",
      "Dedicated support",
      "Custom integrations",
    ],
    icon: <Sparkles className="w-6 h-6" />,
    popular: false,
    cta: "Contact Us",
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-success/5 rounded-full blur-[100px]" />
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
            <span className="font-bold text-xl">IdeaValidator</span>
          </button>
          <LuxuryButton onClick={() => navigate("/input?paid=true")} size="sm">
            Try Free
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
            <Shield className="w-4 h-4" />
            Money Back Guarantee
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Simple, transparent <span className="font-serif italic font-normal gradient-text">pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Validate your idea before spending months building the wrong thing
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular 
                  ? "bg-card border-2 border-primary glow-box" 
                  : "bg-card border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${
                plan.popular ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
              }`}>
                {plan.icon}
              </div>

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </div>

              <LuxuryButton 
                onClick={() => navigate("/input?paid=true")}
                className={`w-full mb-6 ${!plan.popular && "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </LuxuryButton>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-primary" : "text-success"}`} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold mb-8">Every validation includes</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <Brain className="w-5 h-5" />, label: "Multi-Agent Analysis" },
              { icon: <Target className="w-5 h-5" />, label: "Market Sizing (TAM)" },
              { icon: <TrendingUp className="w-5 h-5" />, label: "Competitor Mapping" },
              { icon: <Shield className="w-5 h-5" />, label: "Risk Assessment" },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  {item.icon}
                </div>
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4">Have questions?</p>
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:underline font-medium"
          >
            Check our FAQ →
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
