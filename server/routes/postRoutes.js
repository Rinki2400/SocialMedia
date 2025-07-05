const express = require("express");
const multer = require("multer");
const {
  getAllbyId,
  getPosts,
  createPosts,
  updatePostById,
  deleteById,
  likePost,
} = require("../controller/postController");

const router = express.Router();

// Setup multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Apply multer middleware ONLY on the POST route
router.get("/", getPosts);
router.get("/:id", getAllbyId);
router.post("/", upload.single("selectedFile"), createPosts);
router.put("/:id", upload.single("selectedFile"), updatePostById);
router.delete("/:id", deleteById);
router.patch("/:id/like", likePost);

module.exports = router;
