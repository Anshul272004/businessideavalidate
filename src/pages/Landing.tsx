import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ParticleField from "@/components/landing/ParticleField";
import HeroSection from "@/components/landing/HeroSection";
import InteractiveInput from "@/components/landing/InteractiveInput";
import AnimatedFlow from "@/components/landing/AnimatedFlow";
import FeatureCards from "@/components/landing/FeatureCards";
import MockResult from "@/components/landing/MockResult";
import PricingCards from "@/components/landing/PricingCards";
import Testimonials from "@/components/landing/Testimonials";
import FinalCTA from "@/components/landing/FinalCTA";
import ScrollProgress from "@/components/landing/ScrollProgress";
import FAQ from "@/components/landing/FAQ";

const Landing = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const userName = user?.email?.split("@")[0] || "";

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <ParticleField />
      <ScrollProgress />

      {/* Glassmorphism Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="luxury-container py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Target className="w-4.5 h-4.5 text-primary" />
              </div>
              <span className="font-semibold text-lg tracking-tight">Business Idea Validate</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-6"
            >
              <div className="hidden md:flex items-center gap-6 text-sm">
                <button onClick={() => navigate("/methodology")} className="text-muted-foreground hover:text-foreground transition-colors">How It Works</button>
                <button onClick={() => navigate("/case-studies")} className="text-muted-foreground hover:text-foreground transition-colors">Case Studies</button>
                <button onClick={() => navigate("/pricing")} className="text-muted-foreground hover:text-foreground transition-colors">Pricing</button>
              </div>
              <div className="flex items-center gap-3">
                {user ? (
                  <>
                    <button onClick={() => navigate("/dashboard")} className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">Dashboard</button>
                    <span className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
                      <User className="w-3.5 h-3.5" />{userName}
                    </span>
                    <button onClick={() => navigate("/input")} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium haptic-click hover:bg-primary/90 transition-colors">
                      Validate Idea
                    </button>
                    <button onClick={() => signOut()} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors" title="Sign out">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => navigate("/auth")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</button>
                    <button onClick={() => navigate("/auth")} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium haptic-click hover:bg-primary/90 transition-colors">
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Sections */}
      <HeroSection />
      <InteractiveInput />
      <AnimatedFlow />
      <FeatureCards />
      <MockResult />
      <PricingCards />
      <Testimonials />
      <FAQ />
      <FinalCTA />

      {/* Footer */}
      <footer className="luxury-container py-12 border-t border-border/50 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Business Idea Validate</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Business Idea Validate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
