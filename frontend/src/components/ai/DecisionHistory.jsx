import { useContext } from "react";
import { TrafficContext } from "../../context/TrafficContext";

function DecisionHistory() {
  const { decisionHistory = [] } = useContext(TrafficContext);

  return (
    <div className="rounded-3xl bg-slate-800 border border-slate-700 p-8 shadow-xl">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold text-white">
          📜 AI Decision History
        </h2>

        <div className="text-cyan-400 text-xl font-semibold">
          Total AI Decisions : {decisionHistory.length}
        </div>

      </div>

      <div className="space-y-6 max-h-[700px] overflow-y-auto">

        {decisionHistory
          .slice()
          .reverse()
          .map((decision, index) => (

            <div
              key={decision.id}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-700"
            >

              <h3 className="text-xl font-bold text-cyan-400 mb-4">
                Decision #{decisionHistory.length - index}
              </h3>

              <div className="grid grid-cols-2 gap-3 text-slate-200">

                <p>
                  <b>Time:</b> {decision.time}
                </p>

                <p>
                  <b>Status:</b> {decision.status}
                </p>

                <p>
                  <b>From:</b> {decision.from}
                </p>

                <p>
                  <b>To:</b> {decision.to}
                </p>

                <p>
                  <b>Decision:</b> {decision.action}
                </p>

                <p>
                  <b>Seconds:</b> +{decision.seconds}
                </p>

              </div>

            </div>

          ))}

      </div>

    </div>
  );
}

export default DecisionHistory;