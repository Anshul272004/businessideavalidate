import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Monogram from "@/components/brand/Monogram";
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

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <ScrollProgress />

      {/* Editorial Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-background/40 border-b border-primary/10">
        <div className="luxury-container py-5">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => navigate("/")}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 group"
              data-cursor="hover"
            >
              <Monogram size={40} />
              <div className="flex flex-col items-start">
                <span className="editorial-display text-base text-foreground tracking-[0.18em]">
                  VALIDATE
                </span>
                <span className="ui-label-sm text-muted-foreground -mt-0.5" style={{ fontSize: "0.55rem" }}>
                  DECISION&nbsp;INTELLIGENCE
                </span>
              </div>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-8"
            >
              <div className="hidden md:flex items-center gap-8">
                {[
                  { label: "METHODOLOGY", path: "/methodology" },
                  { label: "ARCHIVE", path: "/case-studies" },
                  { label: "PRICING", path: "/pricing" },
                ].map((l) => (
                  <button
                    key={l.path}
                    onClick={() => navigate(l.path)}
                    className="ui-label-sm text-muted-foreground hover:text-primary transition-colors"
                    data-cursor="hover"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <span className="hidden md:block w-px h-6 bg-primary/20" />
              <div className="flex items-center gap-3">
                {user ? (
                  <>
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="ui-label-sm text-muted-foreground hover:text-primary transition-colors hidden md:block"
                      data-cursor="hover"
                    >
                      ARCHIVE
                    </button>
                    <button
                      onClick={() => navigate("/input")}
                      className="px-5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors haptic-click"
                      data-cursor="hover"
                    >
                      <span className="ui-label-sm">VALIDATE&nbsp;IDEA</span>
                    </button>
                    <button
                      onClick={() => signOut()}
                      className="p-2.5 border border-primary/20 hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors"
                      title="Sign out"
                      data-cursor="hover"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/auth")}
                      className="ui-label-sm text-muted-foreground hover:text-primary transition-colors"
                      data-cursor="hover"
                    >
                      SIGN&nbsp;IN
                    </button>
                    <button
                      onClick={() => navigate("/auth")}
                      className="px-5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors haptic-click"
                      data-cursor="hover"
                    >
                      <span className="ui-label-sm">ENTER</span>
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

      {/* Editorial Footer */}
      <footer className="relative border-t border-primary/15 mt-20">
        <div className="luxury-container py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5 space-y-6">
              <div className="flex items-center gap-4">
                <Monogram size={48} />
                <div className="flex flex-col">
                  <span className="editorial-display text-xl text-foreground tracking-[0.2em]">
                    VALIDATE
                  </span>
                  <span className="ui-label-sm text-muted-foreground" style={{ fontSize: "0.55rem" }}>
                    EST.&nbsp;2026&nbsp;·&nbsp;DECISION&nbsp;INTELLIGENCE
                  </span>
                </div>
              </div>
              <p className="editorial-italic text-muted-foreground max-w-sm leading-relaxed">
                The private counsel for founders who refuse to build on assumption.
              </p>
            </div>

            <div className="md:col-span-2 space-y-3">
              <div className="ui-label-sm text-primary/70">PRODUCT</div>
              <button onClick={() => navigate("/methodology")} className="block ui-label-sm text-muted-foreground hover:text-primary transition-colors">METHODOLOGY</button>
              <button onClick={() => navigate("/pricing")} className="block ui-label-sm text-muted-foreground hover:text-primary transition-colors">PRICING</button>
              <button onClick={() => navigate("/case-studies")} className="block ui-label-sm text-muted-foreground hover:text-primary transition-colors">ARCHIVE</button>
            </div>

            <div className="md:col-span-2 space-y-3">
              <div className="ui-label-sm text-primary/70">FOUNDERS</div>
              <button onClick={() => navigate("/who-this-is-not-for")} className="block ui-label-sm text-muted-foreground hover:text-primary transition-colors">NOT&nbsp;FOR&nbsp;YOU</button>
              <button onClick={() => navigate("/auth")} className="block ui-label-sm text-muted-foreground hover:text-primary transition-colors">REQUEST&nbsp;ACCESS</button>
            </div>

            <div className="md:col-span-3 space-y-3">
              <div className="ui-label-sm text-primary/70">CORRESPONDENCE</div>
              <p className="editorial-italic text-sm text-muted-foreground leading-relaxed">
                For private inquiries, partnerships, and bespoke consultations.
              </p>
            </div>
          </div>

          <div className="gold-divider mt-14 mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="ui-label-sm text-muted-foreground/70" style={{ fontSize: "0.6rem" }}>
              © 2026&nbsp;·&nbsp;VALIDATE&nbsp;·&nbsp;ALL&nbsp;RIGHTS&nbsp;RESERVED
            </p>
            <p className="ui-label-sm text-muted-foreground/70" style={{ fontSize: "0.6rem" }}>
              CRAFTED&nbsp;WITH&nbsp;INTENTION
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

