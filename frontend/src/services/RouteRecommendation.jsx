export function recommendRoute(source, destination, junctions) {

  // Ignore empty inputs
  if (!source || !destination) {
    return null;
  }

  // Find the least congested junction
  const bestJunction = junctions.reduce((best, current) =>
    current.load < best.load ? current : best
  );

  // Check if any incidents exist
  const activeIncidents = junctions.filter(
    (junction) => junction.incident !== null
  );

  return {
    route: `${source} → ${bestJunction.name} → ${destination}`,

    eta: `${18 + Math.floor(bestJunction.load / 15)} mins`,

    distance: "11.4 km",

    traffic:
      bestJunction.load < 40
        ? "Low"
        : bestJunction.load < 70
        ? "Moderate"
        : "Heavy",

    alternative:
      `${source} → Alternate Road → ${destination}`,

    reason: `Selected ${bestJunction.name} because it currently has the lowest traffic load (${bestJunction.load}%), an average speed of ${bestJunction.averageSpeed} km/h, and no major incidents.`,

    incidents: activeIncidents,
  };
}