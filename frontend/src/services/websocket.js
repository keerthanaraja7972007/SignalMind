const WS_URL = import.meta.env.VITE_WS_URL || "wss://signalmind.onrender.com/ws/";

export function connectWebSocket(onMessageCallback) {
  // Ensure string is clean before passing to WebSocket
  const cleanUrl = String(WS_URL).trim();
  const socket = new WebSocket(cleanUrl);

  socket.onopen = () => {
    console.log("🟢 WebSocket Connected to:", cleanUrl);
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessageCallback(data);
    } catch (e) {
      console.error("Error parsing WS message:", e);
    }
  };

  socket.onerror = (error) => {
    console.error("🔴 WebSocket Error:", error);
  };

  socket.onclose = () => {
    console.log("🔴 WebSocket Disconnected");
  };

  return socket;
}