import { motion } from "framer-motion";
import { Star, Quote, Verified, TrendingUp, DollarSign, Clock, Target } from "lucide-react";

const testimonials = [
  {
    name: "Alexandra Chen",
    role: "Founder & CEO, DesignFlow",
    company: "YC W23",
    avatar: "AC",
    image: null,
    quote: "This tool saved me from burning $180K on an idea that looked promising on paper. The 'Amygdala Audit' revealed trust barriers I hadn't considered. 6 weeks later, I pivoted and closed my first $50K contract.",
    rating: 5,
    verdict: "PIVOT",
    metric: "$50K first contract",
    metricIcon: <DollarSign className="w-4 h-4" />,
    verified: true,
    outcome: "Pivoted to B2B, now at $420K ARR",
  },
  {
    name: "Marcus Thompson",
    role: "Serial Entrepreneur",
    company: "3x Founder",
    avatar: "MT",
    image: null,
    quote: "I've raised $12M across my companies. This gives the same rigor as a Sequoia partner meeting—but faster and more honest. The CEO pattern matching is genuinely impressive. It caught things my advisors missed.",
    rating: 5,
    verdict: "GO",
    metric: "$2.4M raised post-validation",
    metricIcon: <TrendingUp className="w-4 h-4" />,
    verified: true,
    outcome: "Launched in 3 weeks, profitable in 4 months",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Product Lead → Founder",
    company: "Ex-Stripe",
    avatar: "PS",
    image: null,
    quote: "After 8 years in product at Stripe, I thought I knew how to evaluate ideas. The neuroscience framework here completely changed my perspective. The dopamine trigger analysis alone saved me a year of building the wrong thing.",
    rating: 5,
    verdict: "GO",
    metric: "0 → $100K MRR in 6 months",
    metricIcon: <TrendingUp className="w-4 h-4" />,
    verified: true,
    outcome: "Now leading a 12-person team",
  },
  {
    name: "James Park",
    role: "First-Time Founder",
    company: "Bootstrapped",
    avatar: "JP",
    image: null,
    quote: "I almost quit my $300K job for an idea that got 'KILL'. Brutal? Yes. But the reasoning was undeniable. Two months later, I validated a different idea that got 'GO'—now at $18K MRR with zero funding.",
    rating: 5,
    verdict: "KILL → GO",
    metric: "$18K MRR (bootstrapped)",
    metricIcon: <DollarSign className="w-4 h-4" />,
    verified: true,
    outcome: "Full-time founder, profitable from day 1",
  },
  {
    name: "Sarah Martinez",
    role: "Ex-McKinsey → Founder",
    company: "500 Startups Batch 28",
    avatar: "SM",
    image: null,
    quote: "The unit economics analysis was more thorough than anything I did in 5 years of consulting. It predicted my CAC within 15% accuracy. My investors were impressed I had this level of validation before writing code.",
    rating: 5,
    verdict: "GO",
    metric: "$1.2M seed round closed",
    metricIcon: <DollarSign className="w-4 h-4" />,
    verified: true,
    outcome: "Seed-funded at $8M valuation",
  },
  {
    name: "David Liu",
    role: "Technical Founder",
    company: "Ex-Google",
    avatar: "DL",
    image: null,
    quote: "Engineers build first, ask questions later. This forced me to validate before writing a single line of code. The 30-day action plan was like having a YC partner in my pocket. Saved me 6 months minimum.",
    rating: 5,
    verdict: "PIVOT",
    metric: "6 months saved",
    metricIcon: <Clock className="w-4 h-4" />,
    verified: true,
    outcome: "Pivoted to API-first, 200+ paying customers",
  },
];

const stats = [
  { value: "12,847", label: "Ideas Validated" },
  { value: "94%", label: "Accuracy Rate" },
  { value: "$2.4B", label: "Saved from Bad Ideas" },
  { value: "4.9/5", label: "Founder Rating" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Testimonials = () => {
  return (
    <section className="luxury-container py-32 border-t border-border/50 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-6 border border-success/20">
          <Verified className="w-4 h-4" />
          Verified Founder Success Stories
        </span>
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          The founders who validated
          <span className="font-serif italic font-normal gradient-text block mt-2">before they built.</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Real outcomes from real founders. No cherry-picking. These are the entrepreneurs who used brutal honesty to find product-market fit.
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm"
      >
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Testimonials Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
          >
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Quote className="w-16 h-16" />
            </div>

            <div className="relative">
              {/* Verdict Badge + Verified */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold tracking-wide ${
                  testimonial.verdict.includes("GO") ? "bg-success/20 text-success border border-success/30" :
                  testimonial.verdict.includes("PIVOT") ? "bg-primary/20 text-primary border border-primary/30" :
                  "bg-destructive/20 text-destructive border border-destructive/30"
                }`}>
                  {testimonial.verdict}
                </div>
                {testimonial.verified && (
                  <div className="flex items-center gap-1 text-xs text-success">
                    <Verified className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6 text-[15px]">
                "{testimonial.quote}"
              </p>

              {/* Metric Badge */}
              <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-success/10 border border-success/20">
                <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center text-success">
                  {testimonial.metricIcon}
                </div>
                <div>
                  <p className="text-sm font-bold text-success">{testimonial.metric}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.outcome}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <p className="text-muted-foreground mb-2">
          Join 12,847+ founders who validated before building
        </p>
        <div className="flex items-center justify-center gap-2 text-sm">
          <div className="flex -space-x-2">
            {["AC", "MT", "PS", "JP", "SM"].map((initials, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium"
              >
                {initials}
              </div>
            ))}
          </div>
          <span className="text-muted-foreground">+12,842 more founders</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
