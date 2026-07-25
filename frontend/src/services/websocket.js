let socket = null;

export function connectWebSocket(onMessage) {

  // Create and store the WebSocket
  socket = new WebSocket("ws://127.0.0.1:8000/ws/");

  socket.onopen = () => {
  console.log("🟢 WebSocket Connected");

  if (socket.readyState === WebSocket.OPEN) {
    socket.send("connected");
  }
};

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    onMessage(data);
  };

  socket.onclose = () => {
    console.log("🔴 WebSocket Disconnected");
  };

  socket.onerror = (error) => {
    console.error("WebSocket Error:", error);
  };
}

export function sendMessage(message) {
  if (
    socket &&
    socket.readyState === WebSocket.OPEN
  ) {
    socket.send(message);
  }
}