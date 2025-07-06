import React, { useState } from "react";
import "./Auth.css";
import { FaLock } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../services/api";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

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

      let userData;
      if (data.token) {
        const decoded = jwtDecode(data.token);
        userData = {
          name: decoded.name || formData.name,
          email: decoded.email || formData.email,
          token: data.token,
        };
      } else {
        userData = {
          name: data.name || formData.name,
          email: data.email || formData.email,
        };
      }

      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    } catch (error) {
      console.error("Auth error:", error.response?.data || error.message);
      alert("Authentication failed. Check your credentials.");
    }
  };

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const userData = res.data;

        localStorage.setItem("user", JSON.stringify({
          name: userData.name,
          email: userData.email,
          googleId: userData.sub,
          picture: userData.picture,
        }));

        navigate("/");
      } catch (err) {
        console.error("Google Login Error:", err);
        alert("Google Login Failed.");
      }
    },
    onError: () => {
      alert("Google Login Failed.");
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="avataricon">
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

        <button className="google-auth-button" onClick={() => googleLogin()}>
          Sign In with Google
        </button>

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
