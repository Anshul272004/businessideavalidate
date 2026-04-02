import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(45 93% 47% / 0.1) 0%, transparent 70%)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="luxury-container relative z-10 max-w-2xl mx-auto text-center"
      >
        <h2 className="text-heading font-bold mb-8">
          Stop guessing. <span className="gradient-text italic">Start validating.</span>
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed font-sans">
          The cost of a wrong direction is measured in years, not dollars.
        </p>
        <p className="text-foreground font-medium mb-12 font-sans">
          Know before you commit.
        </p>

        <button
          onClick={() => navigate("/input")}
          className="group px-12 py-5 rounded-xl font-semibold font-sans text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-280 animate-breathing-glow haptic-click"
        >
          <span className="flex items-center gap-2">
            Validate My Business Idea
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
        </button>

        <div className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground font-sans">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>24-hour money-back guarantee</span>
          </div>
          <span className="w-px h-4 bg-border" />
          <span>No questions asked</span>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;