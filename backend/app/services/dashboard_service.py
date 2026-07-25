from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.models import (
    Junction,
    Incident,
    Negotiation,
)


def get_dashboard_data(db: Session):

    junctions = db.query(Junction).all()

    incidents = db.query(Incident).all()

    negotiations = (
        db.query(Negotiation)
        .order_by(Negotiation.id.desc())
        .limit(10)
        .all()
    )

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

    pending = (
        db.query(Negotiation)
        .filter(Negotiation.status == "Pending")
        .count()
    )

    avg_load = (
        db.query(func.avg(Junction.load)).scalar() or 0
    )

    avg_speed = (
        db.query(func.avg(Junction.averageSpeed)).scalar() or 0
    )

    stats = [

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

    return {
        "junctions": junctions,
        "stats": stats,
        "incidents": incidents,
        "negotiations": negotiations,
    }