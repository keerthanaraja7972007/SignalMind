import { useContext } from "react";
import { TrafficContext } from "../../context/TrafficContext";

function JunctionTable() {
  const { junctions, incidents } = useContext(TrafficContext);

  const getLoadColor = (load) => {
    if (load >= 80)
      return "bg-red-500/20 text-red-300 border border-red-500/30";

    if (load >= 50)
      return "bg-orange-500/20 text-orange-300 border border-orange-500/30";

    return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
  };

  const typeLabel = {
    "Kathipara Junction": "Grade-Separated Interchange",
    "Guindy Junction": "Signalized Intersection",
    "T Nagar Intersection": "Signalized Intersection",
    "Anna Nagar Roundabout": "Roundabout",
    "Koyambedu Junction": "Signalized Intersection",
    "Velachery Junction": "Signalized Intersection",
  };

  const getJunctionTypeLabel = (junction) =>
    typeLabel[junction.name] ||
    (junction.type === "ROUNDABOUT"
      ? "Roundabout"
      : junction.type === "SIGNAL"
      ? "Signalized Intersection"
      : "Intersection");

  return (
    <div className="rounded-3xl bg-slate-800 border border-slate-700 shadow-2xl p-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold text-slate-100">
          🚦 Junction Registry
        </h2>

        <span className="text-slate-400">
          {junctions.length} Junctions
        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-slate-200">

          <thead>

            <tr className="border-b border-slate-700 text-slate-300">

              <th className="py-4">ID</th>
              <th>Name</th>
              <th>Junction Type</th>
              <th>Load</th>
              <th>Speed</th>
              <th>Incident</th>

            </tr>

          </thead>

          <tbody>

            {junctions.map((junction) => (

              <tr
                key={junction.id}
                className="border-b border-slate-700 hover:bg-slate-700/40 transition duration-300"
              >

                <td className="py-5 font-medium">
                  {junction.id}
                </td>

                <td className="font-semibold text-slate-100">
                  📍 {junction.name}
                </td>

                <td>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-sm">
                    {getJunctionTypeLabel(junction)}
                  </span>
                </td>
 
                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getLoadColor(
                      junction.load
                    )}`}
                  >
                    {junction.load}%
                  </span>

                </td>

                <td className="text-slate-300">
                  {junction.averageSpeed} km/h
                </td>

                <td className="text-left">
                  {(() => {
                    const incident = incidents?.find(
                      (item) =>
                        item.location === junction.name ||
                        item.junctionName === junction.name ||
                        item.junction === junction.name
                    );

                    if (incident) {
                      return (
                        <div className="space-y-1">
                          <span className="text-emerald-300">
                            ✅ Incident occurred
                          </span>
                          <span className="text-slate-400 text-xs">
                            {incident.description || incident.type || incident.location}
                            {incident.status ? ` — ${incident.status}` : ""}
                          </span>
                        </div>
                      );
                    }

                    return "None";
                  })()}
                </td>


              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default JunctionTable;