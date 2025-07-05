// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Get all posts
export const fetchPosts = () => API.get("/post/");
export const fetchPostsID = (id) => API.get(`/post/${id}`);


// Create a new post
export const createPost = (formData) =>
  API.post("/post/", formData);

//Update a Post
export const updatePost = (id, formData) =>
  API.put(`/post/${id}`, formData);

