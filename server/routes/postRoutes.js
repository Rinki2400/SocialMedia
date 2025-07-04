const express = require('express');
const multer = require('multer');
const { getPosts, createPosts } = require('../controller/postController');

const router = express.Router();

// Setup multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Apply multer middleware ONLY on the POST route
router.get('/', getPosts);
router.post('/', upload.single("selectedFile"), createPosts);  // ✅ fixed

module.exports = router;
