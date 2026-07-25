from sqlalchemy.orm import Session
from app.database.models import Junction


def get_all_junctions(db: Session):
    return db.query(Junction).all()


def update_junction(
    db: Session,
    junction_id: int,
    load: int,
    speed: int,
    green_time: int,
):
    junction = (
        db.query(Junction)
        .filter(Junction.id == junction_id)
        .first()
    )

    if junction:

        junction.load = load
        junction.averageSpeed = speed
        junction.greenTime = green_time

        db.commit()
        db.refresh(junction)

    return junction