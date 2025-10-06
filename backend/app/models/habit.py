from sqlalchemy import Column, Integer, Float, Date
from app.database import Base

class Habit(Base):
	__tablename__ = "habits"
	id = Column(Integer, primary_key=True, index=True)
	user_id = Column(Integer, index=True)
	sleep_hours = Column(Float)
	meals = Column(Integer)
	activity_minutes = Column(Integer)
	date = Column(Date)
