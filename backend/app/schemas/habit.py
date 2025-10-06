from pydantic import BaseModel
from datetime import date

class HabitBase(BaseModel):
	user_id: int
	sleep_hours: float
	meals: int
	activity_minutes: int
	date: date

class HabitCreate(HabitBase):
	pass

class Habit(HabitBase):
	id: int
	class Config:
		orm_mode = True
