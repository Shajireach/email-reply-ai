import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get OpenAI API key from .env
api_key = os.getenv("OPENAI_API_KEY")

# Ensure API key is loaded
if not api_key:
    print("Error: OPENAI_API_KEY is missing. Check your .env file.")
    exit()

# Create an OpenAI client (required in new versions)
client = openai.OpenAI(api_key=api_key)

try:
    # New format using client.chat.completions.create (latest API format)
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": "Say hello!"}]
    )

    print("✅ OpenAI Response:", response.choices[0].message.content)

except Exception as e:
    print("❌ Error in OpenAI API call:", e)
