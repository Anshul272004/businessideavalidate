import { motion } from "framer-motion";
import { BriefcaseBusiness, Layers3, Users, WalletCards, Rocket } from "lucide-react";

interface StartupBriefCardProps {
  startupBrief?: {
    idea?: string | null;
    problem?: string | null;
    solution?: string | null;
    target_customer?: string | null;
    target_segment?: string | null;
    industry?: string | null;
    revenue_model?: string | null;
    price_point?: string | null;
    platform?: string | null;
    stage?: string | null;
  } | null;
}

const StartupBriefCard = ({ startupBrief }: StartupBriefCardProps) => {
  if (!startupBrief) return null;

  const items = [
    { label: "Industry", value: startupBrief.industry, icon: <BriefcaseBusiness className="h-4 w-4" /> },
    { label: "Target Segment", value: startupBrief.target_segment || startupBrief.target_customer, icon: <Users className="h-4 w-4" /> },
    { label: "Revenue Model", value: startupBrief.revenue_model, icon: <WalletCards className="h-4 w-4" /> },
    { label: "Stage", value: startupBrief.stage, icon: <Rocket className="h-4 w-4" /> },
  ].filter((item) => item.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="premium-card rounded-2xl p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="text-primary">
          <Layers3 className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold">Structured Startup Brief</h3>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          {startupBrief.idea ? (
            <div>
              <p className="luxury-label mb-2 block">Startup concept</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{startupBrief.idea}</p>
            </div>
          ) : null}

          {startupBrief.problem ? (
            <div>
              <p className="luxury-label mb-2 block">Problem</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{startupBrief.problem}</p>
            </div>
          ) : null}

          {startupBrief.solution ? (
            <div>
              <p className="luxury-label mb-2 block">Solution</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{startupBrief.solution}</p>
            </div>
          ) : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {items.map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-secondary/40 p-4">
              <div className="mb-2 flex items-center gap-2 text-primary">
                {item.icon}
                <span className="text-xs font-semibold uppercase tracking-[0.16em]">{item.label}</span>
              </div>
              <p className="text-sm capitalize text-foreground">{item.value}</p>
            </div>
          ))}

          {startupBrief.price_point ? (
            <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Planned price</p>
              <p className="text-sm text-foreground">{startupBrief.price_point}</p>
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default StartupBriefCard;
