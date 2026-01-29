import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowRight, Sparkles, Shield, Clock, Zap, CheckCircle } from "lucide-react";

const FinalCTA = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/input?paid=true");
  };

  return (
    <section className="luxury-container py-32 border-t border-border/50 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-success/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          Limited Time: $49 (Regular $99)
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Ready for the
          <span className="font-serif italic font-normal gradient-text"> truth?</span>
        </h2>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
          5 minutes of brutal honesty can save you 5 months of building the wrong thing.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: <Zap className="w-5 h-5" />, text: "Instant Analysis" },
            { icon: <Shield className="w-5 h-5" />, text: "100% Private" },
            { icon: <Clock className="w-5 h-5" />, text: "5 Min Setup" },
            { icon: <CheckCircle className="w-5 h-5" />, text: "Money-Back" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-2 p-4 bg-card/50 rounded-xl border border-border"
            >
              <span className="text-primary">{item.icon}</span>
              <span className="text-sm text-muted-foreground">{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <LuxuryButton onClick={handleClick} size="lg" className="group text-lg px-10 py-6">
            Validate My Idea Now
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </LuxuryButton>
        </motion.div>

        {/* Trust Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            2,400+ ideas validated
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            24-hour money-back guarantee
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            No subscription required
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;