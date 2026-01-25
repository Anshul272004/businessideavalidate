import { useNavigate } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const handleValidateClick = () => {
    // In production, this would redirect to Gumroad
    // For now, navigate directly to input with paid=true
    navigate("/input?paid=true");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="luxury-container pt-24 md:pt-32 pb-20">
        <div className="max-w-3xl fade-in">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-6">
            AI Business Validator
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight tracking-tight mb-8">
            Know if your business idea
            <br />
            <span className="text-muted-foreground">deserves your time.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-xl leading-relaxed">
            Psychology & neuroscience based analysis that removes guesswork from decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <LuxuryButton onClick={handleValidateClick} size="lg">
              Validate My Idea
              <ArrowRight className="ml-2 h-5 w-5" />
            </LuxuryButton>
            <p className="text-sm text-muted-foreground/70 self-center">
              One-time payment. No subscription.
            </p>
          </div>
        </div>
      </section>

      {/* Silence Section */}
      <section className="luxury-container py-24 border-t border-border/30">
        <p className="text-xl md:text-2xl text-muted-foreground italic max-w-2xl leading-relaxed slide-up">
          Most people don't fail because of effort.
          <br />
          They fail because they built the wrong thing.
        </p>
      </section>

      {/* What It Does Section */}
      <section className="luxury-container py-24 border-t border-border/30">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-12">
            What this analysis tells you
          </h2>
          
          <ol className="space-y-6">
            {[
              "Whether the problem is real",
              "Why people would actually pay",
              "Where buyers will hesitate",
              "What price feels \"right\" to the brain",
              "If you should build, pivot, or stop",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-4 text-lg text-muted-foreground"
              >
                <span className="text-primary font-medium">{index + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Verdict Preview */}
      <section className="luxury-container py-24 border-t border-border/30">
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="verdict-go px-6 py-3 rounded-lg font-medium">
            GO
          </div>
          <div className="verdict-pivot px-6 py-3 rounded-lg font-medium">
            PIVOT
          </div>
          <div className="verdict-kill px-6 py-3 rounded-lg font-medium">
            KILL
          </div>
        </div>
        <p className="text-muted-foreground italic">
          Clear direction is more valuable than motivation.
        </p>
      </section>

      {/* Final CTA */}
      <section className="luxury-container py-24 border-t border-border/30">
        <div className="max-w-xl">
          <p className="text-xl text-muted-foreground mb-8">
            Make the decision with clarity.
          </p>
          <LuxuryButton onClick={handleValidateClick} size="lg">
            Validate My Idea
            <ArrowRight className="ml-2 h-5 w-5" />
          </LuxuryButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="luxury-container py-12 border-t border-border/30">
        <p className="text-sm text-muted-foreground/50">
          Pay via Gumroad. Instant analysis.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
