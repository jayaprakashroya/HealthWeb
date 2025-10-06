from sqlalchemy.orm import Session
from app.models.habit import Habit
from app.schemas.habit import HabitCreate

# Habit CRUD placeholder

def create_habit(db: Session, habit: HabitCreate):
    db_habit = Habit(**habit.dict())
    db.add(db_habit)
    db.commit()
    db.refresh(db_habit)
    return db_habit

def get_habit(db: Session, habit_id: int):
    return db.query(Habit).filter(Habit.id == habit_id).first()

def list_habits(db: Session):
    return db.query(Habit).all()
