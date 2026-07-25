import { useContext } from "react";
import { TrafficContext } from "../../context/TrafficContext";

function AIDecisionHistory() {
  const { aiHistory } = useContext(TrafficContext);

  return (
    <div className="rounded-3xl bg-slate-800 border border-slate-700 p-8 shadow-xl">

      <h2 className="text-3xl font-bold text-white mb-2">
        📊 AI Decision History
      </h2>

      <p className="text-slate-400 mb-8">
        Total AI Decisions : {aiHistory.length}
      </p>

      <div className="space-y-5 max-h-[700px] overflow-y-auto">

        {[...aiHistory].reverse().map((item, index) => (

          <div
            key={item.id}
            className="bg-slate-900 rounded-2xl p-6 border border-slate-700"
          >

            <h3 className="text-xl font-bold text-cyan-400 mb-4">
              Decision #{aiHistory.length - index}
            </h3>

            <div className="grid grid-cols-2 gap-4 text-white">

              <div>
                <span className="text-slate-400">Time</span>
                <p>{item.time}</p>
              </div>

              <div>
                <span className="text-slate-400">From</span>
                <p>{item.from}</p>
              </div>

              <div>
                <span className="text-slate-400">To</span>
                <p>{item.to}</p>
              </div>

              <div>
                <span className="text-slate-400">Decision</span>
                <p>{item.request}</p>
              </div>

              <div>
                <span className="text-slate-400">Status</span>
                <p>{item.status}</p>
              </div>

              <div>
                <span className="text-slate-400">Impact</span>
                <p>{item.impact}</p>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AIDecisionHistory;