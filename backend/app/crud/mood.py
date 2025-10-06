from sqlalchemy.orm import Session
from app.models.mood import Mood
from app.schemas.mood import MoodCreate

def create_mood(db: Session, mood: MoodCreate):
    db_mood = Mood(**mood.dict())
    db.add(db_mood)
    db.commit()
    db.refresh(db_mood)
    return db_mood

def get_mood(db: Session, mood_id: int):
    return db.query(Mood).filter(Mood.id == mood_id).first()

def list_moods(db: Session):
    return db.query(Mood).all()
