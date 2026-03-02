import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TypewriterHero = () => {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [showLine3, setShowLine3] = useState(false);
  const [cursor, setCursor] = useState(1);

  const text1 = "Some ideas cost money.";
  const text2 = "Some cost years.";

  useEffect(() => {
    let i = 0;
    const type1 = setInterval(() => {
      if (i < text1.length) {
        setLine1(text1.slice(0, i + 1));
        i++;
      } else {
        clearInterval(type1);
        setCursor(2);
        // Pause then type line 2
        setTimeout(() => {
          let j = 0;
          const type2 = setInterval(() => {
            if (j < text2.length) {
              setLine2(text2.slice(0, j + 1));
              j++;
            } else {
              clearInterval(type2);
              setCursor(0);
              // Pause then reveal line 3
              setTimeout(() => setShowLine3(true), 400);
            }
          }, 45);
        }, 300);
      }
    }, 50);

    return () => clearInterval(type1);
  }, []);

  return (
    <h1 className="text-display font-semibold leading-[1.1] tracking-tight mb-6">
      <span>
        {line1}
        {cursor === 1 && <span className="animate-pulse text-primary">|</span>}
      </span>
      <br />
      <span className="text-muted-foreground">
        {line2}
        {cursor === 2 && <span className="animate-pulse text-primary">|</span>}
      </span>
      <br />
      <AnimatePresence>
        {showLine3 && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-serif italic font-normal gradient-text inline-block"
          >
            Know before you commit.
          </motion.span>
        )}
      </AnimatePresence>
    </h1>
  );
};

export default TypewriterHero;
