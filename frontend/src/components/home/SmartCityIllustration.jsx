import { motion } from "framer-motion";
import { Cpu, ShieldAlert, Navigation, Sliders } from "lucide-react";

function SmartCityIllustration() {
  return (
    <div className="relative flex justify-center items-center h-[520px] w-full max-w-[550px] mx-auto select-none">
      
      {/* Glow Center Ring */}
      <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-[50px] animate-pulse" />

      {/* SVG Connecting Tracks & Moving Packets */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
        <line x1="90" y1="90" x2="250" y2="250" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="5 5" className="opacity-40" />
        <line x1="410" y1="90" x2="250" y2="250" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 5" className="opacity-40" />
        <line x1="90" y1="410" x2="250" y2="250" stroke="#10b981" strokeWidth="1.5" strokeDasharray="5 5" className="opacity-40" />
        <line x1="410" y1="410" x2="250" y2="250" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5 5" className="opacity-40" />

        {/* Data Transit Flows */}
        <circle r="4.5" fill="#22d3ee">
          <animateMotion path="M 90 90 L 250 250" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle r="4.5" fill="#fbbf24">
          <animateMotion path="M 410 90 L 250 250" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle r="4.5" fill="#34d399">
          <animateMotion path="M 90 410 L 250 250" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle r="4.5" fill="#f87171">
          <animateMotion path="M 410 410 L 250 250" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Rotation Rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-80 h-80 rounded-full border border-dashed border-cyan-500/40 flex items-center justify-center"
      >
        <div className="w-64 h-64 rounded-full border border-dashed border-emerald-500/30" />
      </motion.div>

      {/* Central Engine Module */}
      <div className="absolute p-8 rounded-3xl bg-slate-900 border-2 border-cyan-400 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.5)] z-10 text-center transform hover:scale-105 transition-transform duration-300">
        <Cpu className="w-16 h-16 text-cyan-400 mx-auto animate-pulse" />
        <div className="mt-2 text-xs font-mono font-black text-cyan-300 tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">SMART ENGINE</div>
        <div className="mt-1 text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">99.4% EFFICIENCY</div>
      </div>

      {/* Node 1 (Top Left) - Traffic Grid */}
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-2 p-3 rounded-2xl bg-slate-900 border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] text-cyan-400 flex items-center gap-3 z-20 hover:border-cyan-400 transition-all cursor-pointer"
      >
        <span className="text-2xl animate-pulse">🚗</span>
        <div>
          <div className="text-[9px] text-slate-400 font-bold uppercase font-mono">Node Alpha-1</div>
          <div className="text-xs font-black text-white">Flow Optimized</div>
        </div>
      </motion.div>

      {/* Node 2 (Bottom Right) - Incident Priority Control */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-10 right-2 p-3 rounded-2xl bg-slate-900 border-2 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)] text-red-400 flex items-center gap-3 z-20 hover:border-red-400 transition-all cursor-pointer"
      >
        <ShieldAlert className="w-5 h-5 text-red-400 animate-bounce" />
        <div>
          <div className="text-[9px] text-slate-400 font-bold uppercase font-mono">Corridor Lock</div>
          <div className="text-xs font-black text-red-400">Ambulance Route</div>
        </div>
      </motion.div>

      {/* Node 3 (Bottom Left) - Navigation Coordinates */}
      <motion.div 
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-2 p-3 rounded-2xl bg-slate-900 border-2 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] text-emerald-400 flex items-center gap-3 z-20 hover:border-emerald-400 transition-all cursor-pointer"
      >
        <Navigation className="w-5 h-5 text-emerald-400" />
        <div>
          <div className="text-[9px] text-slate-400 font-bold uppercase font-mono">Commuter Hub</div>
          <div className="text-xs font-black text-emerald-300">Fast-Path Online</div>
        </div>
      </motion.div>

      {/* Node 4 (Top Right) - Adaptive Signal Phase System */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute top-10 right-2 p-3 rounded-2xl bg-slate-900 border-2 border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.3)] text-amber-400 flex items-center gap-3 z-20 hover:border-amber-400 transition-all cursor-pointer"
      >
        <Sliders className="w-5 h-5 text-amber-400 rotate-90" />
        <div>
          <div className="text-[9px] text-slate-400 font-bold uppercase font-mono">Traffic Lights</div>
          <div className="text-xs font-black text-amber-300 flex items-center gap-1">
            🔴 🟡 <span className="animate-pulse">🟢 100% Sync</span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

export default SmartCityIllustration;