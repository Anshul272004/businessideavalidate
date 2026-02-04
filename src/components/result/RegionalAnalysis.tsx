import { motion } from "framer-motion";
import { Globe, MapPin, Users, Landmark, Wifi, CreditCard, Scale, TrendingUp } from "lucide-react";

interface RegionalAnalysisProps {
  regional_viability_score?: number;
  cultural_fit_analysis?: string;
  localization_requirements?: string[];
  pricing_recommendations?: string;
  distribution_strategy?: string;
  regulatory_checklist?: string[];
  infrastructure_dependencies?: string[];
  local_competitor_map?: { name: string; strength: string; local_advantage: string }[];
  country?: string;
  state?: string;
  cityTier?: string;
}

const RegionalAnalysis = ({
  regional_viability_score = 7,
  cultural_fit_analysis,
  localization_requirements = [],
  pricing_recommendations,
  distribution_strategy,
  regulatory_checklist = [],
  infrastructure_dependencies = [],
  local_competitor_map = [],
  country,
  state,
  cityTier,
}: RegionalAnalysisProps) => {
  const scoreColor = regional_viability_score >= 7 ? "text-success" : 
                     regional_viability_score >= 5 ? "text-primary" : "text-destructive";
  
  const scoreLabel = regional_viability_score >= 8 ? "Excellent Fit" :
                     regional_viability_score >= 6 ? "Good Fit" :
                     regional_viability_score >= 4 ? "Moderate Fit" : "Challenging Fit";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Regional Market Analysis</h3>
            <p className="text-sm text-muted-foreground">
              {country && state ? `${state}, ${country}` : "Geographic viability assessment"}
              {cityTier && ` · ${cityTier.charAt(0).toUpperCase() + cityTier.slice(1)}`}
            </p>
          </div>
        </div>
        
        {/* Score Badge */}
        <div className="text-right">
          <div className={`text-4xl font-bold ${scoreColor}`}>
            {regional_viability_score}/10
          </div>
          <p className="text-sm text-muted-foreground">{scoreLabel}</p>
        </div>
      </div>

      {/* Viability Meter */}
      <div className="mb-8">
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${regional_viability_score * 10}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`h-full ${
              regional_viability_score >= 7 ? "bg-success" :
              regional_viability_score >= 5 ? "bg-primary" : "bg-destructive"
            }`}
          />
        </div>
      </div>

      {/* Cultural Fit Analysis */}
      {cultural_fit_analysis && (
        <div className="mb-8 p-4 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Cultural Fit Analysis</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {cultural_fit_analysis}
          </p>
        </div>
      )}

      {/* Grid Sections */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Pricing Recommendations */}
        {pricing_recommendations && (
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Pricing Strategy</span>
            </div>
            <p className="text-sm text-muted-foreground">{pricing_recommendations}</p>
          </div>
        )}

        {/* Distribution Strategy */}
        {distribution_strategy && (
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Distribution Strategy</span>
            </div>
            <p className="text-sm text-muted-foreground">{distribution_strategy}</p>
          </div>
        )}
      </div>

      {/* Localization Requirements */}
      {localization_requirements.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Localization Requirements</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {localization_requirements.map((req, i) => (
              <span 
                key={i}
                className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium"
              >
                {req}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Infrastructure Dependencies */}
      {infrastructure_dependencies.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Wifi className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Infrastructure Dependencies</span>
          </div>
          <ul className="grid sm:grid-cols-2 gap-2">
            {infrastructure_dependencies.map((dep, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                {dep}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Regulatory Checklist */}
      {regulatory_checklist.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium">Regulatory Considerations</span>
          </div>
          <ul className="space-y-2">
            {regulatory_checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 rounded bg-warning/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-warning text-xs">{i + 1}</span>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Local Competitor Map */}
      {local_competitor_map.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Landmark className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Local Competition Landscape</span>
          </div>
          <div className="space-y-3">
            {local_competitor_map.map((competitor, i) => (
              <div 
                key={i}
                className="p-3 rounded-lg bg-muted/30 border border-border flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-sm">{competitor.name}</p>
                  <p className="text-xs text-muted-foreground">{competitor.local_advantage}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  competitor.strength === "strong" ? "bg-destructive/10 text-destructive" :
                  competitor.strength === "moderate" ? "bg-warning/10 text-warning" :
                  "bg-success/10 text-success"
                }`}>
                  {competitor.strength}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default RegionalAnalysis;
