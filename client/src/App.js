import React, { useState } from "react";
import Form from "./component/Form/Form";
import Posts from "./component/Posts/Posts";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [currentPost, setCurrentPost] = useState(null); // 👈 holds post to edit

  return (
    <div className="container">
      <div className="app-bar">
        <h2 className="heading">Memories</h2>
      </div>
      <div className="main_container">
        <div className="grid-item">
          <Posts refresh={refresh} setCurrentPost={setCurrentPost} />
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
