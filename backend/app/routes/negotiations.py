from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependency import get_db
from app.database.models import Negotiation
from app.schemas.negotiation import NegotiationCreate

router = APIRouter()


# ---------------------------------------------------
# GET ALL NEGOTIATIONS
# ---------------------------------------------------

@router.get("/")
def get_negotiations(db: Session = Depends(get_db)):
    return db.query(Negotiation).all()


# ---------------------------------------------------
# CREATE NEW NEGOTIATION
# ---------------------------------------------------

@router.post("/")
def create_negotiation(
    negotiation: NegotiationCreate,
    db: Session = Depends(get_db)
):
    try:

        new_negotiation = Negotiation(
            fromJunction=negotiation.fromJunction,
            toJunction=negotiation.toJunction,
            request=negotiation.request,
            status=negotiation.status,
            impact=negotiation.impact,
            time=negotiation.time,
        )

        db.add(new_negotiation)
        db.commit()
        db.refresh(new_negotiation)

        return new_negotiation

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )