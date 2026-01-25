import { useNavigate } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowRight, Sparkles, Target, Brain, TrendingUp } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const handleValidateClick = () => {
    navigate("/input?paid=true");
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] ambient-glow rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] ambient-glow-secondary rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="luxury-container py-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Validator</span>
          </div>
          <LuxuryButton onClick={handleValidateClick} size="sm">
            Get Started
          </LuxuryButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="luxury-container pt-16 md:pt-24 pb-32 relative z-10">
        <div className="max-w-4xl">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              AI-Powered Business Validation
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8 animate-fade-up-delay">
            Stop building
            <br />
            <span className="font-serif italic font-normal gradient-text">the wrong thing.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-12 animate-fade-up-delay-2">
            Get a brutally honest, psychology-based verdict on your business idea 
            before you invest months of work.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-6 animate-fade-up-delay-2">
            <LuxuryButton onClick={handleValidateClick} size="lg" className="group">
              Validate My Idea
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </LuxuryButton>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-card border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-sm">2,400+ ideas validated</span>
            </div>
          </div>
        </div>

        {/* Floating Badge */}
        <div className="hidden lg:block absolute top-1/2 right-12 -translate-y-1/2">
          <div className="animate-float">
            <div className="glow-box bg-card border border-border rounded-2xl p-6 max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="font-semibold">Verdict: GO</p>
                  <p className="text-sm text-muted-foreground">Strong fundamentals</p>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-success rounded-full" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Pain Score: 8.5/10</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="luxury-container py-24 border-t border-border/50">
        <blockquote className="max-w-3xl">
          <p className="text-3xl md:text-4xl font-serif italic text-muted-foreground leading-relaxed">
            "Most startups don't fail because of 
            <span className="text-foreground"> bad execution.</span> They fail because they 
            <span className="text-foreground"> solved the wrong problem."</span>
          </p>
        </blockquote>
      </section>

      {/* Features Grid */}
      <section className="luxury-container py-24 border-t border-border/50">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            title="Psychology Analysis"
            description="Understand the emotional drivers behind your customer's willingness to pay."
          />
          <FeatureCard
            icon={<Target className="w-6 h-6" />}
            title="Pain Reality Score"
            description="Get a 1-10 score on how urgent and real the problem actually is."
          />
          <FeatureCard
            icon={<Sparkles className="w-6 h-6" />}
            title="Clear Verdict"
            description="Receive a GO, PIVOT, or KILL recommendation with reasoning."
          />
        </div>
      </section>

      {/* Verdict Preview */}
      <section className="luxury-container py-24 border-t border-border/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Three possible outcomes
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Every idea gets a clear, actionable verdict
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <VerdictBadge type="go" label="GO" description="Build it now" />
          <VerdictBadge type="pivot" label="PIVOT" description="Adjust & retry" />
          <VerdictBadge type="kill" label="KILL" description="Move on" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="luxury-container py-32 border-t border-border/50">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for the
            <span className="font-serif italic font-normal"> truth?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            5 minutes of analysis can save you 5 months of wasted effort.
          </p>
          <LuxuryButton onClick={handleValidateClick} size="lg" className="group">
            Validate My Idea
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </LuxuryButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="luxury-container py-12 border-t border-border/50">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-primary-foreground" />
            </div>
            <span>Validator</span>
          </div>
          <p>Psychology-powered decisions</p>
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
  <div className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
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
    <div className={`px-8 py-6 rounded-2xl text-center ${styles[type]}`}>
      <p className="text-2xl font-bold mb-1">{label}</p>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
};

export default Landing;
