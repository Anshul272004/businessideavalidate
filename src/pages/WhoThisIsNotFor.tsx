import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { ArrowLeft, ArrowRight, X, Check } from "lucide-react";

const notFor = [
  {
    title: "People looking for motivation",
    description: "This is a decision framework, not a cheerleader. If you want someone to tell you your idea is great, ask your friends.",
  },
  {
    title: "Founders who can't handle hard truths",
    description: "A KILL verdict is not a personal attack. It's information that could save you years. If you're not ready for that, wait until you are.",
  },
  {
    title: "Those seeking generic advice",
    description: "If you want surface-level feedback, use a free tool. This goes deep into your specific situation, which means the answers will be specific—and sometimes uncomfortable.",
  },
  {
    title: "People who won't act on the analysis",
    description: "Information without action is entertainment. If you're not ready to make decisions based on what you learn, this is premature.",
  },
  {
    title: "Founders looking for shortcuts",
    description: "This doesn't replace customer conversations or market research. It helps you know where to focus—but you still have to do the work.",
  },
];

const isFor = [
  {
    title: "Founders about to make a major commitment",
    description: "Before quitting your job. Before spending your savings. Before asking others to join you.",
  },
  {
    title: "Serial entrepreneurs evaluating multiple ideas",
    description: "When you have several directions and need a systematic way to compare them objectively.",
  },
  {
    title: "Technical founders entering unfamiliar markets",
    description: "When you can build anything but need to know what's worth building.",
  },
  {
    title: "Anyone who's burned time on the wrong idea before",
    description: "If you've learned the hard way once, this helps you not learn it again.",
  },
  {
    title: "Angel investors before writing their first check",
    description: "Evaluate opportunities through the same lens top investors use—psychology, execution risk, and regional fit.",
  },
  {
    title: "Operators evaluating new product lines",
    description: "When expanding your business portfolio, validate before committing resources to a new direction.",
  },
];

const WhoThisIsNotFor = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="luxury-container py-8 relative z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <LuxuryButton onClick={() => navigate("/input")} size="sm">
            Evaluate Decision
          </LuxuryButton>
        </div>
      </nav>

      <div className="luxury-container py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">Before You Begin</p>
          <h1 className="text-editorial text-5xl md:text-7xl mb-8">
            Who this is <span className="italic text-destructive">not</span> for
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Being selective about who we serve allows us to serve them well. 
            Read this before you begin.
          </p>
        </motion.div>

        {/* Not For */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-sm text-destructive mb-8 uppercase tracking-wide">This is not for you if</h2>
          <div className="space-y-4">
            {notFor.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 p-6 rounded-xl bg-destructive/5 border border-destructive/20"
              >
                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Is For */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-sm text-success mb-8 uppercase tracking-wide">This is for you if</h2>
          <div className="space-y-4">
            {isFor.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 p-6 rounded-xl bg-success/5 border border-success/20"
              >
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20 p-10 rounded-2xl glass luxury-hairline"
        >
          <p className="text-xl font-serif italic text-muted-foreground mb-4">
            "If this helps you avoid one bad year, it's worth it. If it confirms the right path, it's invaluable."
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-6">Still here? Good. You're ready.</p>
          <LuxuryButton onClick={() => navigate("/input")} size="lg" className="group">
            Evaluate Your Decision
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </LuxuryButton>
        </motion.div>
      </div>
    </div>
  );
};

export default WhoThisIsNotFor;
