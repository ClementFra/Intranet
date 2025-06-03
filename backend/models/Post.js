const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
  likes: [String],
  dislikes: [String]
});

module.exports = mongoose.model('Post', PostSchema);