// Dynamic Base URL: Environment variable -> Render Production -> Local Fallback
const RAW_URL = import.meta.env.VITE_API_BASE_URL || "https://signalmind.onrender.com";

// Cleans up any potential markdown formatting issues
const getCleanUrl = (url) => {
  let cleaned = String(url).trim();
  const match = cleaned.match(/\((https?:\/\/[^\s)]+)\)/);
  if (match) cleaned = match[1];
  return cleaned.replace(/[\[\]]/g, "").replace(/\/$/, "");
};

const BASE_URL = getCleanUrl(RAW_URL);

// -------------------------
// GET Dashboard Stats
// -------------------------
export async function getStats() {
  try {
    const response = await fetch(`${BASE_URL}/stats`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

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
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
    const response = await fetch(`${BASE_URL}/tomtom/all`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching TomTom traffic:", error);
    return [];
  }
}