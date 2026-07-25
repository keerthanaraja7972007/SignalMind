function EmergencyVehicles() {
  const vehicles = [
    {
      id: 1,
      name: "🚑 Ambulance 12",
      location: "Kathipara Junction",
      eta: "3 min",
      status: "Priority Corridor Active",
    },
    {
      id: 2,
      name: "🚒 Fire Truck 4",
      location: "Guindy Junction",
      eta: "5 min",
      status: "Traffic Cleared",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-5">
        🚑 Emergency Vehicles
      </h2>

      <div className="space-y-4">

        {vehicles.map((vehicle) => (

          <div
            key={vehicle.id}
            className="border rounded-xl p-4 hover:bg-slate-50 transition"
          >

            <h3 className="font-bold text-lg">
              {vehicle.name}
            </h3>

            <p>📍 {vehicle.location}</p>

            <p>⏱ ETA : {vehicle.eta}</p>

            <p className="text-green-600 font-semibold">
              {vehicle.status}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default EmergencyVehicles;