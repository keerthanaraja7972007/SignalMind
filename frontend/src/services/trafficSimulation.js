export function simulateTraffic(junctions) {
  return junctions.map((junction) => {

    // Random traffic change
    const randomChange = Math.floor(Math.random() * 21) - 10;

    let newLoad = junction.load + randomChange;

    // Keep traffic between 20 and 100
    newLoad = Math.max(20, Math.min(100, newLoad));

    // Calculate green signal time
    let greenTime = 30;

    if (newLoad >= 80) {
      greenTime = 40;
    }
    else if (newLoad >= 50) {
      greenTime = 35;
    }

    return {
      ...junction,
      load: newLoad,
      greenTime,
      averageSpeed: Math.max(
  15,
  60 - Math.floor(newLoad / 2)
),
    };
  });
}