import { motion } from "framer-motion";
import { 
  Clock, 
  ShieldCheck, 
  Lightbulb, 
  TrendingUp, 
  Target, 
  Zap 
} from "lucide-react";

const benefits = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Save 6+ Months",
    description: "Stop building in the dark. Know before you start if there's real demand.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Reduce Risk",
    description: "Identify fatal flaws before they become expensive lessons.",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Clarity Over Confusion",
    description: "No more guessing. Get a clear GO, PIVOT, or KILL with reasoning.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Pricing Confidence",
    description: "Know what your market will actually pay based on psychology.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Find Real Pain",
    description: "Discover if you're solving a vitamin or a painkiller problem.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Action Steps",
    description: "Leave with 3 immediate actions to validate or improve.",
  },
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Benefits = () => {
  return (
    <section className="luxury-container py-24 border-t border-border/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Why founders <span className="font-serif italic font-normal">trust us</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Everything you need to make confident decisions
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Benefits;
