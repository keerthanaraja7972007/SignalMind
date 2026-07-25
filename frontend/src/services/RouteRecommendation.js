export function recommendRoute(source, destination, junctions) {

    if (!source || !destination) {

        return {
            route: "-",
            eta: "-",
            distance: "-",
            traffic: "-",
            alternative: "-",
            reason: "Please enter both source and destination.",
            score: "-"
        };

    }

    // Ignore unavailable junctions
    const active = junctions.filter(j =>
        j.status === "ACTIVE" &&
        j.incident === null
    );

    // Build lookup table
    const graph = {};

    active.forEach(junction => {

        graph[junction.id] = junction;

    });

    // Score every junction
    const scored = active.map(junction => {

        let score = 0;

        score += (100 - junction.load) * 0.4;

        score += junction.averageSpeed * 0.3;

        score += junction.neighbors.length * 10 * 0.2;

        if (junction.type === "SIGNAL")

            score += 10;

        else if (junction.type === "ROUNDABOUT")

            score += 6;

        else

            score += 4;

        return {

            ...junction,

            score

        };

    });

    scored.sort((a,b)=>b.score-a.score);

    const best=scored[0];

    // AI Route

    const route=[];

    route.push(best.name);

    best.neighbors.forEach(id=>{

        const next=graph[id];

        if(next){

            route.push(next.name);

        }

    });

    return{

        route:

        `${source} → ${route.join(" → ")} → ${destination}`,

        eta:`${10+Math.floor(best.load/15)} min`,

        distance:`${route.length*3} km`,

        traffic:

        best.load<40

        ?"Low"

        :best.load<70

        ?"Moderate"

        :"High",

        alternative:

        scored[1]

        ?scored[1].name

        :"No Alternative",

        reason:

        `${best.name} selected because it has the highest AI score and provides the best neighboring connectivity.`,

        score:best.score.toFixed(1)

    };

}