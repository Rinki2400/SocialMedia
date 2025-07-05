const Post = require("../model/PostModel");
const mongoose = require("mongoose");

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPosts = async (req, res) => {
  try {
    const { creator, title, message, tags } = req.body;
    const selectedFile = req.file ? req.file.buffer.toString("base64") : "";
    const newPost = new Post({
      creator,
      title,
      message,
      tags,
      selectedFile,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error saving post:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updatePostById = async (req, res) => {
  const { id } = req.params;
  try {
    const { creator, title, message, tags } = req.body;
    const selectedFile = req.file
      ? req.file.buffer.toString("base64")
      : undefined;

    const updateData = {
      creator,
      title,
      message,
      tags: tags?.split(","),
    };

    if (selectedFile) {
      updateData.selectedFile = selectedFile;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(500).json({ error: "Failed to update post" });
  }
};
