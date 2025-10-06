from sqlalchemy import Column, Integer, String, Date
from app.database import Base

class Mood(Base):
	__tablename__ = "moods"
	id = Column(Integer, primary_key=True, index=True)
	user_id = Column(Integer, index=True)
	mood = Column(String)
	note = Column(String)
	date = Column(Date)
