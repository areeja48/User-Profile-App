const express = require("express");
const router = express.Router();
const {Comments}  = require("../models");
const authenticateToken = require("../middleware/tokenValidation");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;

  // Validate the postId
  if (!postId || isNaN(postId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const comments = await Comments.findAll({ where: { postId: Number(postId) } });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error.stack);
    res.status(500).json({ error: "An error occurred while fetching comments." });
  }
});

// Route to post a comment
router.post("/", authenticateToken, async (req, res) => {
  const { postId, username, content } = req.body;

  if (!content || !postId) {
    return res.status(400).json({ error: "Post ID and content are required." });
  }

  try {
    // Create a new comment
    const comment = await Comments.create({
      postId,
      content,
      username,
      userId: req.user.id, // Access user ID from the token
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully!",
      comment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "An error occurred while adding the comment." });
  }
});

module.exports = router;
