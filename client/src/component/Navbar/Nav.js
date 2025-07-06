import React from "react";
import "./Nav.css";
import { FaRegImages } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <div className="app-bar">
      <div className="brand-container">
        <h2 className="heading">Memories</h2>
        <FaRegImages className="memoimg" />
      </div>
      <div className="toolbar">
        {user ? (
          <div className="profile">
            <div className="avatarIMG">{user.name?.charAt(0) || user.email?.charAt(0)}</div>
            <span className="user-name">{user.name || user.email}</span>
            <button className="SignIn-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/auth">
            <button className="SignIn-button">
              Log In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Nav;
