import { useEffect } from "react";

import { fetchLiveTraffic } from "../services/liveTrafficService";
import { runAI } from "../services/aiOrchestrator";
import { detectIncident } from "../services/incidentAgent";

import {
  syncJunctions,
  refreshJunctions,
  saveAINegotiation,
} from "../services/databaseSync";

export default function useSimulation({
  loading,

  junctions,
  setJunctions,

  setStats,

  setNegotiations,

  setDecisionLogs,

  setDecisionHistory,

  setIncidents,
}) {
  useEffect(() => {

    if (loading) return;

    const interval = setInterval(async () => {

      //--------------------------------------------------
      // Wait until PostgreSQL data loads
      //--------------------------------------------------

      if (!junctions || junctions.length === 0) {
        return;
      }

      //--------------------------------------------------
      // STEP 1
      // Fetch Live Traffic from TomTom
      //--------------------------------------------------

      const liveTraffic = await fetchLiveTraffic();

      //--------------------------------------------------
      // STEP 2
      // Merge Live Traffic with Junctions
      //--------------------------------------------------

      const updatedJunctions = junctions.map((junction) => {

        const live = liveTraffic.find(
          (item) => item.id === junction.id
        );

        if (!live) {
          return junction;
        }

        return {

          ...junction,

          load: live.load,

          averageSpeed: live.averageSpeed,

          greenTime: live.greenTime,

        };

      });

      //--------------------------------------------------
      // STEP 3
      // Run AI Negotiation
      //--------------------------------------------------

      const result = runAI(updatedJunctions);

      if (!result) return;

      const {
        updated,
        overloaded,
        neighbor,
        decision,
      } = result;

      //--------------------------------------------------
      // STEP 4
      // Save AI Changes to PostgreSQL
      //--------------------------------------------------

      await syncJunctions(updated);

      //--------------------------------------------------
      // STEP 5
      // Refresh Latest Database Values
      //--------------------------------------------------

      const latest = await refreshJunctions();

      setJunctions(latest);

      //--------------------------------------------------
      // STEP 6
      // Update Dashboard Statistics
      //--------------------------------------------------

      const averageLoad = Math.round(

        latest.reduce(
          (sum, j) => sum + j.load,
          0
        ) / latest.length

      );

      const averageSpeed = Math.round(

        latest.reduce(
          (sum, j) => sum + j.averageSpeed,
          0
        ) / latest.length

      );

      setStats((prev) =>
        prev.map((item) => {

          if (item.title === "Traffic Load") {

            return {

              ...item,

              value: `${averageLoad}%`,

            };

          }

          if (item.title === "Average Speed") {

            return {

              ...item,

              value: `${averageSpeed} km/h`,

            };

          }

          return item;

        })
      );

      //--------------------------------------------------
      // STEP 7
      // Create Negotiation Object
      //--------------------------------------------------

      const negotiation = {

        id: crypto.randomUUID(),

        from: overloaded?.name || "Unknown",

        to: neighbor
          ? neighbor.name
          : "None",

        request:
          `Increase Green Time by ${
            decision.approved
              ? decision.seconds
              : 0
          } sec`,

        status:
          decision.approved
            ? "Approved"
            : "Rejected",

        impact:
          decision.approved
            ? "Traffic Successfully Redistributed"
            : decision.reason,

        time:
          new Date().toLocaleTimeString(),

      };
            //--------------------------------------------------
      // STEP 8
      // Update Negotiations
      //--------------------------------------------------

      setNegotiations((prev) => [
        negotiation,
        ...prev.slice(0, 9),
      ]);

      //--------------------------------------------------
      // STEP 9
      // Save Negotiation to PostgreSQL
      //--------------------------------------------------

      await saveAINegotiation({

        fromJunction: negotiation.from,

        toJunction: negotiation.to,

        request: negotiation.request,

        status: negotiation.status,

        impact: negotiation.impact,

        time: negotiation.time,

      });

      //--------------------------------------------------
      // STEP 10
      // Decision History
      //--------------------------------------------------

      setDecisionHistory((prev) => [

        ...prev,

        {

          id: crypto.randomUUID(),

          time: negotiation.time,

          from: negotiation.from,

          to: negotiation.to,

          action: "Increase Green Time",

          seconds: decision.approved
            ? decision.seconds
            : 0,

          status: negotiation.status,

        },

      ]);

      //--------------------------------------------------
      // STEP 11
      // Decision Logs
      //--------------------------------------------------

      const now = new Date().toLocaleTimeString();

      const logs = [

        {

          id: crypto.randomUUID(),

          time: now,

          agent: "Traffic Analysis Agent",

          message: `Detected congestion at ${overloaded?.name || "Unknown"} (${overloaded?.load || 0}%)`,

        },

        {

          id: crypto.randomUUID(),

          time: now,

          agent: "Junction Agent",

          message: neighbor
            ? `Selected ${neighbor.name}`
            : "No suitable neighbor found",

        },

        {

          id: crypto.randomUUID(),

          time: now,

          agent: "Negotiation Agent",

          message: decision.approved
            ? `Approved +${decision.seconds} sec green time`
            : "Negotiation Rejected",

        },

        {

          id: crypto.randomUUID(),

          time: now,

          agent: "Behavior Agent",

          message: decision.approved
            ? "Traffic redistributed successfully"
            : "Traffic redistribution skipped",

        },

      ];

      setDecisionLogs((prev) => [

        ...logs,

        ...prev,

      ].slice(0, 12));

      //--------------------------------------------------
      // STEP 12
      // Incident Detection
      //--------------------------------------------------

      const incident = detectIncident(latest);

      if (incident) {

        setIncidents((prev) => [

          incident,

          ...prev,

        ].slice(0, 5));

      }

    }, 5000);

    return () => clearInterval(interval);

  }, [
    loading,
    junctions,
    setJunctions,
    setStats,
    setNegotiations,
    setDecisionLogs,
    setDecisionHistory,
    setIncidents,
  ]);

}