import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/post/");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);

  if (!posts.length) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <>
      {posts.map((post) => (
        <div className="post-card" key={post._id}>
          <div
            className="post-image"
            style={{
              backgroundImage: `url(data:image/jpeg;base64,${post.selectedFile})`,
            }}
          >
            <div className="post-overlay">
              <h3>{post.creator}</h3>
              <p>
                {Math.floor(
                  (Date.now() - new Date(post.createdAt)) / (1000 * 60 * 60 * 24)
                )}{" "}
                days ago
              </p>
            </div>
          </div>
                
          <div className="post-body">
            <p className="tags">#{post.tags?.join(", #")}</p>
            <h4 className="message">{post.message}</h4>
            <div className="post-actions">
              <button className="like-btn">👍 LIKE 0</button>
              <button className="delete-btn">🗑 DELETE</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
