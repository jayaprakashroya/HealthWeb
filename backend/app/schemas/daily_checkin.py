from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class DailyCheckinBase(BaseModel):
    mood: str
    energy: float
    sleep_hours: float
    stress: float
    activities: List[str]
    notes: Optional[str] = None
    date: date

class DailyCheckinCreate(DailyCheckinBase):
    pass

class DailyCheckin(DailyCheckinBase):
    id: int
    user_id: int
    wellness_score: Optional[float] = None

    class Config:
        from_attributes = True
