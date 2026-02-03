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
  },
  {
    name: "Marcus Thompson",
    role: "Serial Entrepreneur",
    company: "3x Founder",
    avatar: "MT",
    quote: "The same rigor as a Sequoia partner meeting, but faster and more honest. The CEO pattern matching caught things my advisors missed.",
    rating: 5,
    verdict: "GO",
    outcome: "$2.4M raised post-validation",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Former Product Lead",
    company: "Ex-Stripe",
    avatar: "PS",
    quote: "After eight years in product, I thought I knew how to evaluate ideas. The founder-market fit analysis completely changed my approach.",
    rating: 5,
    verdict: "GO",
    outcome: "0 to $100K MRR in 6 months",
  },
  {
    name: "James Park",
    role: "First-Time Founder",
    company: "Bootstrapped",
    avatar: "JP",
    quote: "Almost quit my job for an idea that got KILL. Brutal, but the reasoning was undeniable. Two months later, validated a different idea that got GO.",
    rating: 5,
    verdict: "KILL → GO",
    outcome: "$18K MRR bootstrapped",
  },
];

const Testimonials = () => {
  return (
    <section className="luxury-container py-20 border-t border-border/50">
      <div className="text-center mb-12">
        <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">Outcomes</p>
        <h2 className="text-3xl md:text-5xl font-semibold mb-4">
          Founders who <span className="font-serif italic font-normal gradient-text">validated first</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Real decisions. Real outcomes.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-6"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-8 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                testimonial.verdict.includes("GO") ? "bg-success/10 text-success border border-success/20" :
                testimonial.verdict.includes("PIVOT") ? "bg-primary/10 text-primary border border-primary/20" :
                "bg-muted text-muted-foreground border border-border"
              }`}>
                {testimonial.verdict}
              </div>
              <span className="text-xs text-muted-foreground">→</span>
              <span className="text-xs text-success font-medium">{testimonial.outcome}</span>
            </div>

            <Quote className="w-4 h-4 text-primary/30 mb-3" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              "{testimonial.quote}"
            </p>

            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
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
