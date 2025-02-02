import React, { useState } from "react";
import { generateReply } from "./api";

function App() {
  const [emailText, setEmailText] = useState("");
  const [tone, setTone] = useState("professional");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear any previous errors
    setReply(""); // Clear previous reply
    try {
      const response = await generateReply(emailText, tone);
      setReply(response);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Email Reply Generator</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="emailText">Email Text:</label>
          <textarea
            id="emailText"
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            rows="5"
            style={{ width: "100%", padding: "10px" }}
            required
          ></textarea>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="tone">Tone:</label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            style={{ padding: "5px" }}
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="support">Support</option>
          </select>
        </div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Generate Reply
        </button>
      </form>
      {reply && (
        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f9f9f9", border: "1px solid #ccc" }}>
          <h3>Generated Reply:</h3>
          <p>{reply}</p>
        </div>
      )}
      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}

export default App;
