from sqlalchemy import Column, Integer, String, Float, Text, Date, JSON
from app.database import Base

class DailyCheckin(Base):
    __tablename__ = "daily_checkins"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    mood = Column(String)  # emoji
    energy = Column(Float)  # 1-10 scale
    sleep_hours = Column(Float)
    stress = Column(Float)  # 1-10 scale
    activities = Column(JSON)  # array of activity strings
    notes = Column(Text)
    date = Column(Date)
    wellness_score = Column(Float)  # calculated AI score
