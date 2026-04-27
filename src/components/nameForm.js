import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeveloperRibbon from "../components/developerRibbon.js";

export default function NameForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }
    setSubmittedName(name);
    setName("");
    localStorage.setItem("username", name);
    navigate("/overview");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // horizontal center
        alignItems: "center", // vertical center
        minHeight: "100vh", // full viewport height
        backgroundColor: "#f5f5f5", // optional: light background
      }}
    >
      <div
        style={{
          width: 300, // fixed width
          textAlign: "center",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#fff", // white card-like background
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // subtle shadow
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "92%",
              padding: "10px",
              fontSize: "16px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#1976d2",
              color: "#fff",
            }}
          >
            Submit
          </button>
        </form>

        {submittedName && (
          <p style={{ marginTop: "15px", fontWeight: 500 }}>
            Hello, {submittedName}!
          </p>
        )}
      </div>

      <DeveloperRibbon />
    </div>
  );
}
