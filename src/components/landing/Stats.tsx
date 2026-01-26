import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { value: 2847, label: "Ideas Validated", suffix: "+" },
  { value: 73, label: "Avg. Time Saved", suffix: " days" },
  { value: 89, label: "Would Recommend", suffix: "%" },
  { value: 4.9, label: "Average Rating", suffix: "/5", decimals: 1 },
];

const AnimatedCounter = ({ 
  value, 
  suffix, 
  decimals = 0 
}: { 
  value: number; 
  suffix: string; 
  decimals?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-4xl md:text-5xl font-bold gradient-text">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
};

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className="luxury-container py-20 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setIsVisible(true)}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            {isVisible && (
              <AnimatedCounter 
                value={stat.value} 
                suffix={stat.suffix} 
                decimals={stat.decimals}
              />
            )}
            <p className="text-muted-foreground mt-2 text-sm md:text-base">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Stats;
