from pydantic import BaseModel
from typing import Optional
from datetime import date

class MoodBase(BaseModel):
    user_id: int
    mood: str
    note: Optional[str] = None
    date: date

class MoodCreate(MoodBase):
    pass

class Mood(MoodBase):
    id: int

    class Config:
        orm_mode = True
