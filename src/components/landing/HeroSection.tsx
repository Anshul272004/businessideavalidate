import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, BarChart3, Shield, Zap } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Radial gradient backdrop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(45 93% 47% / 0.12) 0%, transparent 70%)" }} />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(38 60% 72% / 0.08) 0%, transparent 70%)" }} />
      </div>

      <div className="luxury-container relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 py-24">
        {/* Text */}
        <div className="flex-1 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="premium-badge mb-10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Business Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8"
          >
            Validate Your Business Idea{" "}
            <span className="gradient-text italic">Before You Build It</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-xl font-sans"
          >
            AI-powered validation that reduces risk and increases success probability. 
            Get market analysis, competitor insights, and a startup score in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <button
              onClick={() => navigate("/input")}
              className="group relative px-10 py-5 rounded-xl font-semibold font-sans text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-280 animate-breathing-glow haptic-click"
            >
              <span className="relative z-10 flex items-center gap-2">
                Validate My Idea
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="px-10 py-5 rounded-xl font-medium font-sans text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground transition-all duration-280"
            >
              View Demo Report
            </button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-10 mt-14 text-sm font-sans"
          >
            {[
              { label: "Ideas Validated", value: "12,847+" },
              { label: "Success Rate", value: "78%" },
              { label: "Time to Results", value: "< 3 min" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-bold text-foreground text-lg">{s.value}</span>
                <span className="text-muted-foreground text-xs">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D Glass Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex-shrink-0"
          style={{ perspective: 1000 }}
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative w-64 h-64 lg:w-80 lg:h-80"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full animate-glow-pulse"
              style={{ background: "radial-gradient(circle, hsl(45 93% 47% / 0.08) 0%, transparent 70%)" }} />

            {/* Glass sphere */}
            <div className="absolute inset-4 rounded-full border border-primary/15 animate-gold-border"
              style={{
                background: "radial-gradient(circle at 30% 30%, hsl(45 93% 47% / 0.06), hsl(38 60% 72% / 0.03), transparent 70%)",
                boxShadow: "inset 0 0 60px hsl(45 93% 47% / 0.04), 0 0 80px -20px hsl(45 93% 47% / 0.1)",
              }}
            >
              <div className="absolute top-6 left-8 w-16 h-10 rounded-full bg-primary/8 blur-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>

            {/* Orbiting badges */}
            {[
              { icon: <BarChart3 className="w-3.5 h-3.5" />, label: "Market", pos: "top-0 right-4" },
              { icon: <Shield className="w-3.5 h-3.5" />, label: "Risk", pos: "bottom-8 left-0" },
              { icon: <Sparkles className="w-3.5 h-3.5" />, label: "Score", pos: "top-1/2 -right-4" },
            ].map((badge, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, delay: i * 0.8, repeat: Infinity }}
                className={`absolute ${badge.pos} glass px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-primary font-sans`}
              >
                {badge.icon}
                {badge.label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;