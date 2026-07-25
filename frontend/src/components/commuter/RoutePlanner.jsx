import { MapPin, Navigation } from "lucide-react";

function RoutePlanner({
  source,
  setSource,
  destination,
  setDestination,
  handleFindRoute,
  junctionNames,
}) {
  return (
    <div className="bg-slate-900 rounded-3xl shadow-xl p-8 border border-slate-700">
      <h2 className="text-2xl font-bold mb-8">🚗 AI Route Recommendation</h2>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-slate-300">Source</label>
          <div className="flex items-center bg-slate-800 rounded-2xl px-4 py-3">
            <MapPin className="text-cyan-400 mr-3" />
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full bg-transparent outline-none text-white"
            >
              {junctionNames.map((name) => (
                <option key={name} value={name} className="bg-slate-950 text-white">
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-slate-300">Destination</label>
          <div className="flex items-center bg-slate-800 rounded-2xl px-4 py-3">
            <Navigation className="text-emerald-400 mr-3" />
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent outline-none text-white"
            >
              {junctionNames.map((name) => (
                <option key={name} value={name} className="bg-slate-950 text-white">
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleFindRoute}
          className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition text-lg font-semibold"
        >
          Generate Smart Route
        </button>
      </div>
    </div>
  );
}

export default RoutePlanner;
