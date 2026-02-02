import { motion } from "framer-motion";
import { Crown, Target, Lightbulb, MessageSquare, Sparkles } from "lucide-react";

interface USPAnalysisProps {
  usp_analysis: {
    personalized_usp: string | null;
    tagline_options: string[];
    story_framework: {
      hook: string;
      struggle: string;
      insight: string;
      solution: string;
      vision: string;
    } | null;
    credibility_anchors: string[];
    positioning_statement: string | null;
    brand_dna: {
      values: string[];
      personality: string;
      voice: string;
    } | null;
    differentiation_matrix: Array<{
      vs_competitor: string;
      your_advantage: string;
    }>;
  };
}

const USPAnalysis = ({ usp_analysis }: USPAnalysisProps) => {
  if (!usp_analysis.personalized_usp && !usp_analysis.positioning_statement) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Main USP Card */}
      <div className="premium-card p-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary border border-primary/20">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Your Unique Positioning</h3>
              <p className="text-sm text-muted-foreground">Tailored to your background & advantages</p>
            </div>
          </div>

          {/* Personalized USP */}
          {usp_analysis.personalized_usp && (
            <div className="mb-6 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-lg font-semibold text-foreground leading-relaxed">
                "{usp_analysis.personalized_usp}"
              </p>
            </div>
          )}

          {/* Tagline Options */}
          {usp_analysis.tagline_options && usp_analysis.tagline_options.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Tagline Options
              </h4>
              <div className="flex flex-wrap gap-2">
                {usp_analysis.tagline_options.map((tagline, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium hover:border-primary/50 transition-colors cursor-default"
                  >
                    {tagline}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Positioning Statement */}
          {usp_analysis.positioning_statement && (
            <div className="p-4 rounded-xl bg-card/50 border border-border/50">
              <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Positioning Statement
              </h4>
              <p className="text-sm text-foreground leading-relaxed">{usp_analysis.positioning_statement}</p>
            </div>
          )}
        </div>
      </div>

      {/* Story Framework */}
      {usp_analysis.story_framework && (
        <div className="premium-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center text-amber-500 border border-amber-500/20">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Your Origin Story</h3>
              <p className="text-sm text-muted-foreground">Narrative framework for maximum impact</p>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              { label: "Hook", content: usp_analysis.story_framework.hook, icon: "🎯" },
              { label: "Struggle", content: usp_analysis.story_framework.struggle, icon: "💪" },
              { label: "Insight", content: usp_analysis.story_framework.insight, icon: "💡" },
              { label: "Solution", content: usp_analysis.story_framework.solution, icon: "🚀" },
              { label: "Vision", content: usp_analysis.story_framework.vision, icon: "🌟" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border/50">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-1">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Credibility & Differentiation */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Credibility Anchors */}
        {usp_analysis.credibility_anchors && usp_analysis.credibility_anchors.length > 0 && (
          <div className="premium-card p-6">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              Credibility Anchors
            </h4>
            <div className="space-y-2">
              {usp_analysis.credibility_anchors.map((anchor, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-success mt-0.5">✓</span>
                  <span className="text-muted-foreground">{anchor}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Differentiation Matrix */}
        {usp_analysis.differentiation_matrix && usp_analysis.differentiation_matrix.length > 0 && (
          <div className="premium-card p-6">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Why You Win
            </h4>
            <div className="space-y-3">
              {usp_analysis.differentiation_matrix.map((diff, i) => (
                <div key={i} className="p-3 rounded-lg bg-card/50 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">vs {diff.vs_competitor}</p>
                  <p className="text-sm font-medium text-success">{diff.your_advantage}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brand DNA */}
      {usp_analysis.brand_dna && (
        <div className="premium-card p-6">
          <h4 className="text-sm font-semibold text-muted-foreground mb-4">Brand DNA</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-card/50 border border-border/50">
              <p className="text-xs text-muted-foreground mb-2">Core Values</p>
              <div className="flex flex-wrap gap-1">
                {usp_analysis.brand_dna.values.map((value, i) => (
                  <span key={i} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                    {value}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card/50 border border-border/50">
              <p className="text-xs text-muted-foreground mb-2">Personality</p>
              <p className="text-sm font-medium">{usp_analysis.brand_dna.personality}</p>
            </div>
            <div className="p-4 rounded-xl bg-card/50 border border-border/50">
              <p className="text-xs text-muted-foreground mb-2">Voice</p>
              <p className="text-sm font-medium">{usp_analysis.brand_dna.voice}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default USPAnalysis;
