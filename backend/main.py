from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get OpenAI API key
api_key = os.getenv("OPENAI_API_KEY")

# Ensure API key is loaded
if not api_key:
    raise ValueError("OPENAI_API_KEY is missing. Check your .env file.")

# Create OpenAI client (new format for OpenAI >=1.0.0)
client = openai.OpenAI(api_key=api_key)

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any origin; change if specific frontend URL is required
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model for the API
class EmailRequest(BaseModel):
    email_text: str
    tone: str  # Options: professional, casual, support

# OpenAI Function
def generate_reply(email_text: str, tone: str) -> str:
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": f"Generate a {tone} email reply."},
                {"role": "user", "content": email_text},
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in OpenAI API call: {str(e)}")

# Root Endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to Email Reply AI"}

# API Endpoint
@app.post("/generate-reply")
def generate_email_reply(request: EmailRequest):
    try:
        reply = generate_reply(request.email_text, request.tone)
        return {"reply": reply}
    except HTTPException as e:
        return {"error": e.detail}
