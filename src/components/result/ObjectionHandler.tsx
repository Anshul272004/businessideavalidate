import { motion } from "framer-motion";
import { MessageSquare, ArrowRight } from "lucide-react";

interface Objection {
  objection: string;
  counter: string;
}

interface ObjectionHandlerProps {
  objections: Objection[];
}

const ObjectionHandler = ({ objections }: ObjectionHandlerProps) => {
  if (!objections || objections.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary">
          <MessageSquare className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">Objection Handling Guide</h3>
      </div>

      <div className="space-y-4">
        {objections.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
              {/* Objection */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold">❓</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Customer Says:</p>
                  <p className="text-sm font-medium">"{item.objection}"</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>

              {/* Counter */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-success/10 text-success flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold">💡</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">You Respond:</p>
                  <p className="text-sm text-success">{item.counter}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ObjectionHandler;
