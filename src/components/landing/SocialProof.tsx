import { motion } from "framer-motion";

const stats = [
  { value: "12,847", label: "Decisions Evaluated" },
  { value: "94%", label: "Verdict Accuracy" },
  { value: "100K+", label: "Founder Patterns" },
  { value: "$2.4B", label: "Capital Preserved" },
];

const SocialProof = () => {
  return (
    <section className="luxury-container py-16 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-3xl font-semibold gradient-text mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SocialProof;
