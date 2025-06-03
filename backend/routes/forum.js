const router = require('express').Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');

router.get('/', auth, async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.post('/', auth, async (req, res) => {
  const post = new Post({
    content: req.body.content,
    author: req.user.username,
  });
  await post.save();
  res.json(post);
});

router.post('/:id/like', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user.username)) {
    post.likes.push(req.user.username);
    post.dislikes = post.dislikes.filter(u => u !== req.user.username);
    await post.save();
  }
  res.json(post);
});

router.post('/:id/dislike', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.dislikes.includes(req.user.username)) {
    post.dislikes.push(req.user.username);
    post.likes = post.likes.filter(u => u !== req.user.username);
    await post.save();
  }
  res.json(post);
});

module.exports = router;