import { motion } from "framer-motion";

function AnimatedButton({ children }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="
      px-8
      py-4
      rounded-xl
      bg-blue-600
      text-white
      font-semibold
      shadow-lg
      hover:bg-blue-700
      transition
      "
    >
      {children}
    </motion.button>
  );
}

export default AnimatedButton;