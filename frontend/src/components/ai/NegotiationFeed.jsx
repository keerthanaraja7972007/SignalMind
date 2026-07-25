import NegotiationCard from "./NegotiationCard";
import { useContext } from "react";
import { TrafficContext } from "../../context/TrafficContext";

function NegotiationFeed() {
  const { negotiations } = useContext(TrafficContext);

  return (
    <div className="space-y-5 rounded-3xl bg-slate-800 border border-slate-700 p-6 shadow-xl">

      {negotiations.map((item) => (

        <NegotiationCard
          key={item.id}
          negotiation={item}
        />

      ))}

    </div>
  );
}

export default NegotiationFeed;