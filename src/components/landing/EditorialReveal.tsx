import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface EditorialRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "h1" | "h2" | "h3" | "p" | "span";
}

const EditorialReveal = ({
  children,
  delay = 0,
  className = "",
  as = "div",
}: EditorialRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as never}
      initial={{ opacity: 0, y: 28, clipPath: "inset(0 100% 0 0)" }}
      animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" } : {}}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default EditorialReveal;
