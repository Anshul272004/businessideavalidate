import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alexandra Chen",
    role: "Founder, DesignFlow",
    company: "YC W23",
    avatar: "AC",
    quote: "This analysis revealed trust barriers I had not considered. Six weeks later, I pivoted and closed my first enterprise contract.",
    rating: 5,
    verdict: "PIVOT",
    outcome: "Now at $420K ARR",
    country: "US",
    flag: "🇺🇸",
    industry: "Design Tools",
  },
  {
    name: "Rahul Sharma",
    role: "Serial Entrepreneur",
    company: "3x Founder",
    avatar: "RS",
    quote: "The regional analysis was game-changing. It showed me why my India-first pricing needed to be completely different from US competitors.",
    rating: 5,
    verdict: "GO",
    outcome: "₹2Cr ARR in 8 months",
    country: "IN",
    flag: "🇮🇳",
    industry: "EdTech",
  },
  {
    name: "Marcus Thompson",
    role: "First-Time Founder",
    company: "Bootstrapped",
    avatar: "MT",
    quote: "The same rigor as a Sequoia partner meeting, but faster and more honest. The CEO pattern matching caught things my advisors missed.",
    rating: 5,
    verdict: "GO",
    outcome: "$2.4M raised post-validation",
    country: "US",
    flag: "🇺🇸",
    industry: "FinTech",
  },
  {
    name: "Dr. Priya Patel",
    role: "Former Product Lead",
    company: "Ex-Stripe",
    avatar: "PP",
    quote: "After eight years in product, I thought I knew how to evaluate ideas. The founder-market fit analysis completely changed my approach.",
    rating: 5,
    verdict: "GO",
    outcome: "0 to $100K MRR in 6 months",
    country: "GB",
    flag: "🇬🇧",
    industry: "B2B SaaS",
  },
  {
    name: "Hans Mueller",
    role: "Tech Lead",
    company: "Now CEO",
    avatar: "HM",
    quote: "Almost quit my job for an idea that got KILL. Brutal, but the reasoning was undeniable. Two months later, validated a different idea that got GO.",
    rating: 5,
    verdict: "KILL → GO",
    outcome: "€180K MRR bootstrapped",
    country: "DE",
    flag: "🇩🇪",
    industry: "DevTools",
  },
  {
    name: "Amit Verma",
    role: "Ex-Consultant",
    company: "McKinsey Alumni",
    avatar: "AV",
    quote: "The cultural fit analysis nailed the trust dynamics in Tier-2 cities. Saved me from a costly GTM mistake. Worth every rupee.",
    rating: 5,
    verdict: "PIVOT",
    outcome: "Pivoted to B2B, now profitable",
    country: "IN",
    flag: "🇮🇳",
    industry: "HealthTech",
  },
];

const Testimonials = () => {
  return (
    <section className="luxury-container py-24 border-t border-border/50">
      <div className="text-center mb-16">
        <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest">Global Outcomes</p>
        <h2 className="text-heading font-semibold mb-4">
          Founders who <span className="font-serif italic font-normal gradient-text">validated first</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Real decisions. Real outcomes. From founders around the world.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="p-6 bg-card border border-border rounded-2xl hover:border-primary/30 hover-lift transition-all group"
          >
            {/* Header Row */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-xl">{testimonial.flag}</span>
                <span className="text-xs text-muted-foreground">{testimonial.industry}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                testimonial.verdict.includes("GO") ? "bg-success/10 text-success border border-success/20" :
                testimonial.verdict.includes("PIVOT") ? "bg-primary/10 text-primary border border-primary/20" :
                "bg-muted text-muted-foreground border border-border"
              }`}>
                {testimonial.verdict}
              </div>
            </div>

            {/* Outcome Badge */}
            <div className="mb-4 px-3 py-1.5 rounded-lg bg-success/5 border border-success/10 inline-block">
              <span className="text-xs text-success font-medium">{testimonial.outcome}</span>
            </div>

            {/* Quote */}
            <Quote className="w-4 h-4 text-primary/30 mb-2" />
            <p className="text-muted-foreground leading-relaxed text-sm mb-5">
              "{testimonial.quote}"
            </p>

            {/* Rating */}
            <div className="flex gap-0.5 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary text-sm font-semibold">
                {testimonial.avatar}
              </div>
              <div>
                <p className="font-medium text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role} · {testimonial.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
