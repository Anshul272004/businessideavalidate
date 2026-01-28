import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const logos = [
  "YC Alumni",
  "500 Startups",
  "Techstars",
  "Indie Hackers",
  "Product Hunt",
];

const miniTestimonials = [
  {
    text: "Saved me from wasting 6 months on a vitamin idea",
    author: "James K.",
    role: "Founder",
    avatar: "JK",
  },
  {
    text: "The competitor analysis alone was worth 10x the price",
    author: "Maria S.",
    role: "Solo Founder",
    avatar: "MS",
  },
  {
    text: "Finally, honest feedback instead of friend's encouragement",
    author: "Raj P.",
    role: "First-time Founder",
    avatar: "RP",
  },
  {
    text: "The Mom Test analysis changed how I pitch",
    author: "Sarah L.",
    role: "Serial Entrepreneur",
    avatar: "SL",
  },
];

const SocialProof = () => {
  return (
    <section className="luxury-container py-16 border-t border-border/50 overflow-hidden">
      {/* Trusted By Logos */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-sm text-muted-foreground mb-6">Trusted by founders from</p>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {logos.map((logo, i) => (
            <motion.span
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-lg font-semibold text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Mini Testimonials Scroll */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          {miniTestimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-[300px] p-5 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <Quote className="w-4 h-4 text-primary/50 mb-2" />
              <p className="text-sm text-foreground mb-4">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default SocialProof;
