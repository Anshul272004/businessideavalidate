import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-1">
      <div className="w-1 h-32 rounded-full bg-border/50 overflow-hidden">
        <motion.div
          className="w-full bg-primary rounded-full"
          style={{ height: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <span className="text-[10px] text-muted-foreground font-mono mt-1">{Math.round(progress)}%</span>
    </div>
  );
};

export default ScrollProgress;
