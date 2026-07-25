const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://signalmind.onrender.com";
// -------------------------
// GET Dashboard Stats
// -------------------------
export async function getStats() {
  try {
    const response = await fetch(`${BASE_URL}/stats`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching stats:", error);
    return [];
  }
}

// -------------------------
// GET Junctions
// -------------------------
export async function getJunctions() {
  try {
    const response = await fetch(`${BASE_URL}/junctions`);

    const data = await response.json();

    return data.map((junction) => ({
      ...junction,

      // Leaflet coordinates
      position: [
        Number(junction.latitude),
        Number(junction.longitude),
      ],

      // Convert "2,5" -> [2,5]
      neighbors: junction.neighbors
        ? junction.neighbors
            .split(",")
            .map((id) => Number(id.trim()))
        : [],
    }));
  } catch (error) {
    console.error("Error fetching junctions:", error);
    return [];
  }
}

// -------------------------
// GET Incidents
// -------------------------
export async function getIncidents() {
  try {
    const response = await fetch(`${BASE_URL}/incidents`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return [];
  }
}

// -------------------------
// GET Negotiations
// -------------------------
export async function getNegotiations() {
  try {
    const response = await fetch(`${BASE_URL}/negotiations`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching negotiations:", error);
    return [];
  }
}

// -------------------------
// POST Negotiation
// -------------------------
export async function saveNegotiation(data) {
  try {
    await fetch(`${BASE_URL}/negotiations`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error saving negotiation:", error);
  }
}

// -------------------------
// UPDATE Junction
// -------------------------
export async function updateJunction(junction) {
  try {
    await fetch(
  `${BASE_URL}/junctions/${junction.id}` +
    `?load=${junction.load}` +
    `&averageSpeed=${junction.averageSpeed}` +
    `&greenTime=${junction.greenTime}`,
  {
    method: "PUT",
  }
);
  } catch (error) {
    console.error("Error updating junction:", error);
  }
}

// -------------------------
// GET Live TomTom Traffic
// -------------------------
export async function getTomTomTraffic() {

  try {

    const response = await fetch(
      `${BASE_URL}/tomtom/all`
    );

    return await response.json();

  }

  catch (error) {

    console.error(error);

    return [];

  }

}