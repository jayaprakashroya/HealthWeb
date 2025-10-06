from sqlalchemy import Column, Integer, Float, String
from app.database import Base

class Prediction(Base):
	__tablename__ = "predictions"
	id = Column(Integer, primary_key=True, index=True)
	user_id = Column(Integer, index=True)
	wellness_score = Column(Float)
	recommendation = Column(String)
