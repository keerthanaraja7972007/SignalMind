import { useEffect } from "react";

import {
  getStats,
  getJunctions,
  getIncidents,
} from "../api/api";

export default function useBackendLoader(
  setStats,
  setJunctions,
  setIncidents,
  setNegotiations,
  setLoading
) {
  useEffect(() => {
    async function load() {
      try {
        const [
          stats,
          junctions,
          incidents,
        ] = await Promise.all([
          getStats(),
          getJunctions(),
          getIncidents(),
        ]);

        setStats(stats);
        setJunctions(junctions);
        setIncidents(incidents);
        // Start with empty negotiations - only show new ones from this session
        setNegotiations([]);

        console.log("✅ Backend Loaded");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);
}