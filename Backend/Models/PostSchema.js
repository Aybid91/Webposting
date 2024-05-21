const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  postType: { type: String, required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    index: true,
  },
});
const PostModel = mongoose.model("postModel", PostSchema);

const addPost = async (values) => {
  const { title, content, postType, authorId } = values;
  try {
    const data = { title, content, postType, authorId };
    const postResp = new PostModel(data);
    await postResp.save();
    return postResp;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getPostsByAuthorId = async (values) => {
  const { authorId, postType, page = 1 } = values;
  try {
    const postResp = await PostModel.find({
      authorId,
      ...(postType ? { postType } : {}),
    })
      //   .skip(1 * page - 1)
      //   .limit(1)
      .populate("authorId", "name email");
    return postResp;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAllPosts = async (params) => {
  const { keyword = "", limit = 0 } = params;
  console.log(9900, limit);
  const limitMaybe = limit > 0 ? limit : null;
  const keywordParams = keyword
    ? {
        $or: [
          { title: { $regex: keyword, $options: "i" } }, // Case-insensitive title match
          { content: { $regex: keyword, $options: "i" } }, // Case-insensitive content match
        ],
      }
    : {};
  try {
    // const data = { authorId };
    const postResp = await PostModel.find({
      ...keywordParams,
      postType: { $ne: "private" },
    })
      .limit(limitMaybe)
      .populate("authorId", "name");
    return postResp;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getOtherUsersPosts = async (params) => {
  const { authorId, keyword = "" } = params;
  const keywordParams = keyword
    ? {
        $or: [
          { title: { $regex: keyword, $options: "i" } }, // Case-insensitive title match
          { content: { $regex: keyword, $options: "i" } }, // Case-insensitive content match
        ],
      }
    : {};
  try {
    const postResp = await PostModel.find({
      ...keywordParams,
      authorId: { $ne: authorId },
      postType: { $ne: "private" },
    }).populate("authorId", "name");
    return postResp;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const updateAPost = async (params) => {
  const { _id, title, content, postType } = params;
  try {
    // const data = { authorId };
    const postResp = await PostModel.findById(_id).populate("authorId", "name");
    postResp.title = title;
    postResp.content = content;
    postResp.postType = postType;
    await postResp.save();
    return postResp;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getPostById = async (id) => {
  try {
    const postResp = await PostModel.findById(id).populate(
      "authorId",
      "name email"
    );

    return postResp;
  } catch (error) {
    console.log(error);
    return error;
  }
};
module.exports = {
  addPost,
  getAllPosts,
  getPostsByAuthorId,
  getOtherUsersPosts,
  updateAPost,
  getPostById,
};
