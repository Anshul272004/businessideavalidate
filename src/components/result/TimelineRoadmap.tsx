import { motion } from "framer-motion";
import { Milestone, Calendar, Users, DollarSign, Rocket, CheckCircle } from "lucide-react";

interface TimelineRoadmapProps {
  timeline_to_revenue: {
    mvp_weeks?: number;
    first_customer_weeks?: number;
    ten_customers_weeks?: number;
    profitability_months?: number;
  } | null;
  success_probability?: string;
}

const TimelineRoadmap = ({ timeline_to_revenue, success_probability }: TimelineRoadmapProps) => {
  if (!timeline_to_revenue) return null;

  const milestones = [
    {
      icon: <Rocket className="w-4 h-4" />,
      label: "MVP Ready",
      time: timeline_to_revenue.mvp_weeks ? `${timeline_to_revenue.mvp_weeks} weeks` : "TBD",
      color: "bg-primary",
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: "First Customer",
      time: timeline_to_revenue.first_customer_weeks ? `${timeline_to_revenue.first_customer_weeks} weeks` : "TBD",
      color: "bg-success",
    },
    {
      icon: <CheckCircle className="w-4 h-4" />,
      label: "10 Customers",
      time: timeline_to_revenue.ten_customers_weeks ? `${timeline_to_revenue.ten_customers_weeks} weeks` : "TBD",
      color: "bg-success",
    },
    {
      icon: <DollarSign className="w-4 h-4" />,
      label: "Profitability",
      time: timeline_to_revenue.profitability_months ? `${timeline_to_revenue.profitability_months} months` : "TBD",
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <Milestone className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold">Realistic Timeline</h3>
        </div>

        {/* Success Probability */}
        {success_probability && (
          <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl">
            <p className="text-xs text-muted-foreground">Success Probability</p>
            <p className="text-lg font-bold text-primary">{success_probability}</p>
          </div>
        )}
      </div>

      {/* Timeline Visual */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-success to-amber-500 opacity-30" />

        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${milestone.color} text-white flex items-center justify-center flex-shrink-0 relative z-10`}>
                {milestone.icon}
              </div>

              {/* Content */}
              <div className="flex-1 p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{milestone.label}</p>
                  <div className="flex items-center gap-2 text-primary">
                    <Calendar className="w-4 h-4" />
                    <span className="font-bold">{milestone.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground mt-6 text-center">
        * Estimates based on typical startup trajectories. Actual timelines vary based on execution, resources, and market conditions.
      </p>
    </div>
  );
};

export default TimelineRoadmap;