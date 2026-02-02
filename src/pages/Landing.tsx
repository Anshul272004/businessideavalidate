import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowRight, Sparkles, Target, Brain, TrendingUp, Shield, Zap, Star, Crown, Award, CheckCircle2 } from "lucide-react";
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 border border-primary/20">
              <Crown className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight">IdeaValidator</span>
              <p className="text-xs text-muted-foreground">by Elite Founders</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => navigate("/pricing")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Investment
              </button>
              <button 
                onClick={() => navigate("/case-studies")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Success Stories
              </button>
            </div>
            <span className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground bg-card/50 px-3 py-1.5 rounded-full border border-border/50">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-semibold text-foreground">4.9</span>/5 from 2,847 founders
            </span>
            <LuxuryButton onClick={handleValidateClick} size="sm" className="shadow-lg shadow-primary/20">
              Start Validation
              <ArrowRight className="w-4 h-4 ml-1" />
            </LuxuryButton>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="luxury-container pt-20 md:pt-28 pb-32 relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/15 to-primary/5 text-primary text-sm font-semibold mb-10 border border-primary/30 shadow-lg shadow-primary/10">
              <Sparkles className="w-4 h-4" />
              Powered by 100,000+ CEO Success Patterns
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-10"
          >
            The difference between
            <br />
            <span className="font-serif italic font-normal gradient-text text-glow">vision and delusion.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mb-14"
          >
            Before you invest your life savings, quit your job, or burn another year—get the same brutal validation 
            that top VCs use internally. <span className="text-foreground font-medium">5 specialized AI agents</span> analyze 
            your idea against patterns from <span className="text-foreground font-medium">100,000+ successful and failed startups.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-8"
          >
            <LuxuryButton onClick={handleValidateClick} size="lg" className="group glow-box text-lg px-10 py-7">
              Validate Before You Build
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </LuxuryButton>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex -space-x-3">
                  {[
                    { bg: "from-primary/50 to-primary/30", text: "A" },
                    { bg: "from-success/50 to-success/30", text: "M" },
                    { bg: "from-amber-500/50 to-amber-500/30", text: "J" },
                    { bg: "from-purple-500/50 to-purple-500/30", text: "S" },
                    { bg: "from-blue-500/50 to-blue-500/30", text: "D" },
                  ].map((avatar, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatar.bg} border-2 border-background flex items-center justify-center text-xs font-bold shadow-lg`}
                    >
                      {avatar.text}
                    </motion.div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-foreground">12,847</span> founders validated
                  <p className="text-xs text-muted-foreground">$2.4B saved from bad ideas</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Premium Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-8 mt-16 pt-10 border-t border-border/50"
          >
            {[
              { icon: <Shield className="w-5 h-5" />, title: "Bank-Grade Encryption", desc: "Your ideas stay yours" },
              { icon: <Brain className="w-5 h-5" />, title: "5 AI Agents in Parallel", desc: "Complete analysis in 45 seconds" },
              { icon: <Award className="w-5 h-5" />, title: "100K+ CEO Patterns", desc: "Bezos, Musk, Thiel frameworks" },
            ].map((badge, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {badge.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold">{badge.title}</p>
                  <p className="text-xs text-muted-foreground">{badge.desc}</p>
                </div>
              </motion.div>
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
            <div className="glow-box glass-card rounded-3xl p-8 max-w-sm border border-primary/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success/30 to-success/10 flex items-center justify-center border border-success/30">
                  <TrendingUp className="w-8 h-8 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">GO</p>
                  <p className="text-sm text-muted-foreground">Build with confidence</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">CEO Pattern Match</span>
                  <span className="text-success font-bold">94%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "94%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="h-full bg-gradient-to-r from-success to-emerald-400 rounded-full" 
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1.5 bg-success/15 text-success text-xs rounded-full font-medium border border-success/30">Painkiller Problem</span>
                <span className="px-3 py-1.5 bg-primary/15 text-primary text-xs rounded-full font-medium border border-primary/30">$2.4B TAM</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Matches Stripe's early pattern
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
      <section className="luxury-container py-28 border-t border-border/50">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <p className="text-3xl md:text-5xl font-serif italic text-muted-foreground leading-relaxed">
            "The graveyard of startups is filled with 
            <span className="text-foreground"> brilliant ideas</span> that solved 
            <span className="text-foreground"> problems nobody had.</span>"
          </p>
          <footer className="mt-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
              PG
            </div>
            <div>
              <p className="font-semibold">Paul Graham</p>
              <p className="text-sm text-muted-foreground">Founder, Y Combinator</p>
            </div>
          </footer>
        </motion.blockquote>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Features Grid */}
      <section className="luxury-container py-28 border-t border-border/50">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
            <Target className="w-4 h-4" />
            The Validation Suite
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            What you'll <span className="font-serif italic font-normal gradient-text">discover</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Not generic advice. Deep, personalized analysis tailored to your background, budget, and ambitions.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            title="5 AI Agents in Parallel"
            description="Dopamine Detective, Money Trail, Amygdala Audit, CEO Pattern Matcher, and USP Generator—working simultaneously."
          />
          <FeatureCard
            icon={<Target className="w-6 h-6" />}
            title="The Mom Test Applied"
            description="Would strangers pay before seeing it built? We apply Rob Fitzpatrick's methodology rigorously."
          />
          <FeatureCard
            icon={<Crown className="w-6 h-6" />}
            title="Personalized Blueprint"
            description="A step-by-step roadmap tailored to your budget, time commitment, and ultimate goals."
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

      {/* CEO Pattern Section */}
      <CEOPatternSection />

      {/* Founder Success Stories */}
      <FounderShowcase />

      {/* Testimonials */}
      <Testimonials />

      {/* Verdict Preview */}
      <section className="luxury-container py-28 border-t border-border/50">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
            <Zap className="w-4 h-4" />
            Crystal Clear Verdicts
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Three possible <span className="gradient-text font-serif italic font-normal">outcomes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No ambiguity. No hedging. You'll know exactly what to do next.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8"
        >
          <VerdictBadge type="go" label="GO" description="Build with conviction" subtext="Strong patterns detected" />
          <VerdictBadge type="pivot" label="PIVOT" description="Adjust your approach" subtext="Potential with changes" />
          <VerdictBadge type="kill" label="KILL" description="Save your resources" subtext="Move to better ideas" />
        </motion.div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <footer className="luxury-container py-16 border-t border-border/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center border border-primary/20">
              <Crown className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-foreground text-lg">IdeaValidator</span>
              <p className="text-xs text-muted-foreground">Where elite founders validate</p>
            </div>
          </div>
          <p className="text-center">100K+ CEO Patterns • 5 AI Agents • Personalized Blueprints</p>
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
    className="group premium-card p-10"
  >
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center mb-8 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all duration-300 border border-primary/20">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

// Verdict Badge Component
const VerdictBadge = ({
  type,
  label,
  description,
  subtext,
}: {
  type: "go" | "pivot" | "kill";
  label: string;
  description: string;
  subtext: string;
}) => {
  const styles = {
    go: "verdict-go shadow-success/20",
    pivot: "verdict-pivot shadow-primary/20",
    kill: "verdict-kill shadow-destructive/20",
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -8 }}
      className={`px-12 py-10 rounded-3xl text-center cursor-default ${styles[type]} transition-all shadow-xl`}
    >
      <p className="text-4xl font-bold mb-3">{label}</p>
      <p className="text-base font-medium mb-2">{description}</p>
      <p className="text-xs opacity-60">{subtext}</p>
    </motion.div>
  );
};

export default Landing;
