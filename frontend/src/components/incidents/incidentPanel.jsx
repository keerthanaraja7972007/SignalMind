import { AlertTriangle } from "lucide-react";

function IncidentPanel({ incidents }) {
  return (
    <div className="space-y-4">
      {incidents.length === 0 ? (
        <p className="text-gray-500">
          No active incidents.
        </p>
      ) : (
        incidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-red-50 border-l-4 border-red-500 p-4 rounded"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={20} />
              <h3 className="font-bold">
                {incident.type}
              </h3>
            </div>

            <p className="mt-2">
              {incident.junctionName}
            </p>

            <p className="text-sm text-gray-600">
              {incident.time}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default IncidentPanel;