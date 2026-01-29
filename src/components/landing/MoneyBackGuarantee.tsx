import { motion } from "framer-motion";
import { Shield, CheckCircle } from "lucide-react";

const MoneyBackGuarantee = () => {
  return (
    <section className="luxury-container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-success/10 via-card to-card border border-success/20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-[80px]" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-[60px]" />
          
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            {/* Shield Icon */}
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <div className="w-24 h-24 rounded-2xl bg-success/20 flex items-center justify-center">
                <Shield className="w-12 h-12 text-success" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                100% Money-Back Guarantee
              </h3>
              <p className="text-muted-foreground mb-6 max-w-lg">
                If you don't find the analysis valuable within 24 hours of receiving your report, 
                we'll refund your payment in full. No questions asked.
              </p>
              
              {/* Guarantees */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {[
                  "Brutally honest analysis",
                  "Actionable insights",
                  "No fluff or generic advice",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MoneyBackGuarantee;