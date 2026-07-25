export function findCongestedJunction(junctions) {
  return junctions.reduce((highest, current) => {
    return current.load > highest.load ? current : highest;
  });
}