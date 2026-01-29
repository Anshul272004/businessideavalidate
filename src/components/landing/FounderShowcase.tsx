import { motion } from "framer-motion";
import { Quote, ExternalLink, ArrowUpRight } from "lucide-react";

const successStories = [
  {
    name: "Sarah Chen",
    company: "DataSync",
    avatar: "SC",
    role: "Founder & CEO",
    verdict: "GO",
    story: "Got a GO verdict. Built MVP in 6 weeks. Now at $42K MRR.",
    revenue: "$42K MRR",
    timeframe: "8 months",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    name: "Marcus Rodriguez",
    company: "LocalHero",
    avatar: "MR",
    role: "Solo Founder",
    verdict: "PIVOT",
    story: "PIVOT saved me. Shifted from B2C to B2B. Just raised seed round.",
    revenue: "$500K Raised",
    timeframe: "12 months",
    gradient: "from-primary/20 to-amber-500/20",
  },
  {
    name: "Priya Patel",
    company: "HealthTrack",
    avatar: "PP",
    role: "Co-founder",
    verdict: "KILL",
    story: "KILL verdict hurt but saved 8 months. New idea got GO, now profitable.",
    revenue: "$18K MRR",
    timeframe: "6 months",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
];

const FounderShowcase = () => {
  return (
    <section className="luxury-container py-24 border-t border-border/50">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-6"
        >
          <ArrowUpRight className="w-4 h-4" />
          Real Results
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          From validation to <span className="font-serif italic font-normal">revenue</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-muted-foreground max-w-lg mx-auto"
        >
          Founders who trusted the verdict and took action
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {successStories.map((story, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${story.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {story.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{story.name}</p>
                    <p className="text-sm text-muted-foreground">{story.role}</p>
                  </div>
                </div>
                
                {/* Verdict Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  story.verdict === "GO" 
                    ? "bg-success/20 text-success" 
                    : story.verdict === "PIVOT" 
                    ? "bg-primary/20 text-primary" 
                    : "bg-destructive/20 text-destructive"
                }`}>
                  {story.verdict}
                </span>
              </div>

              {/* Quote */}
              <div className="mb-6">
                <Quote className="w-5 h-5 text-primary/30 mb-2" />
                <p className="text-muted-foreground leading-relaxed">{story.story}</p>
              </div>

              {/* Results */}
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Result</p>
                  <p className="font-bold text-success">{story.revenue}</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Timeframe</p>
                  <p className="font-bold">{story.timeframe}</p>
                </div>
              </div>

              {/* Company */}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Building {story.company}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FounderShowcase;