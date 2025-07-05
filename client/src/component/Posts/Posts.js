import React, { useEffect, useState } from "react";
import { fetchPosts } from "../../services/api"; // adjust path as needed
import "./Posts.css";

const Posts = ({ refresh }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    loadPosts();
  }, [refresh]);

  if (!posts.length) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div className="post-card" key={post._id}>
          <div
            className="post-image"
            style={{
              backgroundImage: `url(data:image/jpeg;base64,${post.selectedFile})`,
            }}
          >
            <div className="post-overlay">
              <div className="overlay-header">
                <h3>{post.creator}</h3>
                <button
                  className="menu-btn"
                  onClick={() => alert("Edit/Delete feature coming soon!")}
                >
                  &#8943; {/* Unicode for horizontal three dots */}
                </button>
              </div>
              <p>
                {Math.floor(
                  (Date.now() - new Date(post.createdAt)) /
                    (1000 * 60 * 60 * 24)
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
    </div>
  );
};

export default Posts;
