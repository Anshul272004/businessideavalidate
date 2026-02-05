import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowRight, Target, Brain, Shield, Sparkles, CheckCircle, Globe2, Users, TrendingUp, Zap } from "lucide-react";
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
      <nav className="luxury-container py-6 relative z-10">
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
                How It Works
              </button>
              <button 
                onClick={() => navigate("/case-studies")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Example Decisions
              </button>
              <button 
                onClick={() => navigate("/who-this-is-not-for")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Who This Is For
              </button>
              <button 
                onClick={() => navigate("/pricing")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </button>
            </div>
            <LuxuryButton onClick={handleValidateClick} size="sm">
              Validate My Idea
            </LuxuryButton>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section - World Class */}
      <section className="luxury-container pt-16 md:pt-24 pb-16 relative z-10">
        <div className="max-w-5xl">
          {/* Pre-headline badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Pre-Investment Decision System</span>
          </motion.div>

          {/* Main headline - Emotional hook */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display font-semibold leading-[1.1] tracking-tight mb-6"
          >
            Some ideas cost money.
            <br />
            <span className="text-muted-foreground">Some cost years.</span>
            <br />
            <span className="font-serif italic font-normal gradient-text">Know before you commit.</span>
          </motion.h1>

          {/* Clarity line - Logical clarifier */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-subheading text-muted-foreground max-w-3xl leading-relaxed mb-4"
          >
            Validate business ideas using <span className="text-foreground font-medium">market psychology</span>, <span className="text-foreground font-medium">regional risk analysis</span>, and <span className="text-foreground font-medium">execution feasibility</span> — before you invest time or capital.
          </motion.p>

          {/* Authority signal */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-sm text-muted-foreground mb-10"
          >
            Inspired by how top investors evaluate opportunities. Powered by 7 specialized AI agents.
          </motion.p>

          {/* CTA with outcome */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-6 mb-12"
          >
            <LuxuryButton onClick={handleValidateClick} size="lg" className="group">
              Validate My Business Idea
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </LuxuryButton>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="w-px h-8 bg-border hidden sm:block" />
              <div>
                <p className="text-foreground font-medium">12,847+ decisions evaluated</p>
                <p>Based on 100,000+ founder patterns</p>
              </div>
            </div>
          </motion.div>

          {/* Built for strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
          >
            <span className="font-medium text-foreground">Built for:</span>
            <span className="px-3 py-1 rounded-full bg-muted/50">Founders</span>
            <span className="px-3 py-1 rounded-full bg-muted/50">Angel Investors</span>
            <span className="px-3 py-1 rounded-full bg-muted/50">Operators</span>
            <span className="text-muted-foreground/60">making high-stakes decisions</span>
          </motion.div>
        </div>
      </section>

      {/* Visual 3-Step Flow - Immediate clarity */}
      <section className="luxury-container pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-card border border-border"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number="1" 
              title="Describe your idea" 
              description="5-minute structured input about your idea, background, and goals"
              icon={<Target className="w-5 h-5" />}
            />
            <StepCard 
              number="2" 
              title="We analyze everything" 
              description="7 AI agents evaluate psychology, risk, regional fit & execution"
              icon={<Brain className="w-5 h-5" />}
            />
            <StepCard 
              number="3" 
              title="Get your verdict" 
              description="Receive a boardroom-ready GO, PIVOT, or KILL decision"
              icon={<CheckCircle className="w-5 h-5" />}
            />
          </div>
        </motion.div>
      </section>

      {/* What You'll Receive - Trust builder */}
      <section className="luxury-container py-16 border-t border-border/50 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">What You'll Receive</p>
            <h2 className="text-heading font-semibold mb-6">
              A complete <span className="font-serif italic font-normal gradient-text">decision report</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Not opinions. Not generic advice. A structured analysis based on real market data, 
              psychological patterns, and regional intelligence.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: <CheckCircle className="w-5 h-5 text-primary" />, text: "Executive summary with GO / PIVOT / KILL verdict" },
                { icon: <Brain className="w-5 h-5 text-primary" />, text: "Market psychology & customer behavior analysis" },
                { icon: <Globe2 className="w-5 h-5 text-primary" />, text: "Regional & cultural risk assessment" },
                { icon: <TrendingUp className="w-5 h-5 text-primary" />, text: "Unit economics & capital efficiency score" },
                { icon: <Users className="w-5 h-5 text-primary" />, text: "Founder-market fit evaluation" },
                { icon: <Zap className="w-5 h-5 text-primary" />, text: "Personalized 90-day action blueprint" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  {item.icon}
                  <span className="text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/70" />
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">VERDICT</p>
                  <p className="text-2xl font-semibold text-primary">GO</p>
                  <p className="text-sm text-muted-foreground mt-1">73% success probability</p>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-muted rounded-full w-full" />
                  <div className="h-2 bg-muted rounded-full w-4/5" />
                  <div className="h-2 bg-muted rounded-full w-3/4" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Market Size</p>
                    <p className="font-semibold">$2.4B</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Time to Revenue</p>
                    <p className="font-semibold">4 months</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
              Sample Report Preview
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decision Dimensions We Analyze */}
      <section className="luxury-container py-16 border-t border-border/50 relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">Analysis Depth</p>
          <h2 className="text-heading font-semibold mb-4">
            Decision dimensions we <span className="font-serif italic font-normal gradient-text">evaluate</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            7 specialized AI agents analyze your idea across critical success factors
          </p>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { title: "Market Psychology", desc: "Customer buying behavior & emotional triggers" },
            { title: "Regional Scalability", desc: "Cultural fit & geographic market dynamics" },
            { title: "Capital Efficiency", desc: "Unit economics, CAC, LTV & burn analysis" },
            { title: "Founder-Market Fit", desc: "Your unique advantages & blind spots" },
            { title: "Execution Risk", desc: "Technical complexity & resource requirements" },
            { title: "Cognitive Bias Check", desc: "Founder assumptions & reality distortion" },
            { title: "Competitive Position", desc: "Defensibility & market timing" },
            { title: "Revenue Viability", desc: "Pricing strategy & monetization path" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Authority Statement */}
      <section className="luxury-container py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-8 items-center justify-center text-sm text-muted-foreground"
        >
          {[
            { icon: <Brain className="w-4 h-4" />, text: "7 parallel analysis agents" },
            { icon: <Shield className="w-4 h-4" />, text: "Confidential processing" },
            { icon: <Target className="w-4 h-4" />, text: "Evidence-based verdicts" },
            { icon: <Globe2 className="w-4 h-4" />, text: "Regional market intelligence" },
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

      {/* Problem Agitation - Why founders fail */}
      <section className="luxury-container py-20 border-t border-border/50 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">The Reality</p>
          <h2 className="text-heading font-semibold mb-6">
            Why founders <span className="font-serif italic font-normal text-destructive">fail</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Not because of effort. Not because of passion. 
            <span className="text-foreground font-medium"> Because of wrong assumptions.</span>
          </p>
        </motion.div>
      </section>

      <ProblemAgitation />

      {/* Quote */}
      <section className="luxury-container py-20 border-t border-border/50">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
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
          <h2 className="text-heading font-semibold mb-4">
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
            <button onClick={() => navigate("/methodology")} className="hover:text-foreground transition-colors">How It Works</button>
            <button onClick={() => navigate("/who-this-is-not-for")} className="hover:text-foreground transition-colors">Who This Is For</button>
            <button onClick={() => navigate("/pricing")} className="hover:text-foreground transition-colors">Pricing</button>
          </div>
          <p>Pre-investment decision system for founders</p>
        </div>
      </footer>
    </div>
  );
};

const StepCard = ({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-semibold text-lg border border-primary/20">
      {number}
    </div>
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-primary">{icon}</span>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

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