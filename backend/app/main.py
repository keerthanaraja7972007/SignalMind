from fastapi import FastAPI
from app.routes import websocket
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import Base, engine
from app.routes import tomtom
from app.database import models
import asyncio
from app.traffic_scheduler import traffic_scheduler
from app.routes import (
    stats,
    junctions,
    incidents,
    negotiations,
)
Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="SignalMind API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stats.router, prefix="/stats", tags=["Statistics"])
app.include_router(junctions.router, prefix="/junctions", tags=["Junctions"])
app.include_router(incidents.router, prefix="/incidents", tags=["Incidents"])
app.include_router(negotiations.router, prefix="/negotiations", tags=["Negotiations"])
app.include_router(
    websocket.router,
    prefix="/ws",
    tags=["WebSocket"],
)

@app.get("/")
def home():
    return {
        "message": "SignalMind Backend Running"
    }

app.include_router(
    tomtom.router,
    prefix="/tomtom",
    tags=["TomTom"],
)

@app.on_event("startup")
async def startup_event():

    asyncio.create_task(traffic_scheduler())