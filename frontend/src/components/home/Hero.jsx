import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import SmartCityIllustration from "./SmartCityIllustration";
import HomeCard from "./HomeCard";

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center py-16 md:py-24 text-slate-100 overflow-hidden select-none">
      
      {/* Background Engine Matrix */}
      <HeroBackground />

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 z-10 space-y-20">
        
        {/* Main Split Hero Display Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/30 px-4 py-2 rounded-full text-xs font-bold tracking-wider text-cyan-400 uppercase shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              🚦 AI-Powered Autonomous Urban Transit
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              SignalMind
            </h1>

            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-200 tracking-tight leading-snug">
              Negotiating Traffic <span className="text-cyan-400">Before Congestion Materializes</span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
              An enterprise multi-agent grid ecosystem orchestrating live municipal networks. Balance system loads dynamically, configure green corridors for emergency crews, and optimize commuter vectors simultaneously.
            </p>

            {/* Quick Micro System KPIs for immediate high-level overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-900">
              <div className="bg-slate-900/40 p-3 rounded-2xl border border-slate-800">
                <div className="text-xs font-bold text-slate-500 uppercase">Junctions</div>
                <div className="text-xl font-extrabold text-white mt-0.5">248 Nodes</div>
              </div>
              <div className="bg-slate-900/40 p-3 rounded-2xl border border-slate-800">
                <div className="text-xs font-bold text-slate-500 uppercase">Vehicles</div>
                <div className="text-xl font-extrabold text-white mt-0.5">124K+</div>
              </div>
              <div className="bg-slate-900/40 p-3 rounded-2xl border border-slate-800">
                <div className="text-xs font-bold text-slate-500 uppercase">Incidents</div>
                <div className="text-xl font-extrabold text-amber-400 mt-0.5">12 Active</div>
              </div>
              <div className="bg-slate-900/40 p-3 rounded-2xl border border-slate-800">
                <div className="text-xs font-bold text-slate-500 uppercase">AI Status</div>
                <div className="text-xl font-extrabold text-emerald-400 mt-0.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Online
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Vector Illustration Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <SmartCityIllustration />
          </motion.div>
        </div>

        {/* Section Header for Modules */}
        <div className="text-center space-y-3 pt-6">
          <h3 className="text-3xl font-extrabold text-white tracking-tight">Select Operation Terminal</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">Choose an execution context interface layer to test simulated routing parameters.</p>
        </div>

        {/* Dual Component Entry Cards Matrix */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 items-stretch"
        >
          <HomeCard
            icon="🚓"
            title="Traffic Control Matrix"
            description="Access the municipal enforcement dashboard. Oversee inter-junction agent metrics, handle active crash disruptions, and monitor automatic emergency fast-tracks."
            buttonText="Launch Master Console"
            route="/dashboard"
            color="blue"
            features={[
              "Multi-Agent Negotiation Feeds",
              "Real-Time Incident Control Systems",
              "Emergency Fast-Path Automation Logs"
            ]}
          />

          <HomeCard
            icon="🚗"
            title="Smart Commuter Suite"
            description="Review localized routing optimization setups. Explore network load-balanced directions, voice triggers, and dynamic alternative route recommendations."
            buttonText="Launch User Simulator"
            route="/dashboard" // Update to a commuter route if separate, or rely on internal dashboard tabs
            color="green"
            features={[
              "Distributed Delay Minimization Routing",
              "Tamil Speech Context Alerts Engine",
              "Downstream Congestion Preemption"
            ]}
          />
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;