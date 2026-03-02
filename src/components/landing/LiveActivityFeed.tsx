import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, TrendingUp, RefreshCw } from "lucide-react";

const cities = [
  "London", "San Francisco", "Berlin", "Mumbai", "Singapore", "Tel Aviv",
  "New York", "Toronto", "Sydney", "Dubai", "Amsterdam", "Lagos", 
  "São Paulo", "Austin", "Bangalore", "Seoul", "Stockholm", "Nairobi",
];

const ideaTypes = [
  "SaaS", "marketplace", "fintech", "healthtech", "edtech", "AI tool",
  "e-commerce", "B2B platform", "developer tool", "proptech",
];

const verdicts: Array<{ type: "GO" | "PIVOT" | "KILL"; weight: number }> = [
  { type: "GO", weight: 35 },
  { type: "PIVOT", weight: 40 },
  { type: "KILL", weight: 25 },
];

const pickVerdict = () => {
  const r = Math.random() * 100;
  if (r < 35) return "GO";
  if (r < 75) return "PIVOT";
  return "KILL";
};

const verdictIcons = {
  GO: <CheckCircle2 className="w-3.5 h-3.5 text-success" />,
  PIVOT: <RefreshCw className="w-3.5 h-3.5 text-primary" />,
  KILL: <TrendingUp className="w-3.5 h-3.5 text-destructive" />,
};

const verdictColors = {
  GO: "text-success",
  PIVOT: "text-primary", 
  KILL: "text-destructive",
};

interface Notification {
  id: number;
  city: string;
  ideaType: string;
  verdict: "GO" | "PIVOT" | "KILL";
  timeAgo: string;
}

const generateNotification = (id: number): Notification => ({
  id,
  city: cities[Math.floor(Math.random() * cities.length)],
  ideaType: ideaTypes[Math.floor(Math.random() * ideaTypes.length)],
  verdict: pickVerdict(),
  timeAgo: `${Math.floor(Math.random() * 8) + 1} min ago`,
});

const LiveActivityFeed = () => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Show first notification after 5 seconds
    const firstTimeout = setTimeout(() => {
      setNotification(generateNotification(0));
      setCount(1);
    }, 5000);

    // Then show subsequent ones every 9-13 seconds, max 4
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          return prev;
        }
        setNotification(generateNotification(prev));
        return prev + 1;
      });
    }, 9000 + Math.random() * 4000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 4000);
    return () => clearTimeout(timer);
  }, [notification]);

  if (count > 4) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -20, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="pointer-events-auto px-4 py-3 rounded-xl bg-card/95 border border-border/80 backdrop-blur-lg shadow-xl max-w-xs"
          >
            <div className="flex items-center gap-2.5">
              {verdictIcons[notification.verdict]}
              <div className="min-w-0">
                <p className="text-xs text-foreground leading-tight">
                  A founder in <span className="font-medium">{notification.city}</span> received a{" "}
                  <span className={`font-bold ${verdictColors[notification.verdict]}`}>
                    {notification.verdict}
                  </span>{" "}
                  verdict
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {notification.ideaType} • {notification.timeAgo}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveActivityFeed;
