const BASE_URL = "https://email-reply-ai.onrender.com";

export async function generateReply(emailText, tone) {
  try {
    const response = await fetch(`${BASE_URL}/generate-reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_text: emailText,
        tone: tone,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error: ${error.detail || "Unknown error"}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
