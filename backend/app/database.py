import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pymongo import MongoClient

SQLALCHEMY_DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./test.db")

if os.environ.get("USE_MONGO", False):
    client = MongoClient(os.environ["MONGODB_URI"])
    db = client["health_mood_dashboard"]
else:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base = declarative_base()

def get_db():
    if os.environ.get("USE_MONGO"):
        yield db
    else:
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()