const Post = require("../model/PostModel");
const mongoose = require("mongoose");

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const tags = req.query.tags ? req.query.tags.split(",") : [];

    // Create filter conditions
    let filter = {};

    if (search) {
      const regex = new RegExp(search, "i"); // case-insensitive search
      filter.$or = [
        { title: regex },
        { message: regex },
        { creator: regex },
      ];
    }

    if (tags.length > 0) {
      filter.tags = { $in: tags };
    }

    const totalPosts = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
    });
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

// get all details  by id
exports.getAllbyId = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Fetch Error:", error.message);
    res.status(500).json({ error: "Failed to fetch post by ID" });
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
//delete a post by ID
// controllers/postController.js
exports.deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error("Delete Error:", error.message);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Liking post:", id);

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.likeCount += 1;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// comment by Id
exports.createComment = async (req, res) => {
  const { id } = req.params; // post ID
  const { text, creator } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = {
      text,
      creator,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    res.status(200).json(post.comments); // return updated comments
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// comment deleted by id

exports.deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);
    await post.save();

    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
