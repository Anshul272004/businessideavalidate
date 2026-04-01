import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "per evaluation",
    description: "Quick validation for early-stage ideas",
    features: [
      "Single idea evaluation",
      "5 analysis agents",
      "GO / PIVOT / KILL verdict",
      "Basic action steps",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Founder",
    price: "$79",
    period: "per evaluation",
    description: "Complete intelligence for serious founders",
    features: [
      "8 analysis agents (full suite)",
      "Founder-market fit analysis",
      "Cognitive bias detection",
      "Unit economics projection",
      "Competitor deep-dive",
      "MVP roadmap generator",
      "Exportable PDF report",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Scale",
    price: "$249",
    period: "per quarter",
    description: "For serial founders and teams",
    features: [
      "5 evaluations per quarter",
      "Everything in Founder",
      "Side-by-side comparison",
      "Pitch deck generator",
      "Business plan generator",
      "Validation dashboard",
      "API access",
    ],
    popular: false,
  },
];

const PricingCards = () => {
  const navigate = useNavigate();

  return (
    <section className="luxury-container py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm text-primary mb-4 uppercase tracking-widest font-medium">Pricing</p>
        <h2 className="text-heading font-bold mb-4">
          Invest in <span className="gradient-text">clarity</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          The cost of a bad decision is measured in years. The cost of clarity is minutes.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative glass rounded-2xl p-8 transition-all duration-300 hover-lift ${
              plan.popular ? "border-primary/50 shadow-[0_0_40px_-15px_hsl(220_90%_60%/0.3)]" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </span>
              </div>
            )}

            <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mb-5">{plan.description}</p>

            <div className="mb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground ml-2 text-sm">{plan.period}</span>
            </div>

            <button
              onClick={() => navigate("/input")}
              className={`w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 haptic-click mb-6 ${
                plan.popular
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 animate-breathing-glow"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
              }`}
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>

            <ul className="space-y-2.5">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-2 text-sm">
                  <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-8 text-sm text-muted-foreground"
      >
        24-hour money-back guarantee. No questions asked.
      </motion.p>
    </section>
  );
};

export default PricingCards;
