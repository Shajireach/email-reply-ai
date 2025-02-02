import React, { useState } from "react";
import "./App.css";

const generateReply = async (emailText, tone) => {
  const response = await fetch("https://email-reply-ai.onrender.com/generate-reply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email_text: emailText, tone }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await response.json();
  return data.reply;
};

function App() {
  const [emailText, setEmailText] = useState("");
  const [tone, setTone] = useState("Professional");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const generatedReply = await generateReply(emailText, tone);
      setReply(generatedReply);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Email Reply Generator
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Text:
            </label>
            <textarea
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              placeholder="Enter the email text here..."
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tone:</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Professional">Professional</option>
              <option value="Casual">Casual</option>
              <option value="Support">Support</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Generate Reply"}
          </button>
        </form>

        {isLoading && (
          <div className="flex flex-col items-center mt-6">
            <p className="text-blue-500 font-medium mb-4">Generating reply...</p>
            <div className="spinner"></div>
          </div>
        )}

        {reply && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Generated Reply:
            </h2>
            <p className="bg-gray-100 p-4 rounded-lg text-gray-700">{reply}</p>
          </div>
        )}

        {error && (
          <p className="text-red-500 font-medium text-center mt-4">
            Error: {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
