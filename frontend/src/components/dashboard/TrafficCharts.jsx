import { useContext, useEffect, useState } from "react";
import { TrafficContext } from "../../context/TrafficContext";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

function TrafficCharts() {
  const { junctions } = useContext(TrafficContext);
  const [trafficData, setTrafficData] = useState([]);

  // Update chart data whenever junctions change (auto-refresh)
  useEffect(() => {
    const updatedData = junctions.map((junction) => ({
      name: junction.name,
      load: junction.load,
      speed: junction.averageSpeed,
    }));
    setTrafficData(updatedData);
  }, [junctions]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

      {/* Traffic Load */}

      <div className="rounded-3xl bg-slate-800 border border-slate-700 shadow-xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          🚦 Traffic Load
        </h2>

        <ResponsiveContainer width="100%" height={400}>

          <BarChart data={trafficData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>

            <XAxis
              dataKey="name"
              stroke="#cbd5e1"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke="#cbd5e1"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "12px",
                color: "#fff",
              }}
              labelStyle={{ color: "#fff" }}
            />

            <Bar
              dataKey="load"
              fill="#38bdf8"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Average Speed */}

      <div className="rounded-3xl bg-slate-800 border border-slate-700 shadow-xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          🚗 Average Speed
        </h2>

        <ResponsiveContainer width="100%" height={400}>

          <LineChart data={trafficData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>

            <XAxis
              dataKey="name"
              stroke="#cbd5e1"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke="#cbd5e1"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "12px",
                color: "#fff",
              }}
              labelStyle={{ color: "#fff" }}
            />

            <Line
              type="monotone"
              dataKey="speed"
              stroke="#22d3ee"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default TrafficCharts;