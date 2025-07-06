import React, { useState } from "react";
import Form from "./component/Form/Form";
import Posts from "./component/Posts/Posts";

import "./App.css";
import Nav from "./component/Navbar/Nav";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [currentPost, setCurrentPost] = useState(null); 
  return (
    <div className="container">
      <Nav/>
      <div className="main_container">
        <div className="grid-item">
          <Posts refresh={refresh} setCurrentPost={setCurrentPost}setRefresh={setRefresh} />
        </div>
        <div className="grid-item">
          <Form
            currentPost={currentPost}
            setCurrentPost={setCurrentPost}
            setRefresh={setRefresh}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
