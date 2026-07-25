// Pure JavaScript WebSocket Service (No JSX)

const RAW_WS = import.meta.env.VITE_WS_URL || "wss://signalmind.onrender.com/ws/";

const cleanWsUrl = (url) => {
  let cleaned = String(url).trim();
  const match = cleaned.match(/\((wss?:\/\/[^\s)]+)\)/);
  if (match) cleaned = match[1];
  return cleaned.replace(/[\[\]]/g, "");
};

const WS_URL = cleanWsUrl(RAW_WS);

export function connectWebSocket(onMessageCallback) {
  console.log("Connecting WebSocket to:", WS_URL);
  
  const socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("🟢 WebSocket Connected!");
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