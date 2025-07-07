import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import "./HomeApp.css";
import { fetchPosts } from "../../services/api";

function HomeApp() {
  const [refresh, setRefresh] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);

  // Fetch posts from backend
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetchPosts();
        setPosts(res.data.data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };

    getPosts();
  }, [refresh]);

  // Filter posts by title (live search)
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function passed to Form to handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="main_container">
      <div className="grid-item">
        <Posts
          posts={filteredPosts}
          setCurrentPost={setCurrentPost}
          setRefresh={setRefresh}
        />
      </div>
      <div className="grid-item">
        <Form
          currentPost={currentPost}
          setCurrentPost={setCurrentPost}
          setRefresh={setRefresh}
          onSearch={handleSearch} // ✅ pass onSearch
        />
      </div>
    </div>
  );
}

export default HomeApp;
