const WS_URL = import.meta.env.VITE_WS_URL || "wss://signalmind.onrender.com/ws/";

export function connectWebSocket(onMessageCallback) {
  const socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("🟢 WebSocket Connected to:", WS_URL);
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessageCallback(data);
    } catch (e) {
      console.error("Error parsing WebSocket message:", e);
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