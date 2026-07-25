import { Clock } from "lucide-react";

function DecisionTimeline({ logs }) {
  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div
          key={log.id}
          className="border-l-4 border-cyan-400 pl-4 py-3 bg-slate-800 border border-slate-700 rounded-xl shadow-lg transition-all duration-300 hover:bg-slate-700"
        >
          <div className="flex items-center gap-2 text-cyan-400 font-semibold">
            <Clock size={18} />
            {log.time}
          </div>

          <h3 className="font-bold mt-2 text-white">
            {log.agent}
          </h3>

          <p className="text-slate-300">
            {log.message}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DecisionTimeline;