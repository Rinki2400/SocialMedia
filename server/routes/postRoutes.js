const express = require('express');
const router = express.Router();
const { getPosts,createPosts } = require('../controller/postController');

router.get('/', getPosts);
router.post('/', createPosts);

module.exports = router;