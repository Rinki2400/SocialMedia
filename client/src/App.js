import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./component/Navbar/Nav";
import HomeApp from "./component/Home/HomeApp";
// import Login from "./component/Auth/Login"; // create this component
// import NotFound from "./component/NotFound"; // optional: create 404 page

function App() {
  return (
    <Router>
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/" element={<HomeApp />} />
          <Route path="/auth" element={<Auth />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
