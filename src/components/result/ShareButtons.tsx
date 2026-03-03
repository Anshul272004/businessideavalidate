import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Copy, Twitter, Linkedin, Check, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  verdict: "GO" | "PIVOT" | "KILL";
  confidenceScore: number;
}

const viralTemplates = {
  GO: (score: number) => `Just validated my startup idea with AI. Result: GO (${score}% confidence). The future is looking bright 🚀\n\nTry it yourself:`,
  PIVOT: (score: number) => `AI told me to pivot my startup idea (${score}% confidence). Honestly? It's right. Sometimes you need brutal honesty 💡\n\nTry it:`,
  KILL: (score: number) => `Had the courage to let AI kill my startup idea (${score}% confidence). Better to know now than after $50K 🎯\n\nTry it:`,
};

const ShareButtons = ({ verdict, confidenceScore }: ShareButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = viralTemplates[verdict](confidenceScore);
  const shareUrl = window.location.origin;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`, "_blank");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl text-sm font-medium transition-colors"
      >
        <Share2 className="w-4 h-4" />
        Share Result
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 bg-card border border-border rounded-xl shadow-xl p-2 z-50 min-w-[160px]"
          >
            <button onClick={handleCopy} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors text-sm">
              {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button onClick={handleTwitterShare} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors text-sm">
              <Twitter className="w-4 h-4" />
              Twitter
            </button>
            <button onClick={handleLinkedInShare} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors text-sm">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </button>
            <button onClick={handleWhatsAppShare} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors text-sm">
              <MessageCircle className="w-4 h-4 text-[hsl(142_70%_45%)]" />
              WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButtons;
