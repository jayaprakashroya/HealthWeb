-- PostgreSQL setup placeholder

-- PostgreSQL schema for Health & Mood Dashboard
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE habits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    sleep_hours FLOAT,
    meals INTEGER,
    activity_minutes INTEGER,
    date DATE
);

CREATE TABLE moods (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    mood VARCHAR(50),
    note TEXT,
    date DATE
);

CREATE TABLE daily_checkins (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    mood VARCHAR(10),  -- emoji
    energy FLOAT,  -- 1-10 scale
    sleep_hours FLOAT,
    stress FLOAT,  -- 1-10 scale
    activities JSON,  -- array of activity strings
    notes TEXT,
    date DATE,
    wellness_score FLOAT  -- calculated AI score
);

CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    wellness_score FLOAT,
    recommendation TEXT
);
