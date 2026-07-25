import { motion } from "framer-motion";

function AnimatedPulse() {
  return (
    <motion.div
      className="w-4 h-4 rounded-full bg-blue-600 shadow-lg absolute"
      animate={{
        offsetDistance: ["0%", "100%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        offsetPath: "path('M0,0 L200,0')",
      }}
    />
  );
}

export default AnimatedPulse;