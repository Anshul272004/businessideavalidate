import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="luxury-container py-24 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">Begin</p>
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">
          Make the <span className="font-serif italic font-normal gradient-text">informed</span> decision
        </h2>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          The cost of a wrong direction is measured in years, not dollars. 
          Know before you commit.
        </p>
        <LuxuryButton 
          onClick={() => navigate("/input?paid=true")} 
          size="lg" 
          className="group"
        >
          Evaluate Your Decision
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </LuxuryButton>
        <p className="text-xs text-muted-foreground mt-6">
          24-hour money-back guarantee. No questions.
        </p>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
