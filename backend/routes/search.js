// routes/search.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');

router.get('/', async (req, res) => {
  const query = req.query.q;
  try {
    const users = await User.find({
      name: { $regex: query, $options: 'i' }
    }).limit(5).select('name email _id');

    const posts = await Post.find({
      content: { $regex: query, $options: 'i' }
    }).limit(5).populate('author', 'name');

    res.json({ users, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed' });
  }
});


module.exports = router;
