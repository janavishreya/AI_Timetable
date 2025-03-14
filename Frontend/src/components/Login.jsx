import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      setLoading(false);
  
      if (response.ok) {
        console.log("✅ Login successful:", data);
        
        // Pass only the user data, not username/password
        onLogin(data.user);
      } else {
        console.error("❌ Login failed:", data);
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("🔥 Server Error:", err);
      setLoading(false);
      setError("Server error. Try again later.");
    }
  };
  

  return (
    <div id="login-container" className="container">
      <h1>University Management System</h1>
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
