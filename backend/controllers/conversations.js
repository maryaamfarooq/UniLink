const Conversation = require("../models/Conversation");
const User = require('../models/User')

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

//new conv

const getUserFriends = async (req, res) => {
    const currentUserId = req.user.userId;
    const currentUser = await User.find({ _id: currentUserId});

    const friendsList = await Promise.all(
      currentUser[0].friends.map((friendId) => {
        return User.find({ _id: friendId });
      })
    );

    res.status(StatusCodes.CREATED).json({ friendsList });
}

const newConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  const savedConversation = await newConversation.save();
  res.status(200).json(savedConversation);
};

//get conv of a user

const allUserConversations = ("/:userId", async (req, res) => {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
});

// get conv includes two userId

const twoUsersConversation = ("/find/:firstUserId/:secondUserId", async (req, res) => {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
});

 module.exports = {
  newConversation,
  allUserConversations,
  twoUsersConversation,
  getUserFriends
}
