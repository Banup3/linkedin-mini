const express = require('express');
const Post = require('../models/post');
const auth = require('../middleware/authmiddleware');
const router = express.Router();

// Create Post
router.post('/', auth, async (req, res) => {
  const post = await Post.create({
    content: req.body.content,
    author: req.user.id, // 👈 FIXED
  });
  res.json(post);
});

// Get All Posts (Feed)
router.get('/', async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate('author', 'name'); // 👈 FIXED
  res.json(posts);
});

// Get Posts by User
router.get('/user/:id', async (req, res) => {
  const posts = await Post.find({ author: req.params.id }) // 👈 FIXED
    .sort({ createdAt: -1 })
    .populate('author', 'name'); // 👈 FIXED
  res.json(posts);
});

module.exports = router;
