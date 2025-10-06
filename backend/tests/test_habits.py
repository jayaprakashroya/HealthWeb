import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_habit_creation():
    # First, register a user
    response = client.post("/auth/register", json={"username": "testuser", "password": "testpass"})
    assert response.status_code == 200

    # Then, login to get token
    response = client.post("/auth/login", data={"username": "testuser", "password": "testpass"})
    assert response.status_code == 200
    token = response.json()["access_token"]

    # Now, create a habit
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post("/habits/", json={
        "sleep_hours": 8.0,
        "meals": 3,
        "activity_minutes": 60,
        "date": "2023-01-01"
    }, headers=headers)
    assert response.status_code == 200
    habit = response.json()
    assert habit["sleep_hours"] == 8.0
    assert habit["meals"] == 3
    assert habit["activity_minutes"] == 60
