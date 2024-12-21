const express = require('express');
const router = express.Router();
const {Post } = require('../models');  // Import Post model from the models directory

if (!Post) {
  console.error("Post model is undefined. Check your model import/export.");
} else {
  console.log("Post model successfully imported:", Post);
}

router.use(express.json());

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "An error occurred while fetching posts." });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const { title, username, content } = req.body;

  if (!title || !content || !username) {
    return res.status(400).json({ error: "Title, username,  content are required." });
  }

  try {
    const newPost = await Post.create({ 
      title : title, 
      username : username,
      content : content});
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "An error occurred while creating the post." });
  }
});

module.exports = router;
