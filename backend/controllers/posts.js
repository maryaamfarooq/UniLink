const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { StatusCodes } = require('http-status-codes');

//create a post

const createPost =  async (req, res) => {
  req.body.createdBy = req.user.userId
  const newPost = await Post.create(req.body);
  console.log("done");
  res.status(StatusCodes.CREATED).json({ newPost });
};
//update a post

const updatePost =  async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
};
//delete a post

const deletePost =  async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
//like / dislike a post

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
//get a post

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get timeline posts

const getTimeline = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserPosts = async (req, res) => {
  const currentUser = req.user.userId;
  const userPosts = await Post.find({ createdBy: currentUser });
  res.status(StatusCodes.OK).json({ userPosts })
}

module.exports = 
  { 
    createPost, 
    updatePost, 
    deletePost, 
    likePost, 
    getPost, 
    getTimeline,
    getUserPosts
  }