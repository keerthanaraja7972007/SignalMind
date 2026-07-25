import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { TrafficContext } from "../../context/TrafficContext";

import JunctionMarker from "./JunctionMarker";
import ConnectionLine from "./ConnectionLine";

function LiveMap() {
  const { junctions, incidents } = useContext(TrafficContext);
  return (
    <MapContainer
      center={[13.0827, 80.2707]}
      zoom={13}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "15px",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Draw Road Connections */}
      {junctions.map((junction) =>
        junction.neighbors.map((neighborId) => {
          // Avoid drawing duplicate lines
          if (junction.id < neighborId) {
            const neighbor = junctions.find((j) => j.id === neighborId);

            return (
              <ConnectionLine
                key={`${junction.id}-${neighbor.id}`}
                from={junction.position}
                to={neighbor.position}
              />
            );
          }

          return null;
        })
      )}

      {/* Draw Junctions */}
      {junctions.map((junction) => (
        <JunctionMarker
          key={junction.id}
          junction={junction}
          incidents={incidents}
        />
      ))}
    </MapContainer>
  );
}

export default LiveMap;