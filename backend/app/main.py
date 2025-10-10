from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from app.api.endpoints import auth, habits, moods, predictions, ai, daily_checkins
from app.database import engine, Base
from fastapi_limiter import FastAPILimiter
import redis.asyncio as redis
from app.core.config import settings

app = FastAPI(title="Personal Health Mood Dashboard API", version="1.0.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/", response_class=HTMLResponse)
async def root():
    return """
    <html>
        <head>
            <title>Personal Health Mood Dashboard API</title>
        </head>
        <body>
            <h1>Personal Health Mood Dashboard API</h1>
            <p>The API is running successfully.</p>
            <ul>
                <li><a href="/docs">Interactive API docs</a></li>
                <li><a href="/auth/register">Register a new user</a></li>
                <li><a href="/redoc">Alternative API docs</a></li>
            </ul>
        </body>
    </html>
    """

# Rate limiting setup (Redis on Render or local)
@app.on_event("startup")
async def startup():
    if settings.REDIS_URL:
        try:
            redis_client = redis.from_url(settings.REDIS_URL)
            await FastAPILimiter.init(redis_client)
        except Exception as e:
            print(f"Redis not available, skipping rate limiting: {e}")
    else:
        print("REDIS_URL not set, skipping rate limiting")

Base.metadata.create_all(bind=engine)

app.include_router(auth.router, prefix="/auth")
app.include_router(habits.router, prefix="/habits")
app.include_router(moods.router, prefix="/moods")
app.include_router(predictions.router, prefix="/predictions")
app.include_router(ai.router, prefix="/ai")
app.include_router(daily_checkins.router, prefix="/daily-checkins")
