from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.database.models import Incident

router = APIRouter()


@router.get("/")
def get_incidents(db: Session = Depends(get_db)):
    return db.query(Incident).all()