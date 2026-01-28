import { motion } from "framer-motion";
import { Search, Lightbulb, AlertTriangle, CheckCircle, FlaskConical } from "lucide-react";

interface ResearchTrailProps {
  keyAssumptions: string[];
  dealbreakers: string[];
  unfairAdvantages: string[];
  momTestPass: boolean;
}

const ResearchTrail = ({ 
  keyAssumptions, 
  dealbreakers, 
  unfairAdvantages,
  momTestPass 
}: ResearchTrailProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary">
          <FlaskConical className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">Research Trail</h3>
      </div>

      <div className="space-y-6">
        {/* Mom Test Badge */}
        <div className={`flex items-center gap-4 p-4 rounded-xl border ${
          momTestPass 
            ? "bg-success/5 border-success/20" 
            : "bg-destructive/5 border-destructive/20"
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            momTestPass ? "bg-success/20" : "bg-destructive/20"
          }`}>
            {momTestPass ? (
              <CheckCircle className="w-5 h-5 text-success" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-destructive" />
            )}
          </div>
          <div>
            <p className="font-medium">
              {momTestPass ? "Passes The Mom Test" : "Fails The Mom Test"}
            </p>
            <p className="text-sm text-muted-foreground">
              {momTestPass 
                ? "Strangers would likely pay before seeing it built" 
                : "Needs more validation before strangers would pay"}
            </p>
          </div>
        </div>

        {/* Key Assumptions to Validate */}
        {keyAssumptions && keyAssumptions.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-primary" />
              <p className="text-sm font-medium">Key Assumptions to Validate</p>
            </div>
            <div className="space-y-2">
              {keyAssumptions.map((assumption, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{assumption}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Dealbreakers */}
        {dealbreakers && dealbreakers.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <p className="text-sm font-medium">Potential Dealbreakers</p>
            </div>
            <div className="space-y-2">
              {dealbreakers.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/10"
                >
                  <span className="text-destructive">⚠️</span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unfair Advantages Needed */}
        {unfairAdvantages && unfairAdvantages.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-success" />
              <p className="text-sm font-medium">Unfair Advantages Needed</p>
            </div>
            <div className="space-y-2">
              {unfairAdvantages.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-success/5 rounded-lg border border-success/10"
                >
                  <span className="text-success">🚀</span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchTrail;
