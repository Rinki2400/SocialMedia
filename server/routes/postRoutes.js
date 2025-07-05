const express = require('express');
const multer = require('multer');
const { getPosts, createPosts,updatePostById } = require('../controller/postController');

const router = express.Router();

// Setup multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Apply multer middleware ONLY on the POST route
router.get('/', getPosts);
router.post('/', upload.single("selectedFile"), createPosts);  
router.put('/:id',upload.single("selectedFile"),updatePostById);  

module.exports = router;
