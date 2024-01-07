const express = require("express");
const { getUserById } = require("./../Models/UserSchema");
const { verifyToken } = require("../Middlewares/middlewares");
const {
  addPost,
  getPostsByAuthorId,
  getAllPosts,
  getOtherUsersPosts,
  updateAPost,
} = require("../Models/PostSchema");
const { verifyjwtSign } = require("../api/jwtHandler");
const { createComment } = require("../Models/CommentSchema");
const router = express.Router();
const getUser = async (req, res) => {
  try {
    const id = req.body.user.id;
    const user = await getUserById(id);
    const finalObj = { name: user.name, _id: user._id, email: user.email };
    return res.status(200).send(finalObj);
  } catch (error) {
    console.log(error);
    return res.status(403).send(error);
  }
};
const addAPost = async (req, res) => {
  try {
    const {
      title,
      content,
      postType,
      user: { id },
    } = req.body;
    const post = await addPost({ title, content, postType, authorId: id });
    return res.status(200).send(post);
  } catch (error) {
    console.log(error);
    return res.status(403).send(error);
  }
};
const getCurrentUserPosts = async (req, res) => {
  try {
    const {
      user: { id },
    } = req.body;
    const { postType, page = 1 } = req.query;
    const post = await getPostsByAuthorId({ authorId: id, postType, page });
    return res.status(200).send(post);
  } catch (error) {
    console.log(error);
    return res.status(403).send(error);
  }
};
const getFeed = async (req, res) => {
  try {
    const cookies = req.cookies;
    const authPresent = !!cookies.authtoken;
    let dbCall = getAllPosts;
    let apiParams = req.body;
    if (authPresent) {
      const authicatedUser = verifyjwtSign(cookies.authtoken);
      const currentUserId = authicatedUser.user.id;
      if (currentUserId) {
        dbCall = getOtherUsersPosts;
        apiParams = { ...apiParams, authorId: currentUserId };
      }
    }
    const allPosts = await dbCall(apiParams);
    return res.status(200).send(allPosts);
  } catch (error) {
    console.log(error);
    return res.status(403).send(error);
  }
};
const updatePost = async (req, res) => {
  try {
    const updatedPost = await updateAPost(req.body);
    return res.status(200).send(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(403).send(error);
  }
};
const addComment = async (req, res) => {
  try {
    const comment = await createComment(req.body);
    return res.status(200).send(comment);
  } catch (error) {
    console.log(error);
    return res.status(403).send(error);
  }
};
router.post("/addComment", verifyToken, addComment);
router.get("/getUser", verifyToken, getUser);
router.post("/addPost", verifyToken, addAPost);
router.get("/getCurrentUserPosts", verifyToken, getCurrentUserPosts);
router.post("/feed", getFeed);
router.patch("/updatepost", verifyToken, updatePost);
module.exports.profileRouter = router;
