import { createContext, useState, useEffect } from "react";

import {
  getStats,
  getJunctions,
  getIncidents,
  getNegotiations,
  saveNegotiation,
  updateJunction,
  getTomTomTraffic,
} from "../api/api";

import { connectWebSocket } from "../services/websocket";
import useSimulation from "../hooks/useSimulation";
import { simulateTraffic } from "../services/trafficSimulation";
import { runAI } from "../services/aiOrchestrator";
import { detectIncident } from "../services/incidentAgent";
import useBackendLoader from "../hooks/useBackendLoader";

export const TrafficContext = createContext(null);

export function TrafficProvider({ children }) {
  const [stats, setStats] = useState([]);
  const [junctions, setJunctions] = useState([]);
  const [negotiations, setNegotiations] = useState([]);
  const [decisionLogs, setDecisionLogs] = useState([]);
  const [decisionHistory, setDecisionHistory] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  //--------------------------------------------------
  // Load Initial PostgreSQL / Backend Data
  //--------------------------------------------------
  useBackendLoader(
    setStats,
    setJunctions,
    setIncidents,
    setNegotiations,
    setLoading
  );

  //--------------------------------------------------
  // Initialize Client-Side Simulation Hook
  //--------------------------------------------------
  useSimulation({
    loading,
    junctions,
    setJunctions,
    setStats,
    setNegotiations,
    setDecisionLogs,
    setDecisionHistory,
    setIncidents,
  });

  //--------------------------------------------------
  // Test TomTom Traffic API Call
  //--------------------------------------------------
  useEffect(() => {
    async function testTomTom() {
      const data = await getTomTomTraffic();
      console.log("TomTom Traffic Data:", data);
    }
    testTomTom();
  }, []);

  //--------------------------------------------------
  // Establish Real-Time WebSocket Connection
  //--------------------------------------------------
  useEffect(() => {
    const socket = connectWebSocket((data) => {
      console.log("📡 Live Update Received:", data);

      if (data.junctions) {
        const formatted = data.junctions.map((junction) => ({
          ...junction,
          position: [
            Number(junction.latitude),
            Number(junction.longitude),
          ],
          neighbors: junction.neighbors
            ? junction.neighbors
                .split(",")
                .map(Number)
            : [],
        }));
        setJunctions(formatted);
      }

      if (data.stats) {
        setStats(data.stats);
      }

      if (data.incidents) {
        setIncidents(data.incidents);
      }

      if (data.negotiations) {
        setNegotiations(data.negotiations);
      }
    });

    // Cleanup WebSocket on component unmount
    return () => {
      if (socket && typeof socket.close === "function") {
        socket.close();
      }
    };
  }, []);

  //--------------------------------------------------
  // Manual Backend Refresh Helper
  //--------------------------------------------------
  async function refreshBackend() {
    const junctionData = await getJunctions();
    setJunctions(junctionData);
  }

  return (
    <TrafficContext.Provider
      value={{
        stats,
        junctions,
        negotiations,
        decisionLogs,
        decisionHistory,
        incidents,
        refreshBackend,
      }}
    >
      {children}
    </TrafficContext.Provider>
  );
}