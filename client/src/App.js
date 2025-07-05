import "./App.css";
import memories from "./assets/24af27424e0f0b1d83d00c182b5eaa9d.jpg";
import Form from "./component/Form/Form";
import Posts from "./component/Posts/Posts";
import { useState } from "react";

function App() {
  const [refreshPosts, setRefreshPosts] = useState(0);

  const handlePostSuccess = () => {
    setRefreshPosts((prev) => prev + 1); // Trigger post refresh
  };

  return (
    <div className="container">
      <div className="app-bar">
        <h2 className="heading">Memories</h2>
        <img src={memories} alt="memories" className="memoimg" />
      </div>
      <div className="main_container">
        <div className="grid-item">
          <Posts refresh={refreshPosts} />
        </div>
        <div className="grid-item">
          <Form onPostSuccess={handlePostSuccess} />
        </div>
      </div>
    </div>
  );
}

export default App;
