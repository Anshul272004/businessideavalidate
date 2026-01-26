import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, DesignFlow",
    avatar: "SC",
    quote: "Saved me 6 months of building the wrong thing. The psychology analysis was eye-opening.",
    rating: 5,
    verdict: "PIVOT",
  },
  {
    name: "Marcus Williams",
    role: "Solo Entrepreneur",
    avatar: "MW",
    quote: "Got a GO verdict and launched 3 weeks later. Already at $8k MRR. This tool is brutal but necessary.",
    rating: 5,
    verdict: "GO",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager",
    avatar: "PS",
    quote: "The neuroscience insights helped us reframe our entire value proposition. Worth every penny.",
    rating: 5,
    verdict: "GO",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const Testimonials = () => {
  return (
    <section className="luxury-container py-24 border-t border-border/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Founders who got <span className="font-serif italic font-normal">clarity</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Real results from real entrepreneurs
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-3 gap-6"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Quote className="w-12 h-12" />
            </div>

            {/* Verdict Badge */}
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 ${
              testimonial.verdict === "GO" ? "bg-success/20 text-success" :
              testimonial.verdict === "PIVOT" ? "bg-primary/20 text-primary" :
              "bg-destructive/20 text-destructive"
            }`}>
              Got {testimonial.verdict}
            </div>

            {/* Quote */}
            <p className="text-foreground leading-relaxed mb-8">
              "{testimonial.quote}"
            </p>

            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                {testimonial.avatar}
              </div>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
