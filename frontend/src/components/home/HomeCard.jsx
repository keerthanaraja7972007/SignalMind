import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, Cpu } from "lucide-react";

function HomeCard({
  icon,
  title,
  description,
  buttonText,
  route,
  color,
  features = []
}) {
  const isGreen = color === "green";
  
  // Dynamic glow borders based on operational context
  const cardBorderGlow = isGreen 
    ? "hover:border-emerald-500/40 hover:shadow-[0_0_50px_rgba(52,211,153,0.1)]" 
    : "hover:border-cyan-500/40 hover:shadow-[0_0_50px_rgba(34,211,238,0.1)]";

  const btnGradient = isGreen
    ? "from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-emerald-950/50"
    : "from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-cyan-950/50";

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-3xl bg-slate-900/40 backdrop-blur-2xl p-8 md:p-10 border border-slate-800/80 shadow-2xl transition-all duration-300 group ${cardBorderGlow}`}
    >
      {/* Decorative Radial Lighting */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20 ${isGreen ? 'bg-emerald-400' : 'bg-cyan-400'}`} />

      {/* Component Header Block */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-5xl filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className={`p-2 rounded-xl bg-slate-950/60 border ${isGreen ? 'border-emerald-500/20 text-emerald-400' : 'border-cyan-500/20 text-cyan-400'}`}>
          {isGreen ? <Cpu className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
        {title}
      </h3>

      <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 min-h-[72px]">
        {description}
      </p>

      {/* Upgraded High-Contrast Feature Badges */}
      <div className="space-y-3.5 mb-8 border-t border-slate-800/60 pt-6">
        {features.map((feat, index) => (
          <div key={index} className="flex items-center gap-3 text-sm text-slate-300">
            <CheckCircle2 size={18} className={isGreen ? "text-emerald-400" : "text-cyan-400"} />
            <span className="font-medium">{feat}</span>
          </div>
        ))}
      </div>

      {/* Premium CTAs */}
      <Link to={route} className="block w-full">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className={`w-full bg-gradient-to-r ${btnGradient} text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 shadow-lg transition-all duration-300 group-hover:gap-4`}
        >
          {buttonText}
          <ArrowRight size={18} className="transform transition-transform group-hover:translate-x-0.5" />
        </motion.button>
      </Link>
    </motion.div>
  );
}

export default HomeCard;