import { useContext, useState, useMemo, useEffect, useCallback } from "react";
import { TrafficContext } from "../context/TrafficContext";

import RoutePlanner from "../components/commuter/RoutePlanner";
import RouteResult from "../components/commuter/RouteResult";
import RouteMap from "../components/commuter/RouteMap";

function Commuter() {
  const { junctions } = useContext(TrafficContext);

  const [source, setSource] = useState("Kathipara Junction");
  const [destination, setDestination] = useState("Anna Nagar Roundabout");
  const [routeOptions, setRouteOptions] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState("A");
  const [ignoredBetterRouteId, setIgnoredBetterRouteId] = useState(null);
  const [tick, setTick] = useState(0);

  const junctionNames = [
    "Kathipara Junction",
    "Guindy Junction",
    "T Nagar Intersection",
    "Anna Nagar Roundabout",
    "Koyambedu Junction",
    "Velachery Junction",
  ];

  const routeTemplates = [
    {
      id: "A",
      name: "Route A",
      path: [
        "Kathipara Junction",
        "Guindy Junction",
        "T Nagar Intersection",
        "Anna Nagar Roundabout",
      ],
      distance: 12,
      baseTime: 18,
      signals: 3,
    },
    {
      id: "B",
      name: "Route B",
      path: [
        "Kathipara Junction",
        "Velachery Junction",
        "Koyambedu Junction",
        "Anna Nagar Roundabout",
      ],
      distance: 14,
      baseTime: 23,
      signals: 3,
    },
    {
      id: "C",
      name: "Route C",
      path: [
        "Kathipara Junction",
        "Guindy Junction",
        "Koyambedu Junction",
        "Anna Nagar Roundabout",
      ],
      distance: 13,
      baseTime: 31,
      signals: 3,
    },
  ];

  const getTrafficLevel = (jamScore) => {
    if (jamScore <= 30) return "🟢 Low";
    if (jamScore <= 60) return "🟡 Moderate";
    if (jamScore <= 80) return "🟠 Heavy";
    return "🔴 Severe";
  };

  const getRouteColor = (jamScore) => {
    if (jamScore <= 30) return "#22c55e";
    if (jamScore <= 60) return "#eab308";
    if (jamScore <= 80) return "#f97316";
    return "#ef4444";
  };

  const calculateRouteMetrics = useCallback(
    (routeTemplate) => {
      const routeJunctions = routeTemplate.path.map((name) =>
        junctions.find((j) => j.name === name) || {
          load: 50,
          averageSpeed: 30,
          greenTime: 30,
          incident: null,
          type: "SIGNAL",
          position: [13.08, 80.22],
          name,
        }
      );

      const averageLoad = Math.round(
        routeJunctions.reduce((sum, junction) => sum + (junction.load || 0), 0) /
          routeJunctions.length
      );

      const incidentCount = routeJunctions.filter((junction) => junction.incident).length;
      const averageSpeed = Math.max(
        18,
        Math.round(
          routeJunctions.reduce(
            (sum, junction) => sum + (junction.averageSpeed || 0),
            0
          ) / routeJunctions.length
        )
      );

      const normalizedJam = Math.min(
        100,
        Math.max(
          10,
          Math.round(averageLoad + incidentCount * 12 - averageSpeed * 0.1)
        )
      );

      const travelTime = Math.max(
        routeTemplate.baseTime,
        routeTemplate.baseTime + Math.round((normalizedJam - 20) * 0.3) + incidentCount * 3
      );

      const confidence = Math.max(
        70,
        Math.min(
          99,
          Math.round(100 - normalizedJam * 0.25 - incidentCount * 3 + (averageSpeed > 32 ? 4 : 0))
        )
      );

      const score = Math.round(
        normalizedJam * 0.45 +
          travelTime * 0.8 +
          incidentCount * 8 +
          routeTemplate.signals * 2
      );

      return {
        ...routeTemplate,
        distance: `${routeTemplate.distance} km`,
        eta: `${travelTime} min`,
        averageSpeed: `${averageSpeed} km/h`,
        jamScore: `${normalizedJam}%`,
        traffic: getTrafficLevel(normalizedJam),
        confidence: `${confidence}%`,
        incidentCount,
        signals: routeTemplate.signals,
        score,
        routeColor: getRouteColor(normalizedJam),
        routePoints: routeJunctions.map((junction) => junction.position),
        details: routeJunctions,
      };
    },
    [junctions]
  );

  const computeRoutes = () => {
    const validRoutes = routeTemplates.filter(
      (route) =>
        route.path[0] === source &&
        route.path[route.path.length - 1] === destination
    );

    return (validRoutes.length ? validRoutes : routeTemplates).map(calculateRouteMetrics);
  };

  const refreshedRoutes = useMemo(() => { tick; return routeOptions.map(calculateRouteMetrics); }, [routeOptions, calculateRouteMetrics, tick]);

  const selectedRoute = useMemo(
    () => refreshedRoutes.find((route) => route.id === selectedRouteId) || refreshedRoutes[0],
    [refreshedRoutes, selectedRouteId]
  );

  const bestRoute = useMemo(() => {
    if (!refreshedRoutes.length) return null;
    return refreshedRoutes.reduce((best, current) => (current.score < best.score ? current : best), refreshedRoutes[0]);
  }, [refreshedRoutes]);

  const routeAlert = useMemo(() => {
    if (!bestRoute || bestRoute.id === selectedRouteId || bestRoute.id === ignoredBetterRouteId) {
      return null;
    }

    return {
      message: `AI detected increasing congestion near ${bestRoute.path[1]}. Switching to ${bestRoute.name}. Estimated time saved 5 minutes.`,
      route: bestRoute,
    };
  }, [bestRoute, selectedRouteId, ignoredBetterRouteId]);

  const handleFindRoute = () => {
    const generated = computeRoutes();
    setRouteOptions(generated);
    setSelectedRouteId(generated[0]?.id || "A");
    setIgnoredBetterRouteId(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((value) => value + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleAcceptBetterRoute = () => {
    if (bestRoute) {
      setSelectedRouteId(bestRoute.id);
      setIgnoredBetterRouteId(null);
    }
  };

  const handleIgnoreBetterRoute = () => {
    if (bestRoute) {
      setIgnoredBetterRouteId(bestRoute.id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">🚗 Smart Commuter</h1>
          <p className="text-slate-300 mt-4 text-lg">
            AI-powered smart navigation with real-time traffic analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <RoutePlanner
            source={source}
            setSource={setSource}
            destination={destination}
            setDestination={setDestination}
            handleFindRoute={handleFindRoute}
            junctionNames={junctionNames}
          />

          <RouteResult
            routeOptions={refreshedRoutes}
            selectedRoute={selectedRoute}
            selectedRouteId={selectedRouteId}
            setSelectedRouteId={setSelectedRouteId}
            routeAlert={routeAlert}
            handleAcceptBetterRoute={handleAcceptBetterRoute}
            handleIgnoreBetterRoute={handleIgnoreBetterRoute}
          />
        </div>

        {/* Route Visualization Map */}
        <RouteMap
          routeOptions={refreshedRoutes}
          selectedRouteId={selectedRouteId}
          junctions={junctions}
        />
      </div>
    </div>
  );
}

export default Commuter;

