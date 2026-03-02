import { motion } from "framer-motion";

const GradientMesh = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {/* Gold orb */}
    <motion.div
      animate={{
        x: [0, 80, -40, 0],
        y: [0, -60, 40, 0],
        scale: [1, 1.15, 0.9, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[10%] left-[20%] w-[600px] h-[600px] rounded-full blur-[180px]"
      style={{ background: "radial-gradient(circle, hsl(42 78% 50% / 0.08) 0%, transparent 70%)" }}
    />
    {/* Ice-blue orb */}
    <motion.div
      animate={{
        x: [0, -60, 50, 0],
        y: [0, 50, -30, 0],
        scale: [1, 0.9, 1.1, 1],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] rounded-full blur-[160px]"
      style={{ background: "radial-gradient(circle, hsl(200 80% 55% / 0.06) 0%, transparent 70%)" }}
    />
    {/* Deep purple orb */}
    <motion.div
      animate={{
        x: [0, 40, -60, 0],
        y: [0, -40, 60, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[50%] left-[50%] w-[400px] h-[400px] rounded-full blur-[140px]"
      style={{ background: "radial-gradient(circle, hsl(280 60% 40% / 0.05) 0%, transparent 70%)" }}
    />
  </div>
);

export default GradientMesh;
