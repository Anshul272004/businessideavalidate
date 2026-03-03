import { motion, AnimatePresence } from "framer-motion";
import { Share2, Twitter, Linkedin, Copy, CheckCircle2, RefreshCw, AlertTriangle, Target, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface VerdictShareCardProps {
  verdict: "GO" | "PIVOT" | "KILL";
  confidenceScore: number;
  ideaSummary: string;
}

const verdictStyles = {
  GO: { bg: "from-success/20 to-success/5", border: "border-success/30", icon: <CheckCircle2 className="w-8 h-8 text-success" />, glow: "shadow-success/20" },
  PIVOT: { bg: "from-primary/20 to-primary/5", border: "border-primary/30", icon: <RefreshCw className="w-8 h-8 text-primary" />, glow: "shadow-primary/20" },
  KILL: { bg: "from-destructive/20 to-destructive/5", border: "border-destructive/30", icon: <AlertTriangle className="w-8 h-8 text-destructive" />, glow: "shadow-destructive/20" },
};

const viralTemplates = {
  GO: (score: number) => `Just validated my startup idea with AI. Result: GO (${score}% confidence). The future is looking bright 🚀 Try it:`,
  PIVOT: (score: number) => `AI told me to pivot my startup idea (${score}% confidence). Sometimes you need brutal honesty 💡 Try it:`,
  KILL: (score: number) => `Had the courage to let AI kill my startup idea (${score}% confidence). Better to know now than after $50K 🎯 Try it:`,
};

const VerdictShareCard = ({ verdict, confidenceScore, ideaSummary }: VerdictShareCardProps) => {
  const [showCard, setShowCard] = useState(false);
  const style = verdictStyles[verdict];
  const truncated = ideaSummary.length > 80 ? ideaSummary.slice(0, 80) + "..." : ideaSummary;
  const shareUrl = window.location.origin;
  const shareText = viralTemplates[verdict](confidenceScore);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    toast.success("Copied to clipboard!");
  };

  const handleTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, "_blank");
  };

  return (
    <>
      <button
        onClick={() => setShowCard(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/15 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        Share Verdict
      </button>

      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setShowCard(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${style.bg} border ${style.border} p-8 shadow-2xl ${style.glow}`}>
                <button onClick={() => setShowCard(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-6">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">ValidateFirst</span>
                </div>

                <div className="text-center mb-6">
                  {style.icon}
                  <h2 className="text-5xl font-bold mt-3 mb-1">{verdict}</h2>
                  <p className="text-lg font-mono tabular-nums text-muted-foreground">{confidenceScore}% confidence</p>
                </div>

                <div className="p-4 rounded-xl bg-card/50 border border-border/50 mb-6">
                  <p className="text-xs text-muted-foreground mb-1">Idea</p>
                  <p className="text-sm text-foreground leading-relaxed">{truncated}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button onClick={handleCopy} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors text-sm font-medium">
                    <Copy className="w-4 h-4" /> Copy
                  </button>
                  <button onClick={handleTwitter} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors text-sm font-medium">
                    <Twitter className="w-4 h-4" /> Twitter
                  </button>
                  <button onClick={handleLinkedIn} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors text-sm font-medium">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </button>
                  <button onClick={handleWhatsApp} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors text-sm font-medium">
                    <MessageCircle className="w-4 h-4 text-[hsl(142_70%_45%)]" /> WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VerdictShareCard;
