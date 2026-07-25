import {
  LayoutDashboard,
  Map,
  Bot,
  AlertTriangle,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "#top" },
  { name: "Live Map", icon: Map, href: "#live-map" },
  { name: "AI Commander", icon: Bot, href: "#ai-commander" },
  { name: "AI Negotiation", icon: Bot, href: "#ai-negotiation" },
  { name: "AI Decision Timeline", icon: BarChart3, href: "#ai-decision-timeline" },
  { name: "AI Decision History", icon: BarChart3, href: "#ai-decision-history" },
  { name: "Incidents", icon: AlertTriangle, href: "#incidents" },
  { name: "Junction Registry", icon: LayoutDashboard, href: "#junction-registry" },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-700 shadow-xl h-screen fixed">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-3xl font-bold text-cyan-400">
          🚦 SignalMind
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Smart Traffic Management
        </p>

      </div>

      <nav className="mt-6">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.name}
              href={item.href}
              className="
                flex
                items-center
                gap-3
                px-6
                py-4
                hover:bg-slate-800
                cursor-pointer
                transition-all
                duration-300
                rounded-lg
                mx-3
                text-slate-200
                no-underline
              "
            >
              <Icon
                size={22}
                className="text-cyan-400"
              />

              <span className="text-slate-200 font-medium">
                {item.name}
              </span>

            </a>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;