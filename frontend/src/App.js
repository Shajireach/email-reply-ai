import React, { useState } from "react";
import "./App.css";

const generateReply = async (emailText, tone) => {
  const response = await fetch("https://your-backend-url/generate-reply", {
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
  const [isLoading, setIsLoading] = useState(false); // State for spinner

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true); // Show spinner
    try {
      const generatedReply = await generateReply(emailText, tone);
      setReply(generatedReply);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // Hide spinner
    }
  };

  return (
    <div className="App">
      <h1>Email Reply Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>Email Text:</label>
        <textarea
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
        ></textarea>
        <label>Tone:</label>
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="Professional">Professional</option>
          <option value="Casual">Casual</option>
          <option value="Support">Support</option>
        </select>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Generate Reply"}
        </button>
      </form>
      {isLoading && (
        <div>
          <p>Loading...</p>
          <div className="spinner"></div>
        </div>
      )}
      {reply && (
        <div>
          <h2>Generated Reply:</h2>
          <p>{reply}</p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}

export default App;
