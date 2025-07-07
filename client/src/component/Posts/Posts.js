import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import {
  fetchPosts,
  fetchPostsID,
  deletePost,
  likePost,
} from "../../services/api";
import "./Posts.css";

const Posts = ({ refresh, setCurrentPost, setRefresh }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const response = await fetchPosts(page, 6);
        const fetchedPosts = response?.data?.data || [];
        const total = response?.data?.totalPages || 1;

        setPosts(Array.isArray(fetchedPosts) ? fetchedPosts : []);
        setTotalPages(total);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [refresh, page]);

  const handleEdit = async (id) => {
    try {
      const res = await fetchPostsID(id);
      setCurrentPost(res.data);
    } catch (err) {
      console.error("Failed to fetch post by ID:", err.message);
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <FaSpinner className="spinner" />
        <h3>Loading...</h3>
        <style>{`
          .spinner {
            font-size: 1.5rem;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!loading && posts.length === 0) {
    return <div className="loader"><h3>No posts found.</h3></div>;
  }

  return (
    <div>
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
                  <button className="menu-btn" onClick={() => handleEdit(post._id)}>
                    &#8943;
                  </button>
                </div>
                <p>
                  {Math.floor((Date.now() - new Date(post.createdAt)) / (1000 * 60 * 60 * 24))} days ago
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
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          ◀ Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default Posts;
