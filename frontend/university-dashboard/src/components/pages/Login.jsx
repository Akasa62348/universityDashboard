import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login successful!");
        navigate("/dashboard"); // Replace with your actual route
      } else {
        alert(result.error || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error during login.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        {/* Left Side Image */}
        <div className="login-image">
          <img
            src="https://img.freepik.com/free-photo/happy-college-students-with-books-hands-walking-together-campus_8353-6400.jpg"
            alt="Campus"
          />
        </div>

        {/* Right Side Form */}
        <div className="login-form">
          <h2>Welcome Back!</h2>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="checkbox-row">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="submit">Sign In</button>
          </form>

          <div className="social-login">
            <span>Sign in with</span>
            <div className="social-icons">
              <button className="facebook">F</button>
              <button className="google">G</button>
              <button className="twitter">T</button>
            </div>
          </div>

          <p className="signup">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
