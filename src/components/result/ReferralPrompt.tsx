import { motion } from "framer-motion";
import { Gift, Copy } from "lucide-react";
import { toast } from "sonner";

const ReferralPrompt = () => {
  const referralUrl = `${window.location.origin}?ref=${Math.random().toString(36).slice(2, 8)}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    toast.success("Referral link copied!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-8 p-6 rounded-2xl bg-card border border-border"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Gift className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-1">Know a founder who needs this?</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Share ValidateFirst and help them make better decisions.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground truncate font-mono">
              {referralUrl}
            </div>
            <button
              onClick={copyLink}
              className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/15 transition-colors flex items-center gap-2"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReferralPrompt;
