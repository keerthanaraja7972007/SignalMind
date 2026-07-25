import { useContext } from "react";
import { TrafficContext } from "../context/TrafficContext";

import StatsCard from "../components/dashboard/StatsCard";
import LiveMap from "../components/map/LiveMap";
import NegotiationFeed from "../components/ai/NegotiationFeed";
import DecisionTimeline from "../components/ai/DecisionTimeline";
import JunctionTable from "../components/dashboard/JunctionTable";
import TrafficCharts from "../components/dashboard/TrafficCharts";
import EmergencyVehicles from "../components/dashboard/EmergencyVehicles";
import DecisionHistory from "../components/ai/DecisionHistory";

import NegotiationsList from '../components/NegotiationsList';

function Dashboard() {
  const { stats, decisionLogs } =
    useContext(TrafficContext);

  return (
    <div id="top" className="relative overflow-hidden p-8 bg-slate-900 min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-16 left-10 w-3 h-3 rounded-full bg-cyan-400/40 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-4 h-4 rounded-full bg-emerald-400/30 animate-bounce"></div>
        <div className="absolute top-72 left-1/2 w-2 h-2 rounded-full bg-violet-400/30 animate-ping"></div>
        <div className="absolute bottom-32 left-20 w-5 h-5 rounded-full bg-sky-400/20 animate-pulse"></div>
        <div className="absolute bottom-20 right-24 w-3 h-3 rounded-full bg-cyan-300/30 animate-bounce"></div>
        <div className="absolute bottom-10 left-3/4 w-4 h-4 rounded-full bg-emerald-300/25 animate-pulse"></div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((item) => (
          <StatsCard
            key={item.id}
            title={item.title}
            value={item.value}
            color={item.color}
          />
        ))}
      </div>

      {/* Live Map */}
      <div id="live-map" className="mt-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-8">

        <h2 className="text-2xl font-bold text-slate-100 mb-4">
          🗺 Live Traffic Map
        </h2>

        <LiveMap />

      </div>

      {/* Backend Negotiations List */}
      <div id="backend-negotiations" className="mt-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-8 text-slate-100">
        <NegotiationsList />
      </div>

      {/* AI Negotiation Feed */}
      <div id="ai-negotiation" className="mt-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-8">

        <h2 className="text-2xl font-bold text-slate-100 mb-6">
          🤖 AI Negotiation Feed
        </h2>

        <NegotiationFeed />

      </div>

      {/* Traffic Analytics */}
      <div className="mt-8">
        <TrafficCharts />
      </div>

      {/* AI Decision Timeline */}
      <div id="ai-decision-timeline" className="mt-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-8">

        <h2 className="text-2xl font-bold text-slate-100 mb-6">
          🧠 AI Decision Timeline
        </h2>

        <DecisionTimeline logs={decisionLogs} />

      </div>

      {/* AI Decision History */}
      <div id="ai-decision-history" className="mt-8">
        <DecisionHistory />
      </div>

      {/* Junction Table */}
      <div id="junction-registry" className="mt-8">
        <JunctionTable />
      </div>

    </div>
  );
}

export default Dashboard;