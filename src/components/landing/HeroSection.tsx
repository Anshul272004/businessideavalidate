import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import CinematicArtifact from "./CinematicArtifact";

const HeroSection = () => {
  const navigate = useNavigate();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 14 });
  const sy = useSpring(my, { stiffness: 60, damping: 14 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);

  const handleHeroMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleHeroLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      onMouseMove={handleHeroMove}
      onMouseLeave={handleHeroLeave}
      className="relative min-h-screen flex items-center overflow-hidden depth-stage luxury-noise pt-28 pb-20"
    >
      <div
        className="cinematic-orb"
        style={{ width: 520, height: 520, background: "hsl(45 93% 47% / 0.18)", top: "8%", left: "-10%" }}
      />
      <div
        className="cinematic-orb"
        style={{ width: 420, height: 420, background: "hsl(38 60% 72% / 0.12)", bottom: "5%", right: "-8%" }}
      />

      <div className="pointer-events-none absolute inset-x-6 md:inset-x-12 top-24 bottom-12 border border-primary/10 rounded-sm" />

      <div className="luxury-container relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 flex-wrap"
          >
            <span className="ui-label-sm text-primary/80">EST.&nbsp;&nbsp;2026</span>
            <span className="h-px w-16 bg-primary/40" />
            <span className="ui-label-sm text-muted-foreground">DECISION&nbsp;&nbsp;INTELLIGENCE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="editorial-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.96] text-foreground"
          >
            <span className="block">THE&nbsp;FOUNDER'S</span>
            <span className="block gold-sheen">PRIVATE&nbsp;COUNSEL</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="editorial-italic text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed"
          >
            A cinematic boardroom-grade verdict on your idea — delivered in minutes,
            authored by nine specialist agents, written for you alone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <button
              onClick={() => navigate("/input")}
              className="group relative inline-flex items-center justify-center gap-3 px-9 py-5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors haptic-click overflow-hidden"
              data-cursor="hover"
            >
              <span className="ui-label">Validate&nbsp;My&nbsp;Idea</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>

            <button
              onClick={() => navigate("/methodology")}
              className="inline-flex items-center justify-center gap-3 px-9 py-5 border border-primary/30 hover:border-primary/60 text-foreground transition-colors haptic-click"
              data-cursor="hover"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="ui-label">The&nbsp;Methodology</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap items-center gap-x-10 gap-y-6 pt-8 mt-2 border-t border-primary/15"
          >
            {[
              { v: "12,847", l: "Ideas Validated" },
              { v: "94%", l: "Accuracy Rate" },
              { v: "180s", l: "Time to Verdict" },
            ].map((s, i) => (
              <div key={i} className="space-y-1.5">
                <div className="editorial-display text-3xl md:text-4xl text-primary tabular-nums">
                  {s.v}
                </div>
                <div className="ui-label-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateX, rotateY, transformPerspective: 1400 }}
          className="lg:col-span-5 relative h-[440px] sm:h-[520px] lg:h-[620px]"
        >
          <div className="absolute inset-0">
            <CinematicArtifact />
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="h-8 w-px bg-primary/30" />
            <div className="ui-label-sm text-muted-foreground">THE&nbsp;&nbsp;ORACLE</div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-primary/10 bg-background/40 backdrop-blur-sm py-4">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-12 px-6 shrink-0">
              {["AI · SAAS","FINTECH","MARKETPLACE","DEEP TECH","CLIMATE","CONSUMER","HEALTH","B2B","DEV TOOLS","EDU TECH"].map((t, i) => (
                <div key={i} className="flex items-center gap-12 shrink-0">
                  <span className="ui-label-sm text-muted-foreground/70">{t}</span>
                  <span className="text-primary/40">◆</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
