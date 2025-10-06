-- Sample data for testing the Health & Mood Dashboard
-- Run this after creating the database tables

-- Insert a sample user
INSERT INTO users (username, hashed_password) VALUES
('demo_user', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeCt1uSk8pyyO2mO'); -- password: demo123

-- Insert sample habits for the last 7 days
INSERT INTO habits (user_id, sleep_hours, meals, activity_minutes, date) VALUES
(1, 7.5, 3, 45, CURRENT_DATE - INTERVAL '6 days'),
(1, 8.0, 3, 60, CURRENT_DATE - INTERVAL '5 days'),
(1, 6.5, 2, 30, CURRENT_DATE - INTERVAL '4 days'),
(1, 7.0, 3, 45, CURRENT_DATE - INTERVAL '3 days'),
(1, 8.5, 4, 75, CURRENT_DATE - INTERVAL '2 days'),
(1, 7.2, 3, 50, CURRENT_DATE - INTERVAL '1 day'),
(1, 8.0, 3, 60, CURRENT_DATE);

-- Insert sample moods for the last 7 days
INSERT INTO moods (user_id, mood, note, date) VALUES
(1, '😊', 'Feeling productive today!', CURRENT_DATE - INTERVAL '6 days'),
(1, '😐', 'Just an average day', CURRENT_DATE - INTERVAL '5 days'),
(1, '😢', 'Had a stressful meeting', CURRENT_DATE - INTERVAL '4 days'),
(1, '🙂', 'Better day after some rest', CURRENT_DATE - INTERVAL '3 days'),
(1, '😊', 'Great workout session!', CURRENT_DATE - INTERVAL '2 days'),
(1, '😕', 'Tired from late night work', CURRENT_DATE - INTERVAL '1 day'),
(1, '😊', 'Excited for the weekend', CURRENT_DATE);

-- Insert sample daily check-ins for the last 3 days
INSERT INTO daily_checkins (user_id, mood, energy, sleep_hours, stress, activities, notes, date, wellness_score) VALUES
(1, '😊', 8.0, 7.5, 3.0, '["Exercise", "Reading", "Work"]', 'Had a productive morning workout and finished an important project.', CURRENT_DATE - INTERVAL '2 days', 8.2),
(1, '😕', 6.0, 6.5, 6.0, '["Work", "Socializing"]', 'Long day at work, feeling a bit drained but good to connect with friends.', CURRENT_DATE - INTERVAL '1 day', 6.1),
(1, '😊', 9.0, 8.0, 2.0, '["Exercise", "Meditation", "Hobbies"]', 'Amazing day! Morning run, meditation session, and worked on personal projects.', CURRENT_DATE, 9.3);

-- Insert sample predictions
INSERT INTO predictions (user_id, wellness_score, recommendation) VALUES
(1, 8.2, 'Your energy levels are high! Consider maintaining your exercise routine and sleep schedule.'),
(1, 6.1, 'You seem a bit stressed. Try incorporating short meditation breaks during your workday.'),
(1, 9.3, 'Excellent wellness score! You are doing great with your habits. Keep up the good work!');
