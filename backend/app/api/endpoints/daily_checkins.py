from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import date

from app.database import get_db
from app.models.user import User
from app.schemas.daily_checkin import DailyCheckin, DailyCheckinCreate
from app.crud import daily_checkin
from app.api.deps import get_current_user

router = APIRouter()

@router.get("/", response_model=List[DailyCheckin])
def read_daily_checkins(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all daily check-ins for the current user
    """
    checkins = daily_checkin.get_daily_checkins(db, user_id=current_user.id, skip=skip, limit=limit)
    return checkins

@router.get("/{checkin_date}", response_model=DailyCheckin)
def read_daily_checkin_by_date(
    checkin_date: date,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get daily check-in for a specific date
    """
    db_checkin = daily_checkin.get_daily_checkin_by_date(db, user_id=current_user.id, checkin_date=checkin_date)
    if db_checkin is None:
        raise HTTPException(status_code=404, detail="Daily check-in not found")
    return db_checkin

@router.post("/", response_model=DailyCheckin)
def create_daily_checkin(
    daily_checkin_data: DailyCheckinCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new daily check-in
    """
    # Check if user already has a check-in for this date
    existing_checkin = daily_checkin.get_daily_checkin_by_date(
        db, user_id=current_user.id, checkin_date=daily_checkin_data.date
    )
    if existing_checkin:
        raise HTTPException(status_code=400, detail="Daily check-in already exists for this date")

    return daily_checkin.create_daily_checkin(db=db, daily_checkin=daily_checkin_data, user_id=current_user.id)
