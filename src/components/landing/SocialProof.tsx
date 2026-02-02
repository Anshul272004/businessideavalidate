import { motion } from "framer-motion";
import { Star, Quote, Shield, Award, Verified, TrendingUp } from "lucide-react";

const logos = [
  { name: "Y Combinator", badge: "Alumni Network" },
  { name: "Sequoia", badge: "Portfolio Founders" },
  { name: "a]6z", badge: "Backed Founders" },
  { name: "Techstars", badge: "Accelerator" },
  { name: "500 Global", badge: "Portfolio" },
  { name: "Product Hunt", badge: "#1 Product" },
];

const miniTestimonials = [
  {
    text: "Saved me from burning $180K on the wrong idea. The psychology analysis was worth 100x the price.",
    author: "James K.",
    role: "Ex-Google PM",
    avatar: "JK",
    company: "Now $2.4M ARR",
    rating: 5,
  },
  {
    text: "The competitor analysis revealed weaknesses I'd never have found on my own. Closed my seed round 3 weeks later.",
    author: "Maria S.",
    role: "Serial Founder",
    avatar: "MS",
    company: "$1.8M Raised",
    rating: 5,
  },
  {
    text: "Finally, brutal honesty instead of friends saying 'great idea!' Got KILL verdict, pivoted, now profitable.",
    author: "Raj P.",
    role: "First-time Founder",
    avatar: "RP",
    company: "$38K MRR",
    rating: 5,
  },
  {
    text: "The Mom Test analysis completely changed my pitch deck. Investors noticed the difference immediately.",
    author: "Sarah L.",
    role: "Ex-McKinsey",
    avatar: "SL",
    company: "YC W24 Batch",
    rating: 5,
  },
  {
    text: "Used it for 3 ideas before finding one that got GO. That discipline saved me 2 years of my life.",
    author: "David C.",
    role: "Technical Founder",
    avatar: "DC",
    company: "150K Users",
    rating: 5,
  },
];

const trustStats = [
  { icon: <Shield className="w-5 h-5" />, value: "12,847", label: "Ideas Validated" },
  { icon: <TrendingUp className="w-5 h-5" />, value: "$2.4B", label: "Saved from Bad Ideas" },
  { icon: <Award className="w-5 h-5" />, value: "94%", label: "Accuracy Rate" },
];

const SocialProof = () => {
  return (
    <section className="luxury-container py-20 border-t border-border/50 overflow-hidden">
      {/* Trust Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-6 mb-16"
      >
        {trustStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              {stat.icon}
            </div>
            <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Trusted By Logos */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm text-muted-foreground mb-8 flex items-center justify-center gap-2">
          <Verified className="w-4 h-4 text-success" />
          Trusted by founders from the world's top accelerators & VCs
        </p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 items-center">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group text-center"
            >
              <span className="text-xl font-bold text-muted-foreground/50 group-hover:text-foreground transition-colors duration-300">
                {logo.name}
              </span>
              <p className="text-xs text-muted-foreground/40 mt-1">{logo.badge}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mini Testimonials Scroll */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
        >
          {miniTestimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex-shrink-0 w-[360px] p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Quote */}
              <Quote className="w-5 h-5 text-primary/30 mb-3" />
              <p className="text-sm text-foreground leading-relaxed mb-5">"{testimonial.text}"</p>
              
              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-sm font-bold text-primary border border-primary/20">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-success">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default SocialProof;
