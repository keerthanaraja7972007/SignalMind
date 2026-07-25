import { useState, useEffect, useContext } from "react";
import HomeCard from "../components/home/HomeCard";
import HeroBackground from "../components/home/HeroBackground";
import SmartCityIllustration from "../components/home/SmartCityIllustration";
import { TrafficContext } from "../context/TrafficContext";
import {
  Brain,
  Activity,
  Car,
  AlertTriangle,
  Cpu,
  Clock,
  Terminal,
} from "lucide-react";

function Home() {
  const { incidents, junctions } = useContext(TrafficContext);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    /* We change this to 'relative z-0' to establish a clean stacking context */
    <div className="relative z-0 min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 select-none">
      
      {/* The background particles component is placed safely underneath */}
      <HeroBackground />

      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 space-y-12">
        
        {/* Upper HUD / Telemetry Deck */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl px-6 py-4 gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-cyan-400 animate-spin-slow" />
            <div>
              <span className="block text-xs font-mono font-black tracking-widest text-cyan-300 uppercase">SIGNALMIND CORE MATRIX</span>
              <span className="text-[10px] text-slate-400 font-mono">LATENCY: 4.8ms | AGENTS: 2,400+</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-mono text-white font-bold">
            <span className="text-cyan-300 flex items-center gap-1.5 bg-cyan-950/40 border border-cyan-900/80 px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4 text-cyan-400" /> {currentTime}
            </span>
            <span className="hidden md:inline h-6 w-px bg-slate-800" />
            <div className="bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> INTERACTIVE STATE
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center pt-4">
          
          {/* Left Text Block */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full text-xs font-black tracking-widest text-cyan-400 uppercase">
              <Brain className="w-4 h-4 text-cyan-400 animate-pulse" /> LIVE NEURAL GRID ENGINE
            </div>

            {/* TONED DOWN TITLE: Clean matte gradient with no blinding glow dropshadow */}
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
              SignalMind
            </h1>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-200 tracking-tight leading-snug">
              Negotiating Traffic <span className="text-cyan-400">Before Congestion Materializes</span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg font-normal leading-relaxed max-w-xl bg-slate-900/50 p-4 rounded-2xl border border-slate-800 backdrop-blur-sm">
              Intelligent multi-agent arrays organize city signals, isolate collisions automatically, balance local network routing, and secure emergency ambulance corridors instantly.
            </p>
          </div>

          {/* Right Connectome Graphic */}
          <div className="relative">
            <SmartCityIllustration />
          </div>
        </div>
 

        {/* Live Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
          
          <div className="group rounded-2xl bg-slate-900/60 border border-slate-800 p-6 text-center shadow-lg hover:border-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1">
            <Activity className="mx-auto text-emerald-400 mb-2" size={32} />
            <h2 className="text-4xl font-black text-white">{junctions.length}</h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono mt-1">Active Junctions</p>
            <div className="w-full bg-slate-950 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-400 h-full w-[85%] rounded-full" />
            </div>
          </div>

          <div className="group rounded-2xl bg-slate-900/60 border border-slate-800 p-6 text-center shadow-lg hover:border-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1">
            <Car className="mx-auto text-cyan-400 mb-2" size={32} />
            <h2 className="text-4xl font-black text-white">124K+</h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono mt-1">Vehicles Managed</p>
            <div className="w-full bg-slate-950 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-cyan-400 h-full w-[60%] rounded-full" />
            </div>
          </div>

          <div className="group rounded-2xl bg-slate-900/60 border border-red-500/20 p-6 text-center shadow-xl hover:border-red-500/40 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
            <AlertTriangle className="mx-auto text-red-400 mb-2 animate-bounce" size={32} />
            <h2 className="text-4xl font-black text-red-400">{incidents.length}</h2>
            <p className="text-xs font-bold text-red-300 uppercase tracking-widest font-mono mt-1">Active Incidents</p>
            <div className="w-full bg-slate-950 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-red-500 h-full w-[25%] rounded-full" />
            </div>
          </div>

          <div className="group rounded-2xl bg-slate-900/60 border border-slate-800 p-6 text-center shadow-lg hover:border-purple-500/30 transition-all duration-300 transform hover:-translate-y-1">
            <Brain className="mx-auto text-purple-400 mb-2 animate-pulse" size={32} />
            <h2 className="text-4xl font-black text-purple-300">ONLINE</h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono mt-1">AI Status</p>
            <div className="w-full bg-slate-950 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-purple-400 h-full w-[100%] rounded-full" />
            </div>
          </div>

        </div>

        {/* Console Log Ticker */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 overflow-hidden shadow-inner">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[10px] font-bold px-2 py-1 rounded select-none shrink-0">
            <Terminal className="w-3.5 h-3.5" /> AGENT LOGS
          </div>
          <div className="w-full overflow-hidden relative">
            <div className="animate-marquee whitespace-nowrap flex gap-8 text-xs font-mono text-slate-300 font-bold">
              <span>[SYSTEM] Localizing delay patterns in District 4... Sync optimal</span>
              <span className="text-emerald-400">•</span>
              <span>[DECISION] Junction-114 expanded green-light phase by +12s</span>
              <span className="text-cyan-400">•</span>
              <span>[EMS ACTION] Priority Emergency Lane locked for Fleet vehicle #9</span>
              <span className="text-yellow-400">•</span>
              <span>[NEURAL CORE] Auto-recalculating 4,200 paths around Sector 2 delay</span>
            </div>
          </div>
        </div>

        {/* Navigation Portals */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-12">
          <HomeCard
            icon="🚓"
            title="Traffic Control Dashboard"
            description="Examine live municipal logistics grids, active incident alerts, dynamic routing overrides, and dispatch parameters."
            buttonText="System Dashboard"
            route="/dashboard"
            color="blue"
            features={[
              "Distributed Signal Flow Logistics Engine",
              "Dynamic Incident Overhaul Systems",
              "Priority Lane Signal Override Switches"
            ]}
          />

          <HomeCard
            icon="🚗"
            title="Smart Commuter Navigation"
            description="Examine delay-free routes tailored specifically to local road matrices. Plan, predict, and bypass congestions dynamically."
            buttonText="Plan Intelligent Route"
            route="/commuter"
            color="green"
            features={[
              "AI Congestion Mitigation Auditing",
              "Integrated Navigation Speech Dispatcher",
              "Predictive Grid Lock Mitigation"
            ]}
          />
        </div>

      </section>
    </div>
  );
}

export default Home;