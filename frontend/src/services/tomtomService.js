import { getTomTomTraffic } from "../api/api";

export async function fetchLiveTraffic() {
  const data = await getTomTomTraffic();

  if (!data) return [];

  return data.map((junction) => ({
    id: junction.id,

    currentSpeed: junction.currentSpeed,

    freeFlowSpeed: junction.freeFlowSpeed,

    confidence: junction.confidence,

    roadClosure: junction.roadClosure,
  }));
}