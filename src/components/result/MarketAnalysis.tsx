import { TrendingUp, Users, Swords } from "lucide-react";

interface Competitor {
  name: string;
  weakness: string;
}

interface MarketAnalysisProps {
  tam_estimate: string;
  competitors: Competitor[];
  competitive_advantage: string;
}

const MarketAnalysis = ({ tam_estimate, competitors, competitive_advantage }: MarketAnalysisProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary">
          <TrendingUp className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">Market Analysis</h3>
      </div>

      <div className="space-y-6">
        {/* TAM */}
        <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Addressable Market</p>
            <p className="text-2xl font-bold text-primary">{tam_estimate}</p>
          </div>
        </div>

        {/* Competitors */}
        {competitors && competitors.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Swords className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Competitor Weaknesses to Exploit</p>
            </div>
            <div className="space-y-3">
              {competitors.map((competitor, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium">{competitor.name}</p>
                    <p className="text-sm text-muted-foreground">{competitor.weakness}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Competitive Advantage */}
        {competitive_advantage && (
          <div className="p-4 bg-success/5 border border-success/20 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Your Potential Edge</p>
            <p className="text-success font-medium">{competitive_advantage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketAnalysis;
