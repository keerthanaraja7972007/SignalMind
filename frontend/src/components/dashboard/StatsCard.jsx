function StatsCard({
  title,
  value,
  color,
}) {
  return (
    <div
      className="
        bg-slate-800
        border
        border-slate-700
        rounded-xl
        shadow-2xl
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-cyan-500/20
      "
    >
      <h3 className="text-slate-400 text-sm font-medium">
        {title}
      </h3>

      <h1
        className={`text-4xl font-bold mt-3 ${color}`}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatsCard;