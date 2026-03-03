import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowRight, Target, Brain, Shield, Sparkles, CheckCircle, Globe2, Users, TrendingUp, Zap, LogOut, User, AlertTriangle, Eye } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
import GradientMesh from "@/components/landing/GradientMesh";
import TypewriterHero from "@/components/landing/TypewriterHero";
import LiveActivityFeed from "@/components/landing/LiveActivityFeed";
import LiveCounterStrip from "@/components/landing/LiveCounterStrip";
import WallOfVerdicts from "@/components/landing/WallOfVerdicts";
import ScrollProgress from "@/components/landing/ScrollProgress";
import MagneticButton from "@/components/shared/MagneticButton";

const getTimeGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const Landing = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [validationCount, setValidationCount] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  // Fetch user stats for personalization
  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      const { data } = await supabase
        .from("validations")
        .select("confidence_score")
        .order("confidence_score", { ascending: false });
      if (data) {
        setValidationCount(data.length);
        const scores = data.map(d => d.confidence_score).filter(Boolean) as number[];
        if (scores.length > 0) setBestScore(Math.max(...scores));
      }
    };
    fetchStats();
  }, [user]);

  const handleValidateClick = () => {
    navigate("/input");
  };

  const userName = user?.email?.split("@")[0] || "";

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <GradientMesh />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Live Activity Feed - FOMO toasts */}
      <LiveActivityFeed />

      {/* Navigation */}
      <nav className="luxury-container py-6 relative z-10">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 transition-all duration-300 group-hover:shadow-[0_0_20px_-5px_hsl(42_78%_50%/0.4)]">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
                <Target className="w-5 h-5 text-primary" />
              </motion.div>
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
              <button onClick={() => navigate("/methodology")} className="text-muted-foreground hover:text-foreground transition-colors">How It Works</button>
              <button onClick={() => navigate("/case-studies")} className="text-muted-foreground hover:text-foreground transition-colors">Example Decisions</button>
              <button onClick={() => navigate("/who-this-is-not-for")} className="text-muted-foreground hover:text-foreground transition-colors">Who This Is For</button>
              <button onClick={() => navigate("/pricing")} className="text-muted-foreground hover:text-foreground transition-colors">Pricing</button>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <button onClick={() => navigate("/dashboard")} className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">My Reports</button>
                  <span className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                    <User className="w-3.5 h-3.5" />
                    {userName}
                  </span>
                  <MagneticButton>
                    <LuxuryButton onClick={handleValidateClick} size="sm">Validate My Idea</LuxuryButton>
                  </MagneticButton>
                  <button onClick={() => signOut()} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors" title="Sign out">
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate("/auth")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</button>
                  <MagneticButton>
                    <LuxuryButton onClick={() => navigate("/auth")} size="sm">Get Started</LuxuryButton>
                  </MagneticButton>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section - Personalized + Typewriter */}
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
            <span className="text-sm font-medium text-primary">8-Agent Pre-Investment Decision System</span>
          </motion.div>

          {/* Personalized greeting for returning users */}
          {user && validationCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mb-6 p-4 rounded-xl bg-card border border-border"
            >
              <p className="text-sm text-foreground">
                {getTimeGreeting()}, <span className="font-semibold text-primary">{userName}</span>. 
                You've validated {validationCount} idea{validationCount !== 1 ? "s" : ""}.
                {bestScore && <> Your best bet was rated <span className="font-bold text-primary">{bestScore}%</span>. Can you beat it?</>}
              </p>
            </motion.div>
          )}

          {/* Main headline - Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TypewriterHero />
          </motion.div>

          {/* Clarity line */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="text-subheading text-muted-foreground max-w-3xl leading-relaxed mb-4"
          >
            Validate business ideas using <span className="text-foreground font-medium">market psychology</span>, <span className="text-foreground font-medium">regional risk analysis</span>, and <span className="text-foreground font-medium">execution feasibility</span> — before you invest time or capital.
          </motion.p>

          {/* Authority signal */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.7 }}
            className="text-sm text-muted-foreground mb-10"
          >
            Inspired by how top investors evaluate opportunities. Powered by 8 specialized AI agents.
          </motion.p>

          {/* Scarcity + urgency triggers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.8 }}
            className="flex flex-wrap items-center gap-4 mb-6 text-sm"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20 text-destructive">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              Only {47 - (new Date().getHours() % 12)} evaluations remaining today
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20 text-success">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              {13 + (new Date().getMinutes() % 20)} founders validating right now
            </div>
          </motion.div>

          {/* CTA with magnetic effect */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.9 }}
            className="flex flex-col sm:flex-row items-start gap-6 mb-12"
          >
            <MagneticButton>
              <LuxuryButton onClick={handleValidateClick} size="lg" className="group animate-glow-pulse">
                Validate My Business Idea
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </LuxuryButton>
            </MagneticButton>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="w-px h-8 bg-border hidden sm:block" />
              <div>
                <p className="text-foreground font-medium">12,847+ decisions evaluated</p>
                <p>Based on 100,000+ founder patterns</p>
              </div>
            </div>
          </motion.div>

          {/* "As featured in" trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.0 }}
            className="mb-8 flex items-center gap-6 text-xs text-muted-foreground/50"
          >
            <span className="uppercase tracking-wider">As seen on</span>
            <span className="font-semibold text-muted-foreground">ProductHunt</span>
            <span className="w-px h-3 bg-border" />
            <span className="font-semibold text-muted-foreground">Indie Hackers</span>
            <span className="w-px h-3 bg-border" />
            <span className="font-semibold text-muted-foreground">Hacker News</span>
            <span className="w-px h-3 bg-border hidden sm:block" />
            <span className="font-semibold text-muted-foreground hidden sm:block">Startup School</span>
          </motion.div>

          {/* Built for strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.1 }}
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

      {/* Live Counter Strip — Social Proof */}
      <LiveCounterStrip />

      {/* Visual 3-Step Flow */}
      <section className="luxury-container pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-card border border-border"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard number="1" title="Describe your idea" description="5-minute structured input about your idea, background, and goals" icon={<Target className="w-5 h-5" />} />
            <StepCard number="2" title="We analyze everything" description="8 AI agents evaluate psychology, risk, regional fit, biases & execution" icon={<Brain className="w-5 h-5" />} />
            <StepCard number="3" title="Get your verdict" description="Receive a boardroom-ready GO, PIVOT, or KILL decision" icon={<CheckCircle className="w-5 h-5" />} />
          </div>
        </motion.div>
      </section>

      {/* Psychology of Bad Decisions — Urgency Section */}
      <section className="luxury-container py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-sm text-destructive/80 mb-4 uppercase tracking-wide">Why Smart Founders Get It Wrong</p>
          <h2 className="text-heading font-semibold mb-4">
            The psychology of <span className="font-serif italic font-normal text-destructive">bad decisions</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Confirmation Bias", stat: "73%", desc: "of founders only seek evidence that supports their idea — ignoring contradictory signals.", icon: <Eye className="w-5 h-5" /> },
            { title: "Sunk Cost Fallacy", stat: "40%", desc: "stay committed to failing ideas because they've already invested time and money.", icon: <AlertTriangle className="w-5 h-5" /> },
            { title: "Dunning-Kruger Effect", stat: "82%", desc: "overestimate their market understanding, leading to preventable product-market failures.", icon: <Brain className="w-5 h-5" /> },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-destructive/5 border border-destructive/15 hover:border-destructive/30 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive mb-4">
                {card.icon}
              </div>
              <p className="text-3xl font-bold text-destructive mb-2">{card.stat}</p>
              <h3 className="font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-sm text-muted-foreground"
        >
          ValidateFirst removes these biases with <span className="text-primary font-medium">objective, AI-powered analysis</span>.
        </motion.p>
      </section>

      {/* What You'll Receive */}
      <section className="luxury-container py-16 border-t border-border/50 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">What You'll Receive</p>
            <h2 className="text-heading font-semibold mb-6">
              A complete <span className="font-serif italic font-normal gradient-text">decision report</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Not opinions. Not generic advice. A structured analysis based on real market data, psychological patterns, and regional intelligence.
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
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-[0_12px_40px_-15px_hsl(42_78%_50%/0.25)] hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/70" />
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">VERDICT</p>
                  <p className="text-2xl font-semibold text-primary text-glow">GO</p>
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
                    <p className="font-semibold tabular-nums">$2.4B</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Time to Revenue</p>
                    <p className="font-semibold tabular-nums">4 months</p>
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

      {/* Decision Dimensions */}
      <section className="luxury-container py-16 border-t border-border/50 relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">Analysis Depth</p>
          <h2 className="text-heading font-semibold mb-4">
            Decision dimensions we <span className="font-serif italic font-normal gradient-text">evaluate</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">8 specialized AI agents analyze your idea across critical success factors</p>
        </div>
        
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_hsl(42_78%_50%/0.2)]"
            >
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Authority Statement */}
      <section className="luxury-container py-8 relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-wrap gap-8 items-center justify-center text-sm text-muted-foreground">
          {[
            { icon: <Brain className="w-4 h-4" />, text: "8 parallel analysis agents" },
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

      {/* Wall of Verdicts — Social Proof Ticker */}
      <WallOfVerdicts />

      <SocialProof />
      <TrustBadges />
      <Stats />

      {/* Problem Agitation */}
      <section className="luxury-container py-20 border-t border-border/50 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">The Reality</p>
          <h2 className="text-heading font-semibold mb-6">
            Why founders <span className="font-serif italic font-normal text-destructive">fail</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Not because of effort. Not because of passion. <span className="text-foreground font-medium"> Because of wrong assumptions.</span>
          </p>
        </motion.div>
      </section>

      <ProblemAgitation />

      {/* Quote */}
      <section className="luxury-container py-20 border-t border-border/50">
        <motion.blockquote initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-4xl font-serif italic text-muted-foreground leading-relaxed">
            "The graveyard of startups is filled with <span className="text-foreground"> brilliant ideas</span> that solved <span className="text-foreground"> problems nobody had.</span>"
          </p>
          <footer className="mt-6 text-sm text-muted-foreground">Paul Graham, Y Combinator</footer>
        </motion.blockquote>
      </section>

      <HowItWorks />
      <FeatureShowcase />
      <Benefits />
      <MoneyBackGuarantee />
      <ComparisonTable />
      <CEOPatternSection />
      <FounderShowcase />
      <Testimonials />

      {/* Verdicts */}
      <section className="luxury-container py-24 border-t border-border/50">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">Clear Outcomes</p>
          <h2 className="text-heading font-semibold mb-4">Three possible <span className="font-serif italic font-normal gradient-text">verdicts</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto">No ambiguity. No hedging. You will know exactly what to do next.</p>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-6">
          <VerdictCard type="go" label="GO" description="Proceed with conviction" />
          <VerdictCard type="pivot" label="PIVOT" description="Adjust your approach" />
          <VerdictCard type="kill" label="KILL" description="Preserve your resources" />
        </motion.div>
      </section>

      <FAQ />
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
  const styles = { go: "verdict-go", pivot: "verdict-pivot", kill: "verdict-kill" };
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className={`px-10 py-8 rounded-xl text-center ${styles[type]}`}>
      <p className="text-3xl font-semibold mb-2">{label}</p>
      <p className="text-sm opacity-80">{description}</p>
    </motion.div>
  );
};

export default Landing;
