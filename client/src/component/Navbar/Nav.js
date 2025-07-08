import React, { useState } from "react";
import "./Nav.css";
import { FaRegImages } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
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
            <div className="avatarIMG" onClick={togglePopup}>
              {user.name?.charAt(0) || user.email?.charAt(0)}
            </div>
            <span className="user-name">{user.name || user.email}</span>
            <button className="SignIn-button" onClick={handleLogout}>
              Logout
            </button>

            {/* POPUP COMPONENT */}
            {showPopup && (
              <div className="popup">
                <div className="popup-content">
                  <h4>User Details</h4>
                  <p><strong>Name:</strong> {user.name || "N/A"}</p>
                  <p><strong>Email:</strong> {user.email || "N/A"}</p>
                  <p><strong>Password:</strong> ********</p>
                  <button className="close-btn" onClick={togglePopup}>Close</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth"></Link>
        )}
      </div>
    </div>
  );
}

export default Nav;
