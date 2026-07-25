import { Bell, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="h-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex justify-between items-center px-8 relative overflow-hidden">
      
      {/* Top right ambient gradient glow */}
      <div className="absolute right-0 top-0 w-80 h-20 bg-gradient-to-l from-cyan-500/5 to-transparent blur-2xl pointer-events-none" />

      <div>
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 tracking-tight">
          Traffic Control Dashboard
        </h2>

        <p className="text-xs font-mono text-cyan-400/80 font-bold mt-0.5 tracking-wider uppercase">
          AI Powered Smart City Monitoring
        </p>
      </div>

      <div className="flex items-center gap-6 relative z-10">
        {/* Dynamic Glowing Notification Icon wrapper */}
        <div className="relative p-1.5 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer group transition-all">
          <Bell
            className="text-slate-400 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all"
            size={20}
          />
          {/* Pulsing red notification dot */}
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
        </div>

        <span className="h-6 w-[1px] bg-slate-800" />

        <div className="flex items-center gap-3">
          <div className="relative">
            <UserCircle size={38} className="text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
          </div>

          <div>
            <p className="font-bold text-sm tracking-wide text-slate-100">
              Admin
            </p>

            <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              Traffic Control Room
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;