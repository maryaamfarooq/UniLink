const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const { StatusCodes } = require('http-status-codes');

//create a post

const createPost =  async (req, res) => {
  req.body.createdBy = req.user.userId
  console.log(req.body);
  const newPost = await Post.create(req.body);
  console.log(newPost);
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
  const currUserId = req.user.userId;
  const currUserFN = req.user.firstName;
  const currUserLN = req.user.lastName;
  const postId = req.params.id
  const post = await Post.findById(postId);
  const user = await User.findById(post.createdBy);
  var numLikes = post.likes.length;
  if (!post.likes.includes(currUserId)) {
    await user.updateOne({
      $push: {
        allNotifications: { postId, userId: currUserId },
        newNotifications: { postId, userId: currUserId },
      },
    });
    await post.updateOne({ $push: { likes: currUserId } });
    numLikes+=1;
    res.status(200).json({ numLikes, isLiked: true });
  } else {
    await user.updateOne({
      $pull: {
        allNotifications: { postId, userId: currUserId },
        newNotifications: { postId, userId: currUserId },
      },
    });
    await post.updateOne({ $pull: { likes: currUserId } });
    numLikes-=1;
    res.status(200).json({ numLikes, isLiked: false });
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
  //console.log("hello");
  try {
    const currentUserId = req.user.userId;
    const currentUser = await User.findById(currentUserId);

    const unsortedFriendPosts = await Promise.all(
      currentUser.friends.map((friendId) => {
        return Post.find({ createdBy: friendId }).lean();
      })
    );

    const friendPostIds = unsortedFriendPosts.flat().map((post) => post._id);

    const comments = await Comment.find({ postId: { $in: friendPostIds } });

    const friendPosts = unsortedFriendPosts
      .flat()
      .map((post) => {
        const postComments = comments.filter(
          (comment) => comment.postId.toString() === post._id.toString()
        );
        return { ...post, comments: postComments };
      })
      .sort((a, b) => b.createdAt - a.createdAt);

    res.status(StatusCodes.OK).json({ friendPosts });
  } catch (error) {
    console.error("Error retrieving timeline posts:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const getUserPosts = async (req, res) => {
  //console.log('hello')
  try {
    const currentUser = req.user.userId;
    const unsortedUserPosts = await Post.find({
      createdBy: currentUser,
    }).lean();

    const postIds = unsortedUserPosts.map((post) => post._id);

    const comments = await Comment.find({ postId: { $in: postIds } });

    const userPosts = unsortedUserPosts.map((post) => {
      const postComments = comments.filter(
        (comment) => comment.postId.toString() === post._id.toString()
      );
      return { ...post, comments: postComments };
    });

    res.status(StatusCodes.OK).json({ userPosts });
  } catch (error) {
    console.error("Error retrieving user posts:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const getOtherUserPosts = async (req, res) => {
  const otherUser = req.params.id;

  const unsortedUserPosts = await Post.find({ createdBy: otherUser });

  const userPosts = unsortedUserPosts
    .flat()
    .sort((a, b) => b.createdAt - a.createdAt);

  res.status(StatusCodes.OK).json({ userPosts });
};



module.exports = 
  { 
    createPost, 
    updatePost, 
    deletePost, 
    likePost, 
    getPost, 
    getTimeline,
    getUserPosts,
    getOtherUserPosts
  }