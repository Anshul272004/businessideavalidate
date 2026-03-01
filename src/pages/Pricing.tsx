import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { Check, ArrowRight, ArrowLeft, Target } from "lucide-react";

const plans = [
  {
    name: "Essential",
    description: "Surface-level analysis for early exploration",
    price: "$29",
    period: "per evaluation",
    features: [
      "Single idea evaluation",
      "5 analysis agents",
      "GO / PIVOT / KILL verdict",
      "Basic action steps",
      "48-hour email support",
    ],
    popular: false,
    cta: "Begin Evaluation",
  },
  {
    name: "Founder",
    description: "Complete analysis for serious decisions",
    price: "$79",
    period: "per evaluation",
    features: [
      "Single idea evaluation",
      "8 analysis agents (full suite)",
      "Founder-market fit analysis",
      "Cognitive bias detection",
      "Regional market intelligence",
      "Personalized blueprint",
      "Unit economics projection",
      "Distribution channel mapping",
      "CEO pattern matching",
      "Exportable PDF report",
      "Priority support",
    ],
    popular: true,
    cta: "Begin Evaluation",
  },
  {
    name: "Decision Companion",
    description: "Ongoing access for serial founders",
    price: "$249",
    period: "per quarter",
    features: [
      "5 idea evaluations per quarter",
      "Everything in Founder",
      "Compare ideas side-by-side",
      "Validation history dashboard",
      "Monthly trend updates",
      "Direct analyst access",
      "White-label reports",
      "API access",
    ],
    popular: false,
    cta: "Contact Us",
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="luxury-container py-8 relative z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="font-medium">ValidateFirst</span>
          </div>
        </div>
      </nav>

      <div className="luxury-container py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">Investment</p>
          <h1 className="text-4xl md:text-6xl font-semibold mb-4">
            Choose your <span className="font-serif italic font-normal gradient-text">depth</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The cost of a bad decision is measured in years, not dollars. 
            The cost of clarity is measured in minutes.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-xl p-8 ${
                plan.popular 
                  ? "bg-card border-2 border-primary" 
                  : "bg-card border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full uppercase tracking-wide">
                    Recommended
                  </span>
                </div>
              )}

              <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-semibold">{plan.price}</span>
                <span className="text-muted-foreground ml-2 text-sm">{plan.period}</span>
              </div>

              <LuxuryButton 
                onClick={() => navigate("/input")}
                className={`w-full mb-6 ${!plan.popular && "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </LuxuryButton>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-sm text-muted-foreground mb-4">
            All evaluations include our pattern-matched verdict and personalized action steps. 
            Higher tiers provide deeper analysis and founder-specific recommendations.
          </p>
          <p className="text-xs text-muted-foreground">
            Not satisfied? Email within 24 hours for a full refund. No questions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
