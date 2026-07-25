from fastapi import WebSocket

class ConnectionManager:

    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

        print(f"✅ Client Connected ({len(self.active_connections)})")

    def disconnect(self, websocket: WebSocket):

        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

        print(f"❌ Client Disconnected ({len(self.active_connections)})")

    async def broadcast(self, data):

        disconnected = []

        for connection in self.active_connections:

            try:
                await connection.send_json(data)

            except Exception:
                disconnected.append(connection)

        for connection in disconnected:

            if connection in self.active_connections:
                self.active_connections.remove(connection)


manager = ConnectionManager()