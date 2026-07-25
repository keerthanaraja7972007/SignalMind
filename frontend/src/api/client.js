// src/api/client.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://signalmind.onrender.com';

// Fetch all negotiations
export async function getNegotiations() {
  const response = await fetch(`${BASE_URL}/negotiations/`);
  if (!response.ok) throw new Error('Failed to fetch negotiations');
  return response.json();
}

// Create a new negotiation (Matches your SQLAlchemy model exactly)
export async function createNegotiation(data) {
  const response = await fetch(`${BASE_URL}/negotiations/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fromJunction: data.fromJunction,
      toJunction: data.toJunction,
      reason: data.reason || "Traffic Congestion",
      currentLoad: data.currentLoad || 80,
      neighborLoad: data.neighborLoad || 60,
      request: data.request,
      status: data.status || "Pending",
      expectedImprovement: data.impact || data.expectedImprovement || "15% Reduction", // Maps impact to expectedImprovement
      greenTimeChange: data.greenTimeChange || "+10s",
      time: data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Server error: ${response.status}`);
  }

  return response.json();
}