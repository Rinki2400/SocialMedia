import React, { useEffect, useState } from "react";
import {
  fetchPosts,
  fetchPostsID,
  deletePost,
  likePost,
} from "../../services/api";
import "./Posts.css";

const Posts = ({ refresh, setCurrentPost, setRefresh }) => {
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

  // Edit handler: fetch post by ID and pass it to setCurrentPost
  const handleEdit = async (id) => {
    try {
      const res = await fetchPostsID(id);
      setCurrentPost(res.data); // This will prefill the form in Form.js
    } catch (err) {
      console.error("Failed to fetch post by ID:", err.message);
    }
  };

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
                  onClick={() => handleEdit(post._id)}
                  title="Edit"
                >
                  &#8943;
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
            <h4 className="title">{post.title}</h4>
            <h5 className="message">{post.message}</h5>
            <div className="post-actions">
              <button
                className="like-btn"
                onClick={async () => {
                  const res = await likePost(post._id);
                  setPosts((prevPosts) =>
                    prevPosts.map((p) =>
                      p._id === post._id
                        ? { ...p, likeCount: res.data.likeCount }
                        : p
                    )
                  );
                }}
              >
                👍 LIKE {post.likeCount || 0}
              </button>

              <button
                className="delete-btn"
                onClick={async () => {
                  console.log("Deleting post ID:", post._id);
                  await deletePost(post._id);
                  setRefresh((prev) => !prev);
                }}
              >
                🗑 DELETE
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
