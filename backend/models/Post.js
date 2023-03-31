const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    desc: {
      type: String,
      max: 500,
    },
    firstName:{
      type: String,
      max: 50,
    },
    lastName:{
      type: String,
      max: 50,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    hashtags: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
