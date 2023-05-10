const Comment = require("../models/Comment");
const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const createComment = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const postId = req.params.id;

  const comment = await Comment.create(req.body);
  const post = await Post.findByIdAndUpdate(
    postId,
    { $push: { comments: comment._id.toString() } },
    { new: true }
  );

  const comments = await Promise.all(
    post.toObject().comments.map((commentId) => {
      return Comment.findById(commentId).lean();
    })
  );

  res.status(StatusCodes.CREATED).json({ comments });
};

const getComments = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);

  const comments = await Promise.all(
    post.comments.map(async (commentId) => {
      const comment = await Comment.findById(commentId);
      return comment;
    })
  );

  res.status(StatusCodes.OK).json({ comments });
};

module.exports = {
  createComment,
  getComments,
};