const express = require('express');
const router = express.Router();
const { getPosts } = require('../controller/postController');

router.get('/', getPosts);

module.exports = router;