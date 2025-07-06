import React from "react";
import "./Nav.css";
import { FaRegImages } from "react-icons/fa";

// Mock user object for demonstration
const user = {
  name: "Rinki Sharma",
}; // Set to null if not logged in

function Nav() {
  const handleLogout = () => {
    console.log("User logged out");
    // Clear auth tokens or state here
    // e.g., localStorage.clear(), setUser(null), etc.
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
            <div className="avatar">{user.name.charAt(0)}</div>
            <p className="user-name">{user.name}</p>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="signin-button">Log In</button>
        )}
      </div>
    </div>
  );
}

export default Nav;
