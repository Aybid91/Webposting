const express = require("express");
const { getPostById } = require("../Models/PostSchema");
const { getCommentsById } = require("../Models/CommentSchema");
const router = express.Router();
const showPost = async (req, res) => {
  try {
    const { id } = req.query;
    const post = await getPostById(id);
    const comments = await getCommentsById(id);
    res.status(200).send({ post, comments });
  } catch (error) {
    res.status(400).send(error);
  }
};
router.get("/showpost", showPost);
module.exports.publicRouter = router;
