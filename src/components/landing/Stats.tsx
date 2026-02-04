import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Globe, TrendingUp, Users, Star } from "lucide-react";

const stats = [
  { value: 12847, label: "Decisions Evaluated", suffix: "+", icon: <TrendingUp className="w-5 h-5" /> },
  { value: 73, label: "Avg. Time Saved", suffix: " days", icon: <Star className="w-5 h-5" /> },
  { value: 89, label: "Would Recommend", suffix: "%", icon: <Users className="w-5 h-5" /> },
  { value: 47, label: "Countries Served", suffix: "+", icon: <Globe className="w-5 h-5" /> },
];

const regionBreakdown = [
  { region: "North America", percentage: 38 },
  { region: "Asia Pacific", percentage: 32 },
  { region: "Europe", percentage: 22 },
  { region: "Other", percentage: 8 },
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
  const countRef = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      countRef.current = value * easeOut;
      setCount(countRef.current);
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return (
    <span className="text-4xl md:text-5xl font-bold gradient-text tabular-nums">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
};

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className="luxury-container py-24 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setIsVisible(true)}
        className="space-y-16"
      >
        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary group-hover:bg-primary/20 transition-colors">
                {stat.icon}
              </div>
              {isVisible && (
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix} 
                />
              )}
              <p className="text-muted-foreground mt-2 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Regional Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-sm">Global Distribution</h3>
              <p className="text-xs text-muted-foreground">Founders from every continent</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-success font-medium">Live data</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {regionBreakdown.map((region, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{region.region}</span>
                  <span className="font-medium">{region.percentage}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${region.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Stats;
