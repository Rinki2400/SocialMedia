import React, { useState } from "react";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";

import "./HomeApp.css";


function HomeApp() {
  const [refresh, setRefresh] = useState(false);
  const [currentPost, setCurrentPost] = useState(null); 
  return (
   
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
 
  );
}

export default HomeApp;
