import { motion } from "framer-motion";
import { X, AlertTriangle, TrendingDown, Clock, DollarSign } from "lucide-react";

const problems = [
  {
    icon: <Clock className="w-5 h-5" />,
    stat: "6-12 months",
    problem: "Average time wasted on ideas that fail",
    color: "text-destructive",
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    stat: "$10,000+",
    problem: "Average money lost before pivoting",
    color: "text-orange-500",
  },
  {
    icon: <TrendingDown className="w-5 h-5" />,
    stat: "42%",
    problem: "Startups fail due to no market need",
    color: "text-amber-500",
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    stat: "70%",
    problem: "Of founders wish they validated earlier",
    color: "text-destructive",
  },
];

const badApproaches = [
  "Asking friends & family who won't be honest",
  "Building before validating demand",
  "Relying on gut feeling alone",
  "Using generic AI that sugarcoats",
  "Skipping competitor research",
  "Ignoring pricing psychology",
];

const ProblemAgitation = () => {
  return (
    <section className="luxury-container py-24 border-t border-border/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The cost of
            <span className="font-serif italic font-normal text-destructive"> guessing</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Most founders learn these lessons the hard way
          </p>
        </motion.div>

        {/* Stats Grid */}
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
              className="p-6 bg-card border border-border rounded-2xl text-center hover:border-destructive/30 transition-colors"
            >
              <div className={`${item.color} mb-3 flex justify-center`}>
                {item.icon}
              </div>
              <p className={`text-3xl font-bold ${item.color} mb-2`}>{item.stat}</p>
              <p className="text-xs text-muted-foreground">{item.problem}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bad Approaches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8"
        >
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Stop Making These Validation Mistakes
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {badApproaches.map((approach, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                  <X className="w-3 h-3 text-destructive" />
                </div>
                <span className="text-sm text-muted-foreground">{approach}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemAgitation;
