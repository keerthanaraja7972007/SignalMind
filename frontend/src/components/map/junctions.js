const junctions = [
  {
    id: 1,
    name: "Junction A",
    position: [13.0827, 80.2707],
    load: 92,
    greenTime: 30,
    neighbors: [2],
  },
  {
    id: 2,
    name: "Junction B",
    position: [13.0875, 80.2780],
    load: 42,
    greenTime: 38,
    neighbors: [1, 3],
  },
  {
    id: 3,
    name: "Junction C",
    position: [13.0755, 80.2635],
    load: 67,
    greenTime: 30,
    neighbors: [2],
  },
];

export default junctions;