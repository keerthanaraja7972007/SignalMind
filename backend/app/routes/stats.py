from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.session import get_db
from app.database.models import Junction, Negotiation

router = APIRouter()


@router.get("/")
def get_stats(db: Session = Depends(get_db)):

    approved = (
        db.query(Negotiation)
        .filter(Negotiation.status == "Approved")
        .count()
    )

    rejected = (
        db.query(Negotiation)
        .filter(Negotiation.status == "Rejected")
        .count()
    )

    avg_load = db.query(
        func.avg(Junction.load)
    ).scalar() or 0

    avg_speed = db.query(
        func.avg(Junction.averageSpeed)
    ).scalar() or 0

    return [

        {
            "id": 1,
            "title": "Traffic Load",
            "value": f"{int(avg_load)}%",
            "color": "text-red-400",
        },

        {
            "id": 2,
            "title": "Average Speed",
            "value": f"{int(avg_speed)} km/h",
            "color": "text-green-400",
        },

        {
            "id": 3,
            "title": "Approved Decisions",
            "value": approved,
            "color": "text-cyan-400",
        },

        {
            "id": 4,
            "title": "Rejected Decisions",
            "value": rejected,
            "color": "text-yellow-400",
        },

    ]