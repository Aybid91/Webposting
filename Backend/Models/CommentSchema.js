const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  commentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    index: true,
  },
  comment: { type: String, required: true },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "postModel",
    index: true,
  },
});
const CommentsModel = mongoose.model("commentsModel", CommentsSchema);

const createComment = async (values) => {
  const { comment, commentor, postId } = values;
  try {
    const data = { comment, commentor, postId };
    const commentsResp = new CommentsModel(data);
    await commentsResp.save();
    return commentsResp;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getCommentsById = async (id) => {
  try {
    const commentsResp = await CommentsModel.find({
      postId: id,
    }).populate("commentor", "name");
    return commentsResp;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  createComment,
  getCommentsById,
};
