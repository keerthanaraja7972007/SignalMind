import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { TrafficContext } from "../../context/TrafficContext";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function RouteMap({ routeOptions, selectedRouteId, junctions }) {
  const { junctions: allJunctions } = useContext(TrafficContext);

  // Color mapping for routes: Darker Green for Route A, Darker Yellow for Route B, Darker Red for Route C
  const routeColors = {
    A: "#15803d", // Darker Green
    B: "#a16207", // Darker Yellow
    C: "#991b1b", // Darker Red
  };

  // Get junction position by name
  const getJunctionPosition = (junctionName) => {
    const junction = allJunctions.find((j) => j.name === junctionName);
    return junction ? junction.position : [13.0827, 80.2707];
  };

  // Get source and destination positions
  let sourcePosition = [13.0827, 80.2707];
  let destPosition = [13.0827, 80.2707];
  let sourceName = "";
  let destName = "";

  if (routeOptions.length > 0) {
    const firstRoute = routeOptions[0];
    sourceName = firstRoute.path[0];
    destName = firstRoute.path[firstRoute.path.length - 1];
    sourcePosition = getJunctionPosition(sourceName);
    destPosition = getJunctionPosition(destName);
  }

  return (
    <div className="bg-slate-900 rounded-3xl shadow-xl border border-slate-700 p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Route Visualization</h2>

      {routeOptions.length === 0 ? (
        <div className="h-96 flex items-center justify-center bg-slate-950 rounded-2xl border border-slate-700">
          <p className="text-slate-400">Generate a route to see the map visualization</p>
        </div>
      ) : (
        <>
          <MapContainer
            center={[13.0827, 80.2707]}
            zoom={13}
            style={{
              height: "500px",
              width: "100%",
              borderRadius: "15px",
              marginBottom: "24px",
            }}
          >
            <TileLayer
              attribution="© OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Draw all route options with their respective colors */}
            {routeOptions.map((route) => (
              <Polyline
                key={route.id}
                positions={route.routePoints}
                pathOptions={{
                  color: routeColors[route.id],
                  weight: route.id === selectedRouteId ? 6 : 4,
                  opacity: route.id === selectedRouteId ? 0.9 : 0.6,
                  dashArray: route.id === selectedRouteId ? "0" : "5, 5",
                }}
              />
            ))}

            {/* Source marker */}
            <Marker position={sourcePosition}>
              <Popup>
                <div>
                  <strong>Source</strong>
                  <p>{sourceName}</p>
                </div>
              </Popup>
            </Marker>

            {/* Destination marker */}
            <Marker position={destPosition}>
              <Popup>
                <div>
                  <strong>Destination</strong>
                  <p>{destName}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>

          {/* Route legend */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Route Options</h3>
            <div className="space-y-3">
              {routeOptions.map((route) => (
                <div
                  key={route.id}
                  className={`flex items-center gap-4 p-3 rounded-xl transition ${
                    route.id === selectedRouteId
                      ? "bg-slate-800 border border-slate-600"
                      : "bg-slate-950/50 border border-slate-700"
                  }`}
                >
                  <div
                    className="w-8 h-2 rounded-full"
                    style={{
                      backgroundColor: routeColors[route.id],
                      boxShadow:
                        route.id === selectedRouteId
                          ? `0 0 10px ${routeColors[route.id]}`
                          : "none",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{route.name}</p>
                    <p className="text-xs text-slate-400 truncate">{route.eta} • {route.distance}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-cyan-400">{route.confidence}</p>
                    <p className="text-xs text-slate-400">{route.traffic}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RouteMap;
