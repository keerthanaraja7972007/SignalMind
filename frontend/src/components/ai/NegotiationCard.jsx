import { ArrowRight } from "lucide-react";

function NegotiationCard({ negotiation }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">

      <div className="flex justify-between items-center">

        <h3 className="font-bold text-lg">
          {negotiation.from}
        </h3>

        <ArrowRight className="text-blue-600" />

        <h3 className="font-bold text-lg">
          {negotiation.to}
        </h3>

      </div>

      <div className="mt-4">

        <p>
          <strong>Request:</strong>
          {" "}
          {negotiation.request}
        </p>

        <p className="mt-2">

          <strong>Status:</strong>

          <span className="text-green-600 font-semibold">

            {" "}
            {negotiation.status}

          </span>

        </p>

        <p className="mt-2">

          <strong>Impact:</strong>

          {" "}
          {negotiation.impact}

        </p>

        <p className="text-gray-500 mt-3">

          {negotiation.time}

        </p>

      </div>

    </div>
  );
}

export default NegotiationCard;