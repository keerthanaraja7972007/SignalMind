import { getTomTomTraffic } from "../api/api";

export async function fetchLiveTraffic() {
  const tomtom = await getTomTomTraffic();

  return tomtom.map((junction) => {
    // Convert speed into congestion %
    const load = Math.round(
      (1 - junction.currentSpeed / junction.freeFlowSpeed) * 100
    );

    let greenTime = 30;

    if (load >= 80) {
      greenTime = 45;
    } else if (load >= 60) {
      greenTime = 40;
    } else if (load >= 40) {
      greenTime = 35;
    }

    return {
      id: junction.id,
      load,
      averageSpeed: junction.currentSpeed,
      greenTime,
    };
  });
}