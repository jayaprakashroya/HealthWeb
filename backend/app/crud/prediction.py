from sqlalchemy.orm import Session
# Prediction CRUD placeholder
from app.models.prediction import Prediction
from app.schemas.prediction import PredictionCreate

def create_prediction(db: Session, prediction: PredictionCreate):
	db_prediction = Prediction(**prediction.dict())
	db.add(db_prediction)
	db.commit()
	db.refresh(db_prediction)
	return db_prediction

def get_prediction(db: Session, prediction_id: int):
	return db.query(Prediction).filter(Prediction.id == prediction_id).first()

def list_predictions(db: Session):
	return db.query(Prediction).all()
