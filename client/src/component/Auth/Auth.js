import React, { useState } from "react";
import "./Auth.css";
import { jwtDecode } from "jwt-decode";
import { FaLock } from "react-icons/fa";
import { signIn, signUp } from "../../services/api";
import { GoogleLogin } from "@react-oauth/google";
function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      (isSignUp && (!formData.name || !formData.confirmPassword))
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = isSignUp
        ? await signUp({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          })
        : await signIn({
            email: formData.email,
            password: formData.password,
          });

      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      alert(`${isSignUp ? "Signed up" : "Logged in"} successfully!`);
    } catch (error) {
      console.error("Auth error:", error.response?.data || error.message);
      alert(" Authentication failed. Check your credentials.");
    }
  };

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  
  const googleSuccess = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      const userData = {
        name: decoded.name,
        email: decoded.email,
        googleId: decoded.sub,
        picture: decoded.picture,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      alert("Google Sign-In Successful!");
      // navigate("/");
    } catch (err) {
      console.error("Google Login Error:", err);
      alert(" Google Login Failed.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="avatar">
          <FaLock className="lock-icon" />
        </div>
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="auth-input"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
          />
          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="auth-input"
            />
          )}
          <button type="submit" className="auth-button">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

            {/* Google Login Button */}
        <div className="google-login">
          <GoogleLogin onSuccess={googleSuccess} onError={() => alert("Login Failed")} />
        </div> 

        <p className="switch-text">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span className="switch-link" onClick={switchMode}>
            {isSignUp ? " Sign In" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
