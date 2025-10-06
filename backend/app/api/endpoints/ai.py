from fastapi import APIRouter, HTTPException
import openai
import os
from tenacity import retry, stop_after_attempt, wait_fixed

router = APIRouter()

openai.api_key = os.environ.get("OPENAI_API_KEY")

@retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
def get_recommendation(wellness_score):
    if not openai.api_key:
        raise HTTPException(status_code=400, detail="Missing OpenAI key; fallback used.")
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": f"Recommend based on wellness score {wellness_score}"}]
        )
        return response.choices[0].message.content
    except Exception:
        return "Fallback: Get more sleep!"

@router.get("/recommendation/{wellness_score}")
async def recommendation(wellness_score: int):
    return {"recommendation": get_recommendation(wellness_score)}
