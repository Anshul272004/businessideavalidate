import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowRight, Shield } from "lucide-react";

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
        <h2 className="text-heading font-semibold mb-6">
          Reduce irreversible <span className="font-serif italic font-normal gradient-text">mistakes</span>
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          The cost of a wrong direction is measured in years, not dollars. 
        </p>
        <p className="text-foreground font-medium mb-10">
          Know before you commit.
        </p>
        <LuxuryButton 
          onClick={() => navigate("/input")} 
          size="lg" 
          className="group"
        >
          Validate My Business Idea
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </LuxuryButton>
        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
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
