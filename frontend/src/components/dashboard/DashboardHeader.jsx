import {
  Bell,
  Settings,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

function DashboardHeader() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 p-8 shadow-2xl text-white">

      {/* Decorative Circles */}
      <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -left-20 blur-3xl"></div>

      <div className="absolute w-72 h-72 bg-cyan-300/20 rounded-full -bottom-24 -right-20 blur-3xl"></div>

      <div className="flex justify-between items-center">

        {/* Left */}

        <div>

          <div className="flex items-center gap-4">

            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">

              🚦

            </div>

            <div>

              <h1 className="text-5xl font-extrabold tracking-wide">

                SignalMind

              </h1>

              <p className="text-lg text-blue-100 mt-2">

                AI Powered Smart Traffic Control Center

              </p>

            </div>

          </div>

          <div className="flex gap-6 mt-6">

            <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-xl flex items-center gap-3">

              <BrainCircuit size={22} />

              AI Engine Active

            </div>

            <div className="bg-green-500 px-5 py-3 rounded-xl flex items-center gap-3">

              <ShieldCheck size={22} />

              System Online

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-6">

          <div className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-3 text-center">

            <p className="text-sm">

              Live Time

            </p>

            <h2 className="font-bold text-xl">

              {time}

            </h2>

          </div>

          <button className="bg-white/20 p-4 rounded-xl hover:scale-110 transition">

            <Bell />

          </button>

          <button className="bg-white/20 p-4 rounded-xl hover:scale-110 transition">

            <Settings />

          </button>

          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">

            <img
              src="https://i.pravatar.cc/100"
              alt="admin"
              className="w-12 h-12 rounded-full border-2 border-white"
            />

            <div>

              <p className="font-bold">

                Traffic Admin

              </p>

              <p className="text-sm text-blue-100">

                Chennai HQ

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardHeader;