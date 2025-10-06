from sqlalchemy.orm import Session
from app.models.daily_checkin import DailyCheckin
from app.schemas.daily_checkin import DailyCheckinCreate
from datetime import date

def get_daily_checkins(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(DailyCheckin).filter(DailyCheckin.user_id == user_id).offset(skip).limit(limit).all()

def get_daily_checkin_by_date(db: Session, user_id: int, checkin_date: date):
    return db.query(DailyCheckin).filter(
        DailyCheckin.user_id == user_id,
        DailyCheckin.date == checkin_date
    ).first()

def create_daily_checkin(db: Session, daily_checkin: DailyCheckinCreate, user_id: int):
    # Calculate wellness score based on the data
    wellness_score = calculate_wellness_score(daily_checkin)

    db_daily_checkin = DailyCheckin(
        user_id=user_id,
        mood=daily_checkin.mood,
        energy=daily_checkin.energy,
        sleep_hours=daily_checkin.sleep_hours,
        stress=daily_checkin.stress,
        activities=daily_checkin.activities,
        notes=daily_checkin.notes,
        date=daily_checkin.date,
        wellness_score=wellness_score
    )
    db.add(db_daily_checkin)
    db.commit()
    db.refresh(db_daily_checkin)
    return db_daily_checkin

def calculate_wellness_score(daily_checkin: DailyCheckinCreate) -> float:
    """
    Calculate AI wellness score based on daily check-in data
    Formula: Weighted average of mood, energy, sleep, and stress
    """
    # Convert mood emoji to numeric value (simplified)
    mood_score = 5.0  # Default neutral

    # Energy and stress are already 1-10 scales
    energy_score = daily_checkin.energy
    stress_score = 11 - daily_checkin.stress  # Invert stress (lower stress = higher score)

    # Sleep score (optimal 7-9 hours)
    if 7 <= daily_checkin.sleep_hours <= 9:
        sleep_score = 10.0
    elif 6 <= daily_checkin.sleep_hours < 7 or 9 < daily_checkin.sleep_hours <= 10:
        sleep_score = 7.0
    else:
        sleep_score = 5.0

    # Weighted calculation
    weights = {
        'mood': 0.3,
        'energy': 0.25,
        'sleep': 0.25,
        'stress': 0.2
    }

    total_score = (
        mood_score * weights['mood'] +
        energy_score * weights['energy'] +
        sleep_score * weights['sleep'] +
        stress_score * weights['stress']
    )

    return round(total_score, 1)
