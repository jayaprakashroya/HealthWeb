from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.crud.habit import create_habit, get_habit, list_habits
from app.schemas.habit import HabitCreate, Habit

router = APIRouter()

@router.post("/", response_model=Habit)
def create(habit: HabitCreate, db: Session = Depends(get_db)):
    return create_habit(db, habit)

@router.get("/{habit_id}", response_model=Habit)
def read(habit_id: int, db: Session = Depends(get_db)):
    return get_habit(db, habit_id)

@router.get("/", response_model=list[Habit])
def read_all(db: Session = Depends(get_db)):
    return list_habits(db)
