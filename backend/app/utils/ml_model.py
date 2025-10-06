from sklearn.linear_model import LinearRegression
import numpy as np

# Sample training data for the model
X_train = np.array([
    [7, 3, 30],  # sleep_hours, meals, activity_minutes
    [6, 2, 20],
    [8, 3, 40],
    [5, 1, 10],
    [7, 3, 25]
])
y_train = np.array([80, 60, 90, 50, 75])  # wellness scores

model = LinearRegression()
model.fit(X_train, y_train)

def predict_wellness(habits):
    X = np.array([[habits['sleep_hours'], habits['meals'], habits['activity_minutes']]])
    return model.predict(X)[0]  # Return predicted wellness score
