import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// -------------------- Marker Icons --------------------

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const orangeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// -------------------- Component --------------------

function JunctionMarker({ junction, incidents }) {
  let icon = greenIcon;

  if (junction.load >= 80) {
    icon = redIcon;
  } else if (junction.load >= 50) {
    icon = orangeIcon;
  }

  const typeLabel = {
    "Kathipara Junction": "Grade-Separated Interchange",
    "Guindy Junction": "Signalized Intersection",
    "T Nagar Intersection": "Signalized Intersection",
    "Anna Nagar Roundabout": "Roundabout",
    "Koyambedu Junction": "Signalized Intersection",
    "Velachery Junction": "Signalized Intersection",
  };

  const incident = incidents?.find(
    (item) =>
      item.location === junction.name ||
      item.junctionName === junction.name ||
      item.junction === junction.name
  );

  return (
    <Marker position={junction.position} icon={icon}>
      <Popup>
        <div className="space-y-2 min-w-[220px]">
          <h3 className="text-lg font-bold">📍 {junction.name}</h3>

          <p>
            <strong>Type:</strong> {typeLabel[junction.name] || junction.type}
          </p>

          <p>
            <strong>Traffic Load:</strong> {junction.load}%
          </p>

          <p>
            <strong>Average Speed:</strong> {junction.averageSpeed} km/h
          </p>

          {junction.type === "SIGNAL" && (
            <p>
              <strong>Green Time:</strong> {junction.greenTime} sec
            </p>
          )}

          <p>
            <strong>Incident:</strong>{" "}
            {incident ? (
              <span>
                ✅ {incident.description || incident.type || incident.location}
              </span>
            ) : (
              "None"
            )}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}

export default JunctionMarker;