import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, Crown } from "lucide-react";

const plans = [
  {
    name: "Essential",
    price: "$29",
    period: "per evaluation",
    description: "Surface-level analysis for early exploration",
    features: [
      "Single idea evaluation",
      "5 analysis agents",
      "GO / PIVOT / KILL verdict",
      "Basic action steps",
      "48-hour email support",
    ],
    popular: false,
  },
  {
    name: "Founder",
    price: "$79",
    period: "per evaluation",
    description: "Complete analysis for serious decisions",
    features: [
      "9 specialized analysis agents",
      "Macro environment analysis",
      "Founder-market fit analysis",
      "Cognitive bias detection",
      "Regional market intelligence",
      "Unit economics projection",
      "CEO pattern matching",
      "Exportable PDF report",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Decision Companion",
    price: "$249",
    period: "per quarter",
    description: "Ongoing access for serial founders",
    features: [
      "5 evaluations per quarter",
      "Everything in Founder",
      "Compare ideas side-by-side",
      "Validation history dashboard",
      "Monthly trend updates",
      "Direct analyst access",
    ],
    popular: false,
  },
];

const PricingCards = () => {
  const navigate = useNavigate();

  return (
    <section className="luxury-container py-28 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm text-primary mb-4 uppercase tracking-widest font-medium font-sans">Investment</p>
        <h2 className="text-heading font-bold mb-4">
          Choose your <span className="gradient-text italic">depth</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto font-sans">
          The cost of a bad decision is measured in years, not dollars
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl p-8 transition-all duration-280 hover-lift ${
              plan.popular
                ? "bg-card border-2 border-primary/40 glow-subtle"
                : "bg-card border border-border hover:border-primary/20"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-primary text-primary-foreground text-xs font-medium font-sans rounded-full uppercase tracking-wide flex items-center gap-1.5">
                  <Crown className="w-3 h-3" /> Most Popular
                </span>
              </div>
            )}

            <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mb-6 font-sans">{plan.description}</p>

            <div className="mb-8">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground ml-2 text-sm font-sans">{plan.period}</span>
            </div>

            <button
              onClick={() => navigate("/input")}
              className={`w-full py-3 rounded-xl text-sm font-medium font-sans flex items-center justify-center gap-2 transition-all duration-200 haptic-click mb-8 ${
                plan.popular
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>

            <ul className="space-y-3">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-2 text-sm font-sans">
                  <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricingCards;