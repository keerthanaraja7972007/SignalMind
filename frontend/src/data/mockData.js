// =========================
// Dashboard Stats
// =========================

export const stats = [
  {
    id: 1,
    title: "Traffic Load",
    value: "72%",
    color: "text-red-500",
  },
  {
    id: 2,
    title: "Active Incidents",
    value: "12",
    color: "text-orange-500",
  },
  {
    id: 3,
    title: "AI Negotiations",
    value: "36",
    color: "text-blue-500",
  },
  {
    id: 4,
    title: "Average Speed",
    value: "38 km/h",
    color: "text-green-500",
  },
];

// =========================
// Junction Registry
// =========================

export const junctions = [
  {
    id: 1,
    name: "Kathipara Junction",
    type: "SIGNAL",
    position: [13.0827, 80.2707],
    load: 92,
    greenTime: 40,
    averageSpeed: 22,
    neighbors: [2, 3],
    camera: true,
    sensor: true,
    incident: null,
    status: "ACTIVE",
  },

  {
    id: 2,
    name: "Guindy Junction",
    type: "SIGNAL",
    position: [13.0109, 80.2206],
    load: 20,
    greenTime: 30,
    averageSpeed: 60,
    neighbors: [1, 3],
    camera: true,
    sensor: true,
    incident: "Accident",
    status: "MAINTENANCE",
  },

  {
    id: 3,
    name: "Anna Nagar Roundabout",
    type: "ROUNDABOUT",
    position: [13.0850, 80.2101],
    load: 67,
    greenTime: 0,
    averageSpeed: 35,
    neighbors: [1, 2, 4],
    camera: false,
    sensor: true,
    incident: null,
    status: "ACTIVE",
  },

  {
    id: 4,
    name: "T Nagar Intersection",
    type: "UNSIGNALIZED",
    position: [13.0418, 80.2337],
    load: 54,
    greenTime: 0,
    averageSpeed: 39,
    neighbors: [2, 3],
    camera: true,
    sensor: false,
    incident: null,
    status: "ACTIVE",
  },
];

// =========================
// AI Negotiation Feed
// =========================

export const negotiations = [
  {
    id: 1,
    from: "Kathipara Junction",
    to: "Guindy Junction",
    request: "Increase green time by 8 sec",
    status: "Approved",
    impact: "Traffic reduced by 24%",
    time: "15:42",
  },
];

// =========================
// AI Decision Timeline
// =========================

export const decisionLogs = [
  {
    id: 1,
    time: "21:35:02",
    agent: "Traffic Analysis Agent",
    message: "Detected congestion at Kathipara Junction (92%)",
  },
  {
    id: 2,
    time: "21:35:03",
    agent: "Junction Agent",
    message: "Selected Guindy Junction (42% load)",
  },
  {
    id: 3,
    time: "21:35:04",
    agent: "Negotiation Agent",
    message: "Approved +8 sec Green Time",
  },
  {
    id: 4,
    time: "21:35:05",
    agent: "Behavior Agent",
    message: "Traffic redistributed successfully",
  },
];

// =========================
// Incidents
// =========================

export const incidents = [
  {
    id: 1,
    type: "Accident",
    location: "Kathipara Junction",
    severity: "High",
    status: "Active",
    time: "21:30",
  },
];

// =========================
// AI Statistics
// =========================

export const aiStats = [
  {
    id: 1,
    title: "Negotiations Today",
    value: 156,
    color: "text-blue-600",
    icon: "🤝",
  },
  {
    id: 2,
    title: "Successful Negotiations",
    value: 143,
    color: "text-green-600",
    icon: "✅",
  },
  {
    id: 3,
    title: "Rejected Negotiations",
    value: 13,
    color: "text-red-600",
    icon: "❌",
  },
  {
    id: 4,
    title: "Incidents Resolved",
    value: 27,
    color: "text-purple-600",
    icon: "🚨",
  },
  {
    id: 5,
    title: "Average Response Time",
    value: "1.8 s",
    color: "text-orange-600",
    icon: "⚡",
  },
  {
    id: 6,
    title: "AI Health",
    value: "99.4%",
    color: "text-emerald-600",
    icon: "🧠",
  },
];