import React from "react";
import "./Nav.css";
import { FaRegImages } from "react-icons/fa";
import { Link } from "react-router-dom";
// Mock user object for demonstration
const user = null // Set to null if not logged in

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
            {/* <p className="user-name">{user.name}</p> */}
           <Link to="/auth">
          <button className="SignIn-button">
            Sign In
          </button>
        </Link>
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
