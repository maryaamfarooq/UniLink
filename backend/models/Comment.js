const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    postId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      max: 300,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    profilePicture: {
      type: String,
      max: 500,
    },
    username: {
      type: String,
      max: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);