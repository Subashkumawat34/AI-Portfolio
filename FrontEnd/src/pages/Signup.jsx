import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "./utils";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError("All fields (Name, Email, Password) are required.");
    }
    if (password.length < 6) {
      return handleError("Password must be at least 6 characters long.");
    }

    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();

      if (result.success) {
        handleSuccess(result.message || "Signup successful! Please log in.");
        navigate("/login");
      } else {
        const errorMessage =
          result.error?.details?.[0]?.message ||
          result.message ||
          "Signup failed. Please try again.";
        handleError(errorMessage);
      }
    } catch (err) {
      console.error("Signup API error:", err);
      handleError("An error occurred during signup. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className="form-group mb-3">
          <label htmlFor="name">Full Name</label>
          <input
            className="form-control"
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            autoFocus
            placeholder="Enter your full name"
            value={signupInfo.name}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email Address</label>
          <input
            className="form-control"
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={signupInfo.email}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            placeholder="Create a password (min. 6 characters)"
            value={signupInfo.password}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Sign Up
        </button>
        <div className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
