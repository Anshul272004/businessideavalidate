import { motion } from "framer-motion";
import { HelpCircle, User, Lightbulb } from "lucide-react";

interface FounderFitQuestionsProps {
  questions: string[];
  eli8_summary?: string;
}

const FounderFitQuestions = ({ questions, eli8_summary }: FounderFitQuestionsProps) => {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      {/* ELI8 Summary */}
      {eli8_summary && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-5 bg-gradient-to-r from-primary/10 to-amber-500/10 border border-primary/20 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-primary" />
            <span className="font-medium text-primary">Explain Like I'm 8</span>
          </div>
          <p className="text-foreground leading-relaxed">"{eli8_summary}"</p>
        </motion.div>
      )}

      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary">
          <User className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">Founder Fit Questions</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Before you proceed, honestly answer these questions:
      </p>

      <div className="space-y-3">
        {questions.map((question, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-border hover:border-primary/30 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <p className="text-muted-foreground pt-1">{question}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FounderFitQuestions;