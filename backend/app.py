from pydantic import BaseModel
import json
from prompts import SYSTEM_PROMPT
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import google.generativeai as genai
import os

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Create Gemini model
model = genai.GenerativeModel("gemini-2.5-flash")
class ReviewRequest(BaseModel):
    reviews: str

# Create FastAPI app
app = FastAPI()

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "InsightFlow AI Backend Running 🚀"
    }

@app.get("/test-ai")
def test_ai():

    prompt = "Say Hello to InsightFlow AI in one sentence."

    response = model.generate_content(prompt)

    return {
        "response": response.text
    }
@app.post("/analyze")
def analyze_reviews(data: ReviewRequest):

    prompt = f"""
{SYSTEM_PROMPT}

Customer Reviews:

{data.reviews}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    # Remove markdown if Gemini adds it
    text = text.replace("```json", "")
    text = text.replace("```", "")

    result = json.loads(text)

    return result