import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { fetchPostsID, deletePost, likePost } from "../../services/api";
import "./Posts.css";
import PostDetail from "../PostDetail/PostDetail";
import { useNavigate } from "react-router-dom";

const Posts = ({
  posts,
  setCurrentPost,
  setRefresh,
  page,
  setPage,
  totalPages,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); 
  const navigate = useNavigate();
  const handleEdit = async (id) => {
    try {
      setLoading(true);
      const res = await fetchPostsID(id);
      setCurrentPost(res.data);
    } catch (err) {
      console.error("Failed to fetch post by ID:", err.message);
    } finally {
      setLoading(false);
    }
  };

 const handleCardClick = (post) => {
  navigate(`/PostDetail/${post._id}`);
};

  return (
    <>
      {loading && (
        <div className="loader">
          <FaSpinner className="spinner" />
          <h3>Loading...</h3>
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="loader">
          <h3>No posts found.</h3>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <>
          <div className="posts-container">
            {posts.map((post) => (
              <div
                className="post-card"
                key={post._id}
                onClick={() => handleCardClick(post)}
              >
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
                        onClick={(e) => {
                          e.stopPropagation(); // prevent card click
                          handleEdit(post._id);
                        }}
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
                      onClick={async (e) => {
                        e.stopPropagation();
                         await likePost(post._id);
                        setRefresh((prev) => !prev);
                      }}
                    >
                      👍 LIKE {post.likeCount || 0}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={async (e) => {
                        e.stopPropagation();
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

          {/* Pagination */}
          <div className="pagination-controls">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              ◀ Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next ▶
            </button>
          </div>
        </>
      )}

      {/* 👇 Detail View */}
      {selectedPost && (
        <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
};

export default Posts;
