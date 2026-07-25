import { motion } from "framer-motion";

function HeroBackground() {
  // 75 high-density traffic nodes and road markers
  const particles = Array.from({ length: 75 });
  
  // Real regulatory and hazard road symbol assets
  const roadSymbols = ["🛑", "⚠️", "⛔", "🚸", "🚲", "🚗", "🚓", "🚑", "🧭", "🚧", "🔌"];
  const laneVectors = ["↱", "↰", "⇄", "⇅", "➔", "⚡"];

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 -z-10">
      
      {/* High-visibility clean cyan cyber grid overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glowing background layers */}
      <motion.div
        animate={{ x: [-30, 30, -30], y: [-30, 30, -30] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[150px] -left-16 -top-16"
      />
      <motion.div
        animate={{ x: [30, -30, 30], y: [30, -30, 30] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[650px] h-[650px] bg-emerald-500/10 rounded-full blur-[160px] right-10 top-1/4"
      />
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[550px] h-[550px] bg-purple-500/10 rounded-full blur-[140px] left-1/3 bottom-10"
      />

      {/* Interactive Roadway Particle Grid */}
      {particles.map((_, i) => {
        const speed = 8.5 + (i % 8) * 2.2;
        const size = 0.5 + (i % 5) * 0.15;
        const delay = (i % 15) * 0.25;

        let content;
        let glowClass = "";

        // Even mathematical distribution of specialized traffic elements
        if (i % 4 === 0) {
          // 1. Phasing Traffic Signal (Red/Yellow/Green cycle)
          content = (
            <div className="flex flex-col gap-0.5 bg-slate-950 border border-slate-700 p-1 rounded-full shadow-lg">
              <motion.div 
                animate={{ opacity: [1, 0.2, 0.2, 1] }} 
                transition={{ duration: 3.2, repeat: Infinity, delay: (i % 3) }}
                className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" 
              />
              <motion.div 
                animate={{ opacity: [0.2, 1, 0.2, 0.2] }} 
                transition={{ duration: 3.2, repeat: Infinity, delay: (i % 3) }}
                className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]" 
              />
              <motion.div 
                animate={{ opacity: [0.2, 0.2, 1, 0.2] }} 
                transition={{ duration: 3.2, repeat: Infinity, delay: (i % 3) }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" 
              />
            </div>
          );
        } else if (i % 4 === 1) {
          // 2. Neon Lane Navigation & Rerouting Arrows
          const isGreen = i % 2 === 0;
          content = (
            <span className={`font-mono text-sm font-black ${isGreen ? 'text-emerald-400' : 'text-cyan-400'}`}>
              {laneVectors[i % laneVectors.length]}
            </span>
          );
          glowClass = isGreen 
            ? "drop-shadow-[0_0_6px_rgba(16,185,129,0.7)]" 
            : "drop-shadow-[0_0_6px_rgba(6,182,212,0.7)]";
        } else if (i % 4 === 2) {
          // 3. Official Traffic & Municipal Regulatory Symbols
          content = <span className="text-base select-none">{roadSymbols[i % roadSymbols.length]}</span>;
          glowClass = "drop-shadow-[0_2px_6px_rgba(15,23,42,0.6)]";
        } else {
          // 4. Micro Inductive Road Sensor Loop (Concentric pinging radar)
          content = (
            <div className="relative flex items-center justify-center">
              <div className="w-3 h-3 rounded-full border border-cyan-500/20 animate-ping absolute" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
            </div>
          );
        }

        return (
          <motion.div
            key={i}
            className={`absolute pointer-events-none ${glowClass}`}
            style={{
              left: `${(i * 1.35) % 100}%`,
              top: `${(i * 2.6) % 100}%`,
            }}
            animate={{
              y: [0, -230, 0],
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
              opacity: [0, 0.8, 0],
              // Limit sign rotation so they don't spin chaotically upside down
              rotate: i % 4 === 2 ? [-5, 5, -5] : [0, i % 2 === 0 ? 45 : -45, 0],
              scale: [size, size * 1.2, size],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
}

export default HeroBackground;