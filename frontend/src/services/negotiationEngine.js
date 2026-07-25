export function negotiate(from, to) {

  if (!to) {
    return {
      approved: false,
      reason: "No Neighbor",
    };
  }

  if (to.load < 70) {
    return {
      approved: true,
      seconds: 8,
    };
  }

  return {
    approved: false,
    reason: "Neighbor Busy",
  };
}