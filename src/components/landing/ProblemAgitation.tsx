import { motion } from "framer-motion";
import { X, Clock, DollarSign, TrendingDown, AlertTriangle } from "lucide-react";

const problems = [
  {
    icon: <Clock className="w-5 h-5" />,
    stat: "14 months",
    problem: "Average time lost on failed ventures",
    color: "text-destructive",
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    stat: "$47,000",
    problem: "Average capital lost before pivoting",
    color: "text-destructive",
  },
  {
    icon: <TrendingDown className="w-5 h-5" />,
    stat: "42%",
    problem: "Startups fail due to no market need",
    color: "text-muted-foreground",
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    stat: "70%",
    problem: "Founders wish they validated earlier",
    color: "text-muted-foreground",
  },
];

const mistakes = [
  "Asking friends who will not be honest",
  "Building before validating demand",
  "Trusting gut feeling over evidence",
  "Using generic AI that avoids hard truths",
  "Skipping founder-market fit analysis",
  "Ignoring execution difficulty",
];

const ProblemAgitation = () => {
  return (
    <section className="luxury-container py-20 border-t border-border/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">The Reality</p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            The cost of <span className="font-serif italic font-normal text-destructive">guessing</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            These are the lessons most founders learn the hard way
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-card border border-border rounded-xl text-center"
            >
              <div className={`${item.color} mb-3 flex justify-center`}>
                {item.icon}
              </div>
              <p className={`text-2xl font-semibold ${item.color} mb-2`}>{item.stat}</p>
              <p className="text-xs text-muted-foreground">{item.problem}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mistakes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-xl bg-card border border-border"
        >
          <h3 className="text-lg font-semibold mb-6">Common validation mistakes</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {mistakes.map((mistake, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <X className="w-3 h-3 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">{mistake}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemAgitation;
