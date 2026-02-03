import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowRight, Target, Brain, Shield } from "lucide-react";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Stats from "@/components/landing/Stats";
import Benefits from "@/components/landing/Benefits";
import ComparisonTable from "@/components/landing/ComparisonTable";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import SocialProof from "@/components/landing/SocialProof";
import ProblemAgitation from "@/components/landing/ProblemAgitation";
import MoneyBackGuarantee from "@/components/landing/MoneyBackGuarantee";
import FounderShowcase from "@/components/landing/FounderShowcase";
import TrustBadges from "@/components/landing/TrustBadges";
import FinalCTA from "@/components/landing/FinalCTA";
import CEOPatternSection from "@/components/landing/CEOPatternSection";

const Landing = () => {
  const navigate = useNavigate();

  const handleValidateClick = () => {
    navigate("/input?paid=true");
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Subtle Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="luxury-container py-8 relative z-10">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-lg tracking-tight">ValidateFirst</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-6"
          >
            <div className="hidden md:flex items-center gap-6 text-sm">
              <button 
                onClick={() => navigate("/methodology")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Methodology
              </button>
              <button 
                onClick={() => navigate("/case-studies")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Case Studies
              </button>
              <button 
                onClick={() => navigate("/pricing")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Investment
              </button>
            </div>
            <LuxuryButton onClick={handleValidateClick} size="sm">
              Evaluate Decision
            </LuxuryButton>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="luxury-container pt-24 md:pt-32 pb-32 relative z-10">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-muted-foreground mb-8 tracking-wide uppercase"
          >
            Decision Framework for Founders
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight mb-8"
          >
            Some ideas cost money.
            <br />
            <span className="text-muted-foreground">Some cost years.</span>
            <br />
            <span className="font-serif italic font-normal gradient-text">This costs neither.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-12"
          >
            A structured decision framework used by high-performing founders. 
            Before investors decide. Before you commit. Know the truth.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-6"
          >
            <LuxuryButton onClick={handleValidateClick} size="lg" className="group">
              Evaluate This Decision
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </LuxuryButton>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="w-px h-8 bg-border hidden sm:block" />
              <div>
                <p className="text-foreground font-medium">12,847 decisions evaluated</p>
                <p>Based on 100,000+ founder patterns</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Authority Statement */}
      <section className="luxury-container pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-12 items-center text-sm text-muted-foreground"
        >
          {[
            { icon: <Brain className="w-4 h-4" />, text: "5 parallel analysis agents" },
            { icon: <Shield className="w-4 h-4" />, text: "Confidential processing" },
            { icon: <Target className="w-4 h-4" />, text: "Pattern-matched verdicts" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-primary">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Stats */}
      <Stats />

      {/* Problem Agitation */}
      <ProblemAgitation />

      {/* Quote */}
      <section className="luxury-container py-24 border-t border-border/50">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-2xl md:text-4xl font-serif italic text-muted-foreground leading-relaxed">
            "The graveyard of startups is filled with 
            <span className="text-foreground"> brilliant ideas</span> that solved 
            <span className="text-foreground"> problems nobody had.</span>"
          </p>
          <footer className="mt-6 text-sm text-muted-foreground">
            Paul Graham, Y Combinator
          </footer>
        </motion.blockquote>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Features */}
      <FeatureShowcase />

      {/* Benefits */}
      <Benefits />

      {/* Money Back */}
      <MoneyBackGuarantee />

      {/* Comparison */}
      <ComparisonTable />

      {/* CEO Patterns */}
      <CEOPatternSection />

      {/* Founder Stories */}
      <FounderShowcase />

      {/* Testimonials */}
      <Testimonials />

      {/* Verdicts */}
      <section className="luxury-container py-24 border-t border-border/50">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">Clear Outcomes</p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            Three possible <span className="font-serif italic font-normal gradient-text">verdicts</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            No ambiguity. No hedging. You will know exactly what to do next.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          <VerdictCard type="go" label="GO" description="Proceed with conviction" />
          <VerdictCard type="pivot" label="PIVOT" description="Adjust your approach" />
          <VerdictCard type="kill" label="KILL" description="Preserve your resources" />
        </motion.div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <footer className="luxury-container py-12 border-t border-border/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">ValidateFirst</span>
          </div>
          <div className="flex gap-6">
            <button onClick={() => navigate("/methodology")} className="hover:text-foreground transition-colors">Methodology</button>
            <button onClick={() => navigate("/who-this-is-not-for")} className="hover:text-foreground transition-colors">Who This Is Not For</button>
            <button onClick={() => navigate("/pricing")} className="hover:text-foreground transition-colors">Investment</button>
          </div>
          <p>Decision framework for founders</p>
        </div>
      </footer>
    </div>
  );
};

const VerdictCard = ({ type, label, description }: { type: "go" | "pivot" | "kill"; label: string; description: string }) => {
  const styles = {
    go: "verdict-go",
    pivot: "verdict-pivot",
    kill: "verdict-kill",
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`px-10 py-8 rounded-xl text-center ${styles[type]}`}
    >
      <p className="text-3xl font-semibold mb-2">{label}</p>
      <p className="text-sm opacity-80">{description}</p>
    </motion.div>
  );
};

export default Landing;
