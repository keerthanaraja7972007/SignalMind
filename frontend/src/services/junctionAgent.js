export function findBestNeighbor(overloaded, junctions) {

    if (!overloaded || !overloaded.neighbors) {
        return null;
    }

    let best = null;

    overloaded.neighbors.forEach((id) => {

        const neighbor = junctions.find(j => j.id === id);

        if (!neighbor) return;

        if (!best || neighbor.load < best.load) {
            best = neighbor;
        }

    });

    return best;
}