Trafficcontext.jsx
import { createContext, useState, useEffect } from "react";

import {
  getStats,
  getJunctions,
  getIncidents,
  getNegotiations,
  saveNegotiation,
  updateJunction,
} from "../api/api";

import { connectWebSocket } from "../services/websocket";
import useSimulation from "../hooks/useSimulation";
import { simulateTraffic } from "../services/trafficSimulation";
import { runAI } from "../services/aiOrchestrator";
import { detectIncident } from "../services/incidentAgent";
import useBackendLoader from "../hooks/useBackendLoader";
import { getTomTomTraffic } from "../api/api";
export const TrafficContext = createContext(null);


export function TrafficProvider({ children }) {

  const [stats, setStats] = useState([]);

const [junctions, setJunctions] = useState([]);

const [negotiations, setNegotiations] = useState([]);

const [decisionLogs, setDecisionLogs] = useState([]);

  const [decisionHistory, setDecisionHistory] =
    useState([]);

  const [incidents, setIncidents] =
    useState([]);
  const [loading, setLoading] = useState(true);

  //--------------------------------------------------
  // Load PostgreSQL Data
  //--------------------------------------------------

  useBackendLoader(
  setStats,
  setJunctions,
  setIncidents,
  setNegotiations,
  setLoading
);
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

  useEffect(() => {

  async function testTomTom() {

    const data = await getTomTomTraffic();

    console.log(data);

  }

  testTomTom();

}, []);

  useEffect(() => {
  connectWebSocket((data) => {

    console.log("📡 Live Update:", data);

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
}, []);


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
      }}
    >
      {children}
    </TrafficContext.Provider>

  );

}