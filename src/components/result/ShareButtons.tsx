import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Copy, Twitter, Linkedin, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  verdict: "GO" | "PIVOT" | "KILL";
  confidenceScore: number;
}

const ShareButtons = ({ verdict, confidenceScore }: ShareButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `Just validated my startup idea with AI 🚀\n\nVerdict: ${verdict}\nConfidence: ${confidenceScore}%\n\nTry it yourself:`;
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
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
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
            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors text-sm"
            >
              {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
              onClick={handleTwitterShare}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors text-sm"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </button>
            <button
              onClick={handleLinkedInShare}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors text-sm"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButtons;
