const Trend = require("../models/Trend");
const Post = require('../models/Post');
const { StatusCodes } = require('http-status-codes');
const { ObjectId } = require('mongodb');


const getTrends = async (req, res) => {
  const posts = await Post.find({});
  
  const hashtagCounts = {};
  posts.forEach(post => {
    post.hashtags.forEach(hashtag => {
      if (hashtagCounts[hashtag]) {
        hashtagCounts[hashtag]++;
      } else {
        hashtagCounts[hashtag] = 1;
      }
    });
  });

  const topHashtags = Object.keys(hashtagCounts)
  .sort((a, b) => hashtagCounts[b] - hashtagCounts[a])
  .slice(0, 5);

  res.status(StatusCodes.CREATED).json({ hashtags: topHashtags });
};

 module.exports = {
  getTrends
  }