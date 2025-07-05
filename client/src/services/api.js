// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Get all posts
export const fetchPosts = () => API.get("/post/");

// Create a new post
export const createPost = (formData) =>
  API.post("/post/", formData);

