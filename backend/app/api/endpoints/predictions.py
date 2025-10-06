from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.crud.prediction import create_prediction, get_prediction, list_predictions
from app.schemas.prediction import PredictionCreate, Prediction

router = APIRouter()

@router.post("/", response_model=Prediction)
def create(prediction: PredictionCreate, db: Session = Depends(get_db)):
    return create_prediction(db, prediction)

@router.get("/{prediction_id}", response_model=Prediction)
def read(prediction_id: int, db: Session = Depends(get_db)):
    return get_prediction(db, prediction_id)

@router.get("/", response_model=list[Prediction])
def read_all(db: Session = Depends(get_db)):
    return list_predictions(db)
