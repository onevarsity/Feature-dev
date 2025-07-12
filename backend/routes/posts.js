const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { 
  validatePost, 
  validateReaction, 
  validateComment, 
  validateCommentEdit 
} = require('../middleware/validation');

// 1. Create Post
router.post('/', validatePost, async (req, res) => {
  try {
    const { content, author } = req.body;
    

    const post = new Post({
      content,
      author,
      reactions: [],
      comments: []
    });

    await post.save();
    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Get all posts (failwall posts)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    // console.log("posts:",posts);
    res.json({
      message: 'Posts retrieved successfully',
      posts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({
      message: 'Post retrieved successfully',
      post
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Delete Post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Add reaction to post
router.post('/:id/reactions', validateReaction, async (req, res) => {
  try {
    const { type, user } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user already reacted
    const existingReaction = post.reactions.find(r => r.user === user);
    if (existingReaction) {
      existingReaction.type = type;
    } else {
      post.reactions.push({ type, user });
    }

    await post.save();
    res.json({
      message: 'Reaction added successfully',
      post
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Add comment to post
router.post('/:id/comments', validateComment, async (req, res) => {
  try {
    const { content, author } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({
      content,
      author,
      createdAt: new Date()
    });

    await post.save();
    res.json({
      message: 'Comment added successfully',
      post
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Edit comment
router.put('/:postId/comments/:commentId', validateCommentEdit, async (req, res) => {
  try {
    const { content } = req.body;

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.content = content;
    comment.editedAt = new Date();
    await post.save();

    res.json({
      message: 'Comment updated successfully',
      post
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. Delete comment
router.delete('/:postId/comments/:commentId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.remove();
    await post.save();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;