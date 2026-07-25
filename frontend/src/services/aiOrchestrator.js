import { findCongestedJunction } from "./trafficAnalysis";
import { findBestNeighbor } from "./junctionAgent";
import { negotiate } from "./negotiationEngine";
import { redistributeTraffic } from "./redistributeTraffic";

export function runAI(junctions) {
  // Step 1: Detect overloaded junction
  const overloaded = findCongestedJunction(junctions);

  // Step 2: Find best neighboring junction
  const neighbor = findBestNeighbor(overloaded, junctions);

  // Step 3: AI negotiation
  const decision = negotiate(overloaded, neighbor);

  let updated = [...junctions];

  // Step 4: Redistribute traffic if approved
  if (decision.approved && neighbor) {
    const result = redistributeTraffic(overloaded, neighbor);

    updated = junctions.map((junction) => {
      if (junction.id === result.from.id) return result.from;
      if (junction.id === result.to.id) return result.to;
      return junction;
    });
  }

  return {
    updated,
    overloaded,
    neighbor,
    decision,
  };
}