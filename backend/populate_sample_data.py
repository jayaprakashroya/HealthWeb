#!/usr/bin/env python3
"""
Script to populate the database with sample data for testing the Health & Mood Dashboard.
Run this after setting up the database tables.
"""

import sys
import os
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.database import SessionLocal, engine
from app.models.user import User
from app.models.habit import Habit
from app.models.mood import Mood
from app.models.daily_checkin import DailyCheckin
from app.models.prediction import Prediction
from app.utils.encryption import get_password_hash

def create_sample_data():
    """Create sample data for testing"""

    # Create database session
    db = SessionLocal()

    try:
        # Check if sample user already exists
        existing_user = db.query(User).filter(User.username == "demo_user").first()
        if existing_user:
            print("Sample user already exists. Skipping data creation.")
            return

        # Create sample user
        hashed_password = get_password_hash("demo123")
        demo_user = User(username="demo_user", hashed_password=hashed_password)
        db.add(demo_user)
        db.commit()
        db.refresh(demo_user)
        print(f"Created sample user: {demo_user.username}")

        # Create sample habits for the last 7 days
        today = datetime.now().date()
        habits_data = [
            (7.5, 3, 45, today - timedelta(days=6)),
            (8.0, 3, 60, today - timedelta(days=5)),
            (6.5, 2, 30, today - timedelta(days=4)),
            (7.0, 3, 45, today - timedelta(days=3)),
            (8.5, 4, 75, today - timedelta(days=2)),
            (7.2, 3, 50, today - timedelta(days=1)),
            (8.0, 3, 60, today),
        ]

        for sleep, meals, activity, date in habits_data:
            habit = Habit(
                user_id=demo_user.id,
                sleep_hours=sleep,
                meals=meals,
                activity_minutes=activity,
                date=date
            )
            db.add(habit)

        print("Created sample habits data")

        # Create sample moods for the last 7 days
        moods_data = [
            ("😊", "Feeling productive today!", today - timedelta(days=6)),
            ("😐", "Just an average day", today - timedelta(days=5)),
            ("😢", "Had a stressful meeting", today - timedelta(days=4)),
            ("🙂", "Better day after some rest", today - timedelta(days=3)),
            ("😊", "Great workout session!", today - timedelta(days=2)),
            ("😕", "Tired from late night work", today - timedelta(days=1)),
            ("😊", "Excited for the weekend", today),
        ]

        for mood_emoji, note, date in moods_data:
            mood = Mood(
                user_id=demo_user.id,
                mood=mood_emoji,
                note=note,
                date=date
            )
            db.add(mood)

        print("Created sample moods data")

        # Create sample daily check-ins for the last 3 days
        checkins_data = [
            ("😊", 8.0, 7.5, 3.0, ["Exercise", "Reading", "Work"],
             "Had a productive morning workout and finished an important project.",
             today - timedelta(days=2), 8.2),
            ("😕", 6.0, 6.5, 6.0, ["Work", "Socializing"],
             "Long day at work, feeling a bit drained but good to connect with friends.",
             today - timedelta(days=1), 6.1),
            ("😊", 9.0, 8.0, 2.0, ["Exercise", "Meditation", "Hobbies"],
             "Amazing day! Morning run, meditation session, and worked on personal projects.",
             today, 9.3),
        ]

        for mood_emoji, energy, sleep, stress, activities, notes, date, score in checkins_data:
            checkin = DailyCheckin(
                user_id=demo_user.id,
                mood=mood_emoji,
                energy=energy,
                sleep_hours=sleep,
                stress=stress,
                activities=activities,
                notes=notes,
                date=date,
                wellness_score=score
            )
            db.add(checkin)

        print("Created sample daily check-ins data")

        # Create sample predictions
        predictions_data = [
            (8.2, "Your energy levels are high! Consider maintaining your exercise routine and sleep schedule."),
            (6.1, "You seem a bit stressed. Try incorporating short meditation breaks during your workday."),
            (9.3, "Excellent wellness score! You are doing great with your habits. Keep up the good work!"),
        ]

        for score, recommendation in predictions_data:
            prediction = Prediction(
                user_id=demo_user.id,
                wellness_score=score,
                recommendation=recommendation
            )
            db.add(prediction)

        print("Created sample predictions data")

        # Commit all changes
        db.commit()
        print("\n✅ Sample data created successfully!")
        print("\nLogin credentials:")
        print("Username: demo_user")
        print("Password: demo123")
        print("\nYou can now test the dashboard with this sample data.")

    except Exception as e:
        print(f"Error creating sample data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Populating database with sample data...")
    create_sample_data()
