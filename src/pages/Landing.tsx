import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowRight, Sparkles, Target, Brain, TrendingUp, Shield, Zap, Star } from "lucide-react";
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

const Landing = () => {
  const navigate = useNavigate();

  const handleValidateClick = () => {
    navigate("/input?paid=true");
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Premium Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/8 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="luxury-container py-8 relative z-10">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">IdeaValidator</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <span className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-primary text-primary" />
              4.9/5 rating
            </span>
            <LuxuryButton onClick={handleValidateClick} size="sm">
              Get Started
            </LuxuryButton>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="luxury-container pt-16 md:pt-24 pb-32 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20 shimmer">
              <Sparkles className="w-4 h-4" />
              Multi-Agent Neuro-Validation Protocol
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8"
          >
            Stop building
            <br />
            <span className="font-serif italic font-normal gradient-text text-glow">the wrong thing.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-12"
          >
            Get a brutally honest, psychology-based verdict on your business idea 
            using 4 specialized AI agents that analyze demand, pricing, competition, and risk in parallel.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-6"
          >
            <LuxuryButton onClick={handleValidateClick} size="lg" className="group glow-box">
              Validate My Idea
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </LuxuryButton>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex -space-x-2">
                {[
                  { bg: "bg-gradient-to-br from-primary/40 to-primary/20", text: "JK" },
                  { bg: "bg-gradient-to-br from-success/40 to-success/20", text: "MS" },
                  { bg: "bg-gradient-to-br from-amber-500/40 to-amber-500/20", text: "RD" },
                  { bg: "bg-gradient-to-br from-purple-500/40 to-purple-500/20", text: "AL" },
                ].map((avatar, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className={`w-9 h-9 rounded-full ${avatar.bg} border-2 border-background flex items-center justify-center text-xs font-medium`}
                  >
                    {avatar.text}
                  </motion.div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-foreground">2,847</span> ideas validated
              </div>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-border/50"
          >
            {[
              { icon: <Shield className="w-4 h-4" />, text: "100% Confidential" },
              { icon: <Zap className="w-4 h-4" />, text: "4 AI Agents in Parallel" },
              { icon: <TrendingUp className="w-4 h-4" />, text: "Real-World Factors" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-primary">{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating Preview Card */}
        <div className="hidden lg:block absolute top-1/2 right-12 -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="animate-float"
          >
            <div className="glow-box glass-card rounded-2xl p-6 max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="font-semibold">Verdict: GO</p>
                  <p className="text-sm text-muted-foreground">Strong fundamentals</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="text-success font-bold">87%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "87%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="h-full bg-gradient-to-r from-success to-emerald-400 rounded-full" 
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">Painkiller</span>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">$2.4B TAM</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Stats Section */}
      <Stats />

      {/* Problem Agitation */}
      <ProblemAgitation />

      {/* Quote Section */}
      <section className="luxury-container py-24 border-t border-border/50">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-3xl md:text-4xl font-serif italic text-muted-foreground leading-relaxed">
            "Most startups don't fail because of 
            <span className="text-foreground"> bad execution.</span> They fail because they 
            <span className="text-foreground"> solved the wrong problem."</span>
          </p>
          <footer className="mt-6 text-muted-foreground">
            — Every VC who's seen 10,000 pitches
          </footer>
        </motion.blockquote>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Features Grid */}
      <section className="luxury-container py-24 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What you'll <span className="font-serif italic font-normal gradient-text">discover</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Deep psychology-based insights, not generic advice
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            title="Multi-Agent Analysis"
            description="4 specialized AI agents analyze demand, pricing, competitors, and risk in parallel."
          />
          <FeatureCard
            icon={<Target className="w-6 h-6" />}
            title="The Mom Test Applied"
            description="Would strangers actually pay before seeing it built? We apply the real test."
          />
          <FeatureCard
            icon={<Sparkles className="w-6 h-6" />}
            title="Clear Verdict"
            description="Receive a GO, PIVOT, or KILL recommendation with brutally honest reasoning."
          />
        </div>
      </section>

      {/* Feature Showcase (12 features) */}
      <FeatureShowcase />

      {/* Benefits Section */}
      <Benefits />

      {/* Money Back Guarantee */}
      <MoneyBackGuarantee />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Founder Success Stories */}
      <FounderShowcase />

      {/* Testimonials */}
      <Testimonials />

      {/* Verdict Preview */}
      <section className="luxury-container py-24 border-t border-border/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Three possible <span className="gradient-text">outcomes</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Every idea gets a clear, actionable verdict
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <VerdictBadge type="go" label="GO" description="Build it now" />
          <VerdictBadge type="pivot" label="PIVOT" description="Adjust & retry" />
          <VerdictBadge type="kill" label="KILL" description="Move on" />
        </motion.div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <footer className="luxury-container py-12 border-t border-border/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">IdeaValidator</span>
          </div>
          <p>Multi-Agent Neuro-Validation Protocol • Powered by AI</p>
          <p>© 2024 All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="group premium-card p-8"
  >
    <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

// Verdict Badge Component
const VerdictBadge = ({
  type,
  label,
  description,
}: {
  type: "go" | "pivot" | "kill";
  label: string;
  description: string;
}) => {
  const styles = {
    go: "verdict-go",
    pivot: "verdict-pivot",
    kill: "verdict-kill",
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -5 }}
      className={`px-10 py-8 rounded-2xl text-center cursor-default ${styles[type]} transition-shadow hover:shadow-xl`}
    >
      <p className="text-3xl font-bold mb-2">{label}</p>
      <p className="text-sm opacity-80">{description}</p>
    </motion.div>
  );
};

export default Landing;