from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependency import get_db
from app.database.models import Junction

router = APIRouter()


# --------------------------------------------------
# GET ALL JUNCTIONS
# --------------------------------------------------

@router.get("/")
def get_junctions(db: Session = Depends(get_db)):
    return db.query(Junction).all()


# --------------------------------------------------
# UPDATE JUNCTION
# --------------------------------------------------

@router.put("/{junction_id}")
def update_junction(
    junction_id: int,
    load: int,
    averageSpeed: int,
    greenTime: int,
    db: Session = Depends(get_db),
):

    junction = (
        db.query(Junction)
        .filter(Junction.id == junction_id)
        .first()
    )

    if junction is None:
        raise HTTPException(
            status_code=404,
            detail="Junction not found"
        )

    junction.load = load
    junction.averageSpeed = averageSpeed
    junction.greenTime = greenTime

    db.commit()
    db.refresh(junction)

    return junction