import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostsID } from "../../services/api";
import "../PostDetail/PostDetails.css";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

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

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    const updatedPost = {
      ...post,
      comments: [...(post.comments || []), newComment],
    };
    setPost(updatedPost);
    setNewComment("");
  };

  const handleDeleteComment = (index) => {
    const updatedComments = post.comments.filter((_, i) => i !== index);
    setPost({ ...post, comments: updatedComments });
  };

  const handleEditComment = (index) => {
    setEditIndex(index);
    setEditText(post.comments[index]);
  };

  const handleSaveEdit = () => {
    const updatedComments = [...post.comments];
    updatedComments[editIndex] = editText;
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
          <p><span>By:</span> {post.creator}</p>
          <p><span>Message:</span> {post.message}</p>
          <p><span>Tags:</span> {post.tags?.join(" ,#")}</p>

          <hr />
         <p> Realtime Chat</p>
          <hr />

          <div className="comments-list">
            <h4>💬 Comments</h4>
            {post.comments?.length > 0 ? (
              post.comments.map((c, index) => (
                <div key={index} className="comment-item">
                  {editIndex === index ? (
                    <>
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button onClick={handleSaveEdit}>💾</button>
                      <button onClick={() => setEditIndex(null)}>❌</button>
                    </>
                  ) : (
                    <>
                      <span>{c}</span>
                      <div className="comment-actions">
                        <button onClick={() => handleEditComment(index)}>✏️</button>
                        <button onClick={() => handleDeleteComment(index)}>🗑️</button>
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
          <img src={`data:image/jpeg;base64,${post.selectedFile}`} alt="Post" />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
