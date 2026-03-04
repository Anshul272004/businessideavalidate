import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { motion } from "framer-motion";

interface VerdictRadarChartProps {
  painScore: number;
  confidenceScore: number;
  founderFitScore?: number;
  regionalScore?: number;
  marketTiming?: string;
  executionRisk?: string;
}

const VerdictRadarChart = ({
  painScore,
  confidenceScore,
  founderFitScore,
  regionalScore,
  marketTiming,
  executionRisk,
}: VerdictRadarChartProps) => {
  const timingMap: Record<string, number> = { perfect: 10, good: 8, moderate: 6, early: 5, late: 4, risky: 3 };
  const riskMap: Record<string, number> = { low: 9, medium: 6, high: 3 };

  const data = [
    { dimension: "Demand", value: painScore * 10 },
    { dimension: "Confidence", value: confidenceScore },
    { dimension: "Founder Fit", value: (founderFitScore || 6) * 10 },
    { dimension: "Regional", value: (regionalScore || 6) * 10 },
    { dimension: "Timing", value: (timingMap[marketTiming || "moderate"] || 6) * 10 },
    { dimension: "Execution", value: (riskMap[executionRisk || "medium"] || 6) * 10 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="premium-card rounded-2xl p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Verdict Breakdown</h3>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="hsl(220 14% 15%)" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: "hsl(220 10% 48%)", fontSize: 11 }}
            />
            <Radar
              dataKey="value"
              stroke="hsl(42 78% 50%)"
              fill="hsl(42 78% 50%)"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {data.map((d) => (
          <div key={d.dimension} className="text-center">
            <p className="text-lg font-bold font-mono tabular-nums text-primary">{d.value}%</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{d.dimension}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default VerdictRadarChart;
