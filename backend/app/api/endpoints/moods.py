from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.crud.mood import create_mood, get_mood, list_moods
from app.schemas.mood import MoodCreate, Mood

router = APIRouter()

@router.post("/", response_model=Mood)
def create(mood: MoodCreate, db: Session = Depends(get_db)):
    return create_mood(db, mood)

@router.get("/{mood_id}", response_model=Mood)
def read(mood_id: int, db: Session = Depends(get_db)):
    return get_mood(db, mood_id)

@router.get("/", response_model=list[Mood])
def read_all(db: Session = Depends(get_db)):
    return list_moods(db)
