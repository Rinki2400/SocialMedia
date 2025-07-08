// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Get all posts
// src/services/api.js
export const fetchPosts = (page = 1, limit = 6, search = "", tags = "") =>
  API.get(`/post?page=${page}&limit=${limit}&search=${search}&tags=${tags}`);

export const fetchPostsID = (id) => API.get(`/post/${id}`);

// Create a new post
export const createPost = (formData) => API.post("/post/", formData);

//Update a Post
export const updatePost = (id, formData) => API.put(`/post/${id}`, formData);

// delete a post
export const deletePost = (id) => API.delete(`/post/${id}`);

//increase like count by id
export const likePost = (id) => API.put(`/post/${id}/like`);

export const signIn = (formData) => API.post("/user/login", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

export const comentcreate = (id, formData) =>
  API.put(`/post/${id}/comment`, formData);

export const deleteComment = (postId, commentId) =>
  API.delete(`/post/${postId}/comments/${commentId}`);
