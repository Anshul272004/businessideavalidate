import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LuxuryPreloader = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("bv-preloaded") === "1") {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem("bv-preloaded", "1");
      setDone(true);
    }, 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="luxury-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.7, 0, 0.2, 1] } }}
        >
          <motion.div
            className="ui-label-sm text-primary/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            EST.&nbsp;&nbsp;2026
          </motion.div>

          <motion.div
            className="editorial-display text-4xl md:text-6xl text-foreground"
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.08em" }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="gold-sheen">VALIDATE</span>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 220 }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.7, 0, 0.2, 1] }}
            className="h-px bg-primary/60"
          />

          <motion.div
            className="ui-label-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            DECISION&nbsp;&nbsp;INTELLIGENCE
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LuxuryPreloader;
