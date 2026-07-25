export function redistributeTraffic(from, to) {

  const moved = 15;

  return {

    from: {

   ...from,

   load: Math.max(20, from.load - 15),

   greenTime: from.greenTime - 5,

   averageSpeed: from.averageSpeed + 6,

},

    to: {

   ...to,

   load: Math.min(100, to.load + 15),

   greenTime: to.greenTime + 8,

   averageSpeed: Math.max(15, to.averageSpeed - 5),

},

  };

}