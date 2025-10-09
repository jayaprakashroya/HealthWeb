from pydantic import BaseModel

class PredictionBase(BaseModel):
	user_id: int
	wellness_score: float
	recommendation: str

class PredictionCreate(PredictionBase):
	pass

class Prediction(PredictionBase):
	id: int
	class Config:
		from_attributes = True
