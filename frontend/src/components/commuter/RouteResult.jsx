import { Lightbulb } from "lucide-react";

function RouteResult({
  routeOptions,
  selectedRoute,
  selectedRouteId,
  setSelectedRouteId,
  routeAlert,
  handleAcceptBetterRoute,
  handleIgnoreBetterRoute,
}) {
  if (!selectedRoute) {
    return (
      <div className="bg-slate-900 rounded-3xl shadow-xl border border-slate-700 p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-100">🧠 AI Route Recommendation</h2>
          <p className="text-slate-400 mt-6">
            Select junctions and generate a smart route to view recommendations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {routeAlert && (
        <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-5 text-amber-100">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <div>
              <strong className="block text-white">⚠ Better Route Found</strong>
              <p className="mt-2 text-sm text-amber-200">{routeAlert.message}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAcceptBetterRoute}
                className="rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950"
              >
                Accept
              </button>
              <button
                onClick={handleIgnoreBetterRoute}
                className="rounded-2xl border border-amber-400 px-4 py-2 text-sm text-amber-200"
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-900 rounded-3xl shadow-xl border border-slate-700 p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lightbulb className="text-cyan-400" />
            <div>
              <h2 className="text-3xl font-bold text-cyan-300">SignalMind AI Recommendation</h2>
              <p className="text-slate-400 mt-2">Recommended route based on current junction congestion and incidents.</p>
            </div>
          </div>
          <div className="text-right text-sm text-slate-400">
            AI Confidence
            <div className="mt-1 text-white font-semibold">{selectedRoute.confidence}</div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl bg-slate-950/90 p-5 border border-slate-700">
            <p className="text-slate-400">Recommended Route</p>
            <p className="text-white text-2xl font-semibold mt-2">{selectedRoute.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-3xl bg-slate-950/90 p-4 border border-slate-700">
              <p className="text-slate-400">Average Jam Score</p>
              <p className="text-white font-semibold mt-2">{selectedRoute.jamScore}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/90 p-4 border border-slate-700">
              <p className="text-slate-400">Estimated Arrival</p>
              <p className="text-white font-semibold mt-2">{selectedRoute.eta}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/90 p-4 border border-slate-700">
              <p className="text-slate-400">Traffic</p>
              <p className="text-white font-semibold mt-2">{selectedRoute.traffic}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/90 p-4 border border-slate-700">
              <p className="text-slate-400">Incident Count</p>
              <p className="text-white font-semibold mt-2">{selectedRoute.incidentCount}</p>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-950/90 p-5 border border-slate-700">
            <p className="text-slate-400">Reason</p>
            <p className="text-white mt-3 leading-7">
              {selectedRoute.id === "A"
                ? "AI recommends Route A because traffic flow is currently stable and no incidents have been detected."
                : `AI recommends ${selectedRoute.name} because it balances travel time and congestion across live junction data.`}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl shadow-xl border border-slate-700 p-8">
        <h2 className="text-3xl font-bold text-white mb-6">Route Options</h2>
        <div className="space-y-4">
          {routeOptions.map((route) => (
            <button
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`w-full rounded-3xl border p-5 text-left transition ${
                selectedRouteId === route.id
                  ? "border-cyan-500 bg-slate-800"
                  : "border-slate-700 bg-slate-950/80 hover:border-slate-500"
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-lg font-semibold text-white">{route.name}</p>
                <span className="rounded-full bg-slate-800 px-3 py-2 text-sm text-white border border-slate-700">
                  {route.confidence}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                <div className="rounded-2xl bg-slate-950/90 p-3 border border-slate-700">
                  <p className="text-slate-400">Travel Time</p>
                  <p className="text-white font-semibold mt-1">{route.eta}</p>
                </div>
                <div className="rounded-2xl bg-slate-950/90 p-3 border border-slate-700">
                  <p className="text-slate-400">Distance</p>
                  <p className="text-white font-semibold mt-1">{route.distance}</p>
                </div>
                <div className="rounded-2xl bg-slate-950/90 p-3 border border-slate-700">
                  <p className="text-slate-400">Traffic</p>
                  <p className="text-white font-semibold mt-1">{route.traffic}</p>
                </div>
                <div className="rounded-2xl bg-slate-950/90 p-3 border border-slate-700">
                  <p className="text-slate-400">Jam Score</p>
                  <p className="text-white font-semibold mt-1">{route.jamScore}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RouteResult;
