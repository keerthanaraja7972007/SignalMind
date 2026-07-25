import { useContext } from "react";
import { TrafficContext } from "../../context/TrafficContext";

function AIPerformance() {

  const { decisionHistory = [] } = useContext(TrafficContext);

  const approved =
    decisionHistory.filter(
      d => d.status === "Approved"
    ).length;

  const rejected =
    decisionHistory.filter(
      d => d.status === "Rejected"
    ).length;

  const total = decisionHistory.length;

  const successRate =
    total === 0
      ? 0
      : ((approved / total) * 100).toFixed(1);

  // Fake response time for demo
  const avgResponse =
    (
      0.8 +
      Math.random() * 0.6
    ).toFixed(2);

  // Fake AI confidence
  const confidence =
    (
      95 +
      Math.random() * 4
    ).toFixed(1);

  return (

<div className="rounded-3xl bg-slate-800 border border-slate-700 p-8 shadow-xl">

<h2 className="text-3xl font-bold text-white mb-8">
🧠 AI Performance Analytics
</h2>

<div className="grid grid-cols-3 gap-6">

<div className="bg-slate-900 rounded-2xl p-6">

<p className="text-slate-400">
Approved Decisions
</p>

<h1 className="text-5xl text-green-400 font-bold mt-3">
{approved}
</h1>

</div>

<div className="bg-slate-900 rounded-2xl p-6">

<p className="text-slate-400">
Rejected Decisions
</p>

<h1 className="text-5xl text-red-400 font-bold mt-3">
{rejected}
</h1>

</div>

<div className="bg-slate-900 rounded-2xl p-6">

<p className="text-slate-400">
Success Rate
</p>

<h1 className="text-5xl text-cyan-400 font-bold mt-3">
{successRate}%
</h1>

</div>

<div className="bg-slate-900 rounded-2xl p-6">

<p className="text-slate-400">
Avg Response
</p>

<h1 className="text-5xl text-blue-400 font-bold mt-3">
{avgResponse}s
</h1>

</div>

<div className="bg-slate-900 rounded-2xl p-6">

<p className="text-slate-400">
AI Confidence
</p>

<h1 className="text-5xl text-yellow-400 font-bold mt-3">
{confidence}%
</h1>

</div>

<div className="bg-slate-900 rounded-2xl p-6">

<p className="text-slate-400">
Total Decisions
</p>

<h1 className="text-5xl text-purple-400 font-bold mt-3">
{total}
</h1>

</div>

</div>

</div>

  );

}

export default AIPerformance;