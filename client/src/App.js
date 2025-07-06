import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Nav from "./component/Navbar/Nav";
import HomeApp from "./component/Home/HomeApp";
import Auth from "./component/Auth/Auth";

// ✅ Custom Protected Route Component
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <Router>
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomeApp />
              </PrivateRoute>
            }
          />
          {/* You can add more private routes here */}
          {/* <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
