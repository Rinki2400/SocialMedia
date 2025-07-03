const Post = require('../model/PostModel');


// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('user', 'username');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
