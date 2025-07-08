import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostsID, comentcreate, deleteComment } from "../../services/api";
import "../PostDetail/PostDetails.css";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";


const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Get current user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await fetchPostsID(id);
        setPost(res.data);
      } catch (err) {
        console.error("Error loading post:", err);
      }
    };
    loadPost();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const commentData = {
        text: newComment,
        creator: user?.name || "Anonymous",
      };
      const res = await comentcreate(id, commentData);
      setPost({ ...post, comments: res.data });
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const updated = await deleteComment(id, commentId);
      setPost({ ...post, comments: updated.data });
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleEditComment = (index) => {
    setEditIndex(index);
    setEditText(post.comments[index].text);
  };

  const handleSaveEdit = () => {
    const updatedComments = [...post.comments];
    updatedComments[editIndex].text = editText;
    setPost({ ...post, comments: updatedComments });
    setEditIndex(null);
    setEditText("");
  };

  if (!post) return <h3>Loading post details...</h3>;

  return (
    <div className="post-detail">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <h2>{post.title}</h2>
      <span>
        {Math.floor(
          (Date.now() - new Date(post.createdAt)) / (1000 * 60 * 60 * 24)
        )}{" "}
        days ago
      </span>

      <div className="details_comp">
        <div className="details">
          <p>
            <span>By:</span> {post.creator}
          </p>
          <p>
            <span>Message:</span> {post.message}
          </p>
          <p>
            <span>Tags:</span> {post.tags?.join(" ,#")}
          </p>

          <hr />
        
          <div className="comments-list">
            <h4>💬 Comments</h4>
            {post.comments?.length > 0 ? (
              post.comments.map((c, index) => (
                <div key={c._id || index} className="comment-item">
                  {editIndex === index ? (
                    <>
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button onClick={handleSaveEdit}><FaSave/></button>
                      <button onClick={() => setEditIndex(null)}><FaTimes/></button>
                    </>
                  ) : (
                    <>
                      <span>
                        <strong>{c.creator}:</strong> {c.text}
                      </span>
                      <div className="comment-actions">
                        <button onClick={() => handleEditComment(index)}>
                          <FaEdit/>
                        </button>
                        <button onClick={() => handleDeleteComment(c._id)}>
                          <FaTrash/>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet.</p>
            )}

            <div className="comment-form">
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handleCommentSubmit}>Post</button>
            </div>
          </div>
        </div>

        <div className="post_img">
          <img
            src={`data:image/jpeg;base64,${post.selectedFile}`}
            alt="Post"
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
