import { Polyline } from "react-leaflet";
import { useEffect, useState } from "react";

function ConnectionLine({ from, to }) {
  const [color, setColor] = useState("#2563eb");

  useEffect(() => {
    const interval = setInterval(() => {
      setColor((prev) =>
        prev === "#2563eb"
          ? "#22c55e"
          : "#2563eb"
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Polyline
      positions={[from, to]}
      pathOptions={{
        color: color,
        weight: 5,
        opacity: 0.9,
      }}
    />
  );
}

export default ConnectionLine;