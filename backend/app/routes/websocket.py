from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from sqlalchemy.orm import Session

import asyncio

from app.websocket.manager import manager

from app.database.database import SessionLocal

from app.services.dashboard_service import get_dashboard_data

router = APIRouter()


@router.websocket("/")
async def websocket_endpoint(websocket: WebSocket):

    await manager.connect(websocket)

    db: Session = SessionLocal()

    try:

        while True:

            dashboard = get_dashboard_data(db)

            await manager.broadcast(dashboard)

            await asyncio.sleep(2)

    except WebSocketDisconnect:

        manager.disconnect(websocket)

    finally:

        db.close()