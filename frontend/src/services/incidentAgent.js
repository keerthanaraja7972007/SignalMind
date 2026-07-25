const incidentTypes = [
  "Accident",
  "Vehicle Breakdown",
  "Road Construction",
  "Heavy Rain",
  "Festival Traffic",
  "School Zone Congestion",
];

export function detectIncident(junctions) {
  // 35% chance of an incident
  if (Math.random() > 0.35) return null;

  const junction =
    junctions[Math.floor(Math.random() * junctions.length)];

  const type =
    incidentTypes[Math.floor(Math.random() * incidentTypes.length)];

  return {
    id: Date.now(),
    junctionId: junction.id,
    junctionName: junction.name,
    type,
    severity: Math.floor(Math.random() * 3) + 1,
    time: new Date().toLocaleTimeString(),
  };
}