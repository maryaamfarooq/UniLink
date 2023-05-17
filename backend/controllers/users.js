const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res) => {
  console.log("hello")
  const user = await User.findById(req.user.userId);
  if (req.body.newPassword) {
    const isPasswordCorrect = await user.comparePassword(req.body.currentPassword);
    if(isPasswordCorrect){
      const salt = await bcrypt.genSalt(10);
      req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
    }
    else {
      return res.status(403).json({ updatedUser });
    }
  }

  req.body.password = req.body.newPassword;

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, {
    $set: req.body,
  });
  return res.status(200).json({ updatedUser });
};

  const deleteUser = async (req, res) => {
    //if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("Account has been deleted");
        } catch (err) {
          return res.status(500).json(err);
        }
      // } else {
      //   return res.status(403).json("You can delete only your account!");
      // }
  }

  const getUser = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
  
    const userfriends = [];
    for (const friendId of user.friends) {
      const Userfriend = await User.findById(friendId);
      userfriends.push(Userfriend);
    }
  
    res.status(200).json({ user, userfriends });
  };

  const getFriends = async (req, res) => {
    const user = await User.findById(req.params.id);
    const friends = await Promise.all(
      user.friends.map((friendId) => {
        return User.findById(friendId);
      })
    );
    //console.log(friends)
    let friendList = [];
    friends.map((friend) => {
      const { _id, firstName, lastName, profilePicture } = friend;
      friendList.push({ _id, firstName, lastName, profilePicture });
    });
    res.status(200).json(friendList)
}

  const followUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json("user has been followed");
          } else {
            res.status(403).json("you allready follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant follow yourself");
      }
  }

  const unfollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("user has been unfollowed");
          } else {
            res.status(403).json("you dont follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant unfollow yourself");
      }
  }

  // const searchUsers = async (req, res) => {
  //   console.log("working");
  //   const currUser = req.user.userId;
  
  //   const { firstName } = req.query;
  
  //   const queryObject = {
  //     firstName: { $regex: `^${firstName}`, $options: "i" },
  //   };
  
  //   // if (search) {
  //   // }
  
  //   console.log(queryObject);
  
  //   let result = await User.find(queryObject);
  
  //   result = result.map((user) => ({
  //     ...user.toObject(),
  //     isFriend: user.friends.includes(currUser),
  //   }));
  
  //   res.status(StatusCodes.OK).json({ result });
  // };

  const searchUsers = async (req, res) => {
    //console.log("working");
    const currUserId = req.user.userId;
    const currUser = await User.findById(req.user.userId);
  
    const { firstName, department, batch, category, city , employment } = req.query;
  
    const queryObject = {};
  
    if (firstName) {
      queryObject.firstName = { $regex: `^${firstName}`, $options: "i" };
    }
  
    if (department) {
      queryObject.department = department;
    }
  
    if (batch) {
      queryObject.batch = batch;
    }
  
    if (category) {
      queryObject.category = category;
    }
  
    if (city) {
      queryObject.city = { $regex: `^${city}`, $options: "i" };
    }
  
    if (employment) {
      queryObject.employment = { $regex: `^${employment}`, $options: "i" };
    }
  
    //console.log(queryObject);
  
    let result = await User.find(queryObject);
  
    // 0 = not friend
    // 1 = friend
    // 2 = pending
    // 3 = respond to request
  
    result = result.map((user) => {
      let mutualFriendsCount = 0;
      const isFriend = user.friends.includes(currUserId);
      let isFriendNum = 0;
  
      if (isFriend) {
        isFriendNum = 1;
        user.friends.forEach((friend) => {
          //console.log()
          if (friend !== currUserId && currUser.friends.includes(friend)) {
            mutualFriendsCount++;
          }
        });
      } 
  
      if (user.friendRequests.includes(currUserId)) {
        isFriendNum = 2;
      } 

      if (currUser.friendRequests.includes(user._id)) {
        isFriendNum = 3;
      }
  
      return {
        ...user.toObject(),
        isFriendNum,
        mutualFriendsCount,
      };
    });
  
    res.status(StatusCodes.OK).json({ result });
  };

  const respondToFriendRequest = async (req, res) =>{
    const {type} = req.body;
    const otherUserId = req.params.id;
    const currUserId = req.user.userId;
    var num = -1;
  
    const currUser = await User.findById(currUserId);
    const otherUser = await User.findById(otherUserId);
    console.log("cancel1");
  
    if(type == 'accept'){
      num = 1
      await User.findOneAndUpdate(
        { _id: currUserId },
        { $pull: { friendRequests: otherUserId }, $push: { friends: otherUserId } }
      );
    
      await User.findOneAndUpdate(
        { _id: otherUserId },
        { $push: { friends: currUserId } }
      );
    }
  
    if(type == 'reject'){
      num = 0;
      await User.findOneAndUpdate(
        { _id: currUserId },
        { $pull: { friendRequests: otherUserId } }
      );
    }

    if (type == 'cancel') {
      console.log("cancel");
      num = 0;
      await User.findOneAndUpdate(
        { _id: otherUserId },
        { $pull: { friendRequests: currUserId } }
      );
    }
  
    res.status(200).send({requestStatus: num});
  }

  const removeFriend = async (req, res) => {
    const otherUserId = req.params.id;
    const currUserId = req.user.userId;
  
    await User.findOneAndUpdate(
      { _id: currUserId },
      { $pull: { friends: otherUserId } }
    );
  
    await User.findOneAndUpdate(
      { _id: otherUserId },
      { $pull: { friends: currUserId } }
    );
  
    res.status(StatusCodes.OK).json({ requestStatus: 0 });
  };

  // const sendFriendRequest = async (req, res) => {
  //   const otherUserId = req.params.id;
  //   const currUserId = req.user.userId;
  
  //   const otherUser = await User.findById(otherUserId);
  
  //   // Check if the friend request is already sent
  //   // if (otherUser.friends.includes(currUserId)) {
  //   //   return res.status(StatusCodes.BAD_REQUEST).json({ requestStatus: 1 });
  //   // }
  
  //   // if (otherUser.friendRequests.includes(currUserId)) {
  //   //   return res.status(StatusCodes.BAD_REQUEST).json({ requestStatus: 2 });
  //   // }
  
  //   otherUser.friendRequests.push(currUserId);
  //   // await otherUser.save();
    
  
  //   res.status(StatusCodes.OK).json({ requestStatus: 2 });
  //   // 1 = friend (cannot send)
  //   // 2 = pending
  //   // 3 = sent now
  // };

  const sendFriendRequest = async (req, res) => {
    const otherUserId = req.params.id;
    const currUserId = req.user.userId;
  
    const result = await User.findByIdAndUpdate(otherUserId, {
      $addToSet: { friendRequests: currUserId },
    });
  
    res.status(StatusCodes.OK).json({ requestStatus: 2 });
    // 1 = friend (cannot sent)
    // 2 = pending
    // 3 = sent now
  };

  const showRequests = async (req, res) => {
    const currUserId = req.user.userId;
  
    const currUser = await User.findById(currUserId);
  
    const friendRequests = await Promise.all(
      currUser.friendRequests.map(async (userId) => {
        const otherUser = await User.findById(userId);
        return {
          firstName: otherUser.firstName,
          lastName: otherUser.lastName,
          profilePicture: otherUser.profilePicture,
          userInfo: otherUser,
        };
      })
    );
  
    res.send({ friendRequests });
  };

  const showNotifications = async (req, res) => {
    const currUserId = req.user.userId;
  
    const currUser = await User.findById(currUserId);
  
    var numIsNotSeen = 0;
  
    var notifications = await Promise.all(
      currUser.allNotifications.map(async (notification) => {
        console.log(notification);
        const { userId, postId, IsSeen } = notification;
        if (!IsSeen) {
          numIsNotSeen++;
        }
        const oldIsSeen = IsSeen;
        const otherUser = await User.findById(userId);
        const post = await Post.findById(postId);
        return {
          firstName: otherUser.firstName,
          lastName: otherUser.lastName,
          profilePicture: otherUser.profilePicture,
          IsSeen: oldIsSeen,
          post: post,
        };
      })
    );
  
    notifications = notifications.reverse();
  
    res.send({ notifications, numIsNotSeen });
  };

  const makeNotificationsSeen = async (req, res) => {
    const currUserId = req.user.userId;
  
    await User.updateOne(
      { _id: currUserId },
      {
        $set: {
          "allNotifications.$[notification].IsSeen": true,
        },
      },
      {
        arrayFilters: [
          {
            "notification.IsSeen": false
          }
        ]
      }
    );
  };

  const completeSignup = async (req, res) => {
  
    if (req.body.profilePicture == "") {
      req.body.profilePicture =
        "https://res.cloudinary.com/diyzgufu3/image/upload/v1680721429/defaultPic_gtn6nk.jpg";
    }
  
    if (req.body.coverPicture == "") {
      req.body.coverPicture =
        "https://e1.pxfuel.com/desktop-wallpaper/934/101/desktop-wallpaper-5-solid-gray-light-grey-plain.jpg";
    }
  
    const currUserId = req.user.userId;
    const user = await User.findByIdAndUpdate(currUserId, {
      $set: req.body,
    });
    return res.status(200).json("Profile updated");
  };

  const updateTheUser = async (req, res) => {
    const currUserId = req.user.userId;
    const user = await User.findByIdAndUpdate(
      currUserId,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({ user });
  };

  const recommendUsers = async (req, res) => {
    const currUserId = req.user.userId;
    const currUser = await User.findById(currUserId);
  
    const { department, batch } = currUser;
    const interests = currUser.interests; // Assuming `interests` is an array of strings
  
    console.log(currUser.firstName);
  
    const allUsers = await User.find({
      $and: [
        {
          $or: [
            { department: department },
            { batch: batch },
            { interests: { $in: interests } },
          ],
        },
        { _id: { $nin: currUser.friends } }, // Exclude friends from recommended users
        { _id: { $ne: currUserId } },
      ],
    });
  
    const recommendedUsers = allUsers.map((user) => {
      const userId = user._id;
      console.log(userId);
      // Define the weights for department, batch, and interests
      const weights = {
        department: 0.5,
        batch: 0.3,
        interests: 0.2,
      };
  
      // Calculate the weighted score
      const score =
        weights.department * (user.department === department ? 1 : 0) +
        weights.batch * (user.batch === batch ? 1 : 0) +
        weights.interests *
          (user.interests.filter((interest) => interests.includes(interest))
            .length /
            interests.length);
  
      return userId;
      // return { userId, score };
    });
  
    // Sort recommendedUsers based on score in descending order
    recommendedUsers.sort((a, b) => b.score - a.score);
  
    await User.updateOne(
      { _id: currUserId },
      { recommendedUsers: recommendedUsers }
    );
  
    console.log(recommendedUsers);
    res.status(StatusCodes.OK).json({ recommendedUsers });
  };

  const showRecommendedUsers = async (req, res) => {
    const user = await User.findById(req.user.userId);
    const allRecommendedUsers = await Promise.all(
    user.recommendedUsers.map(async(userId)=>{
      const user = await User.findById(userId);
      return user;
    })
    )
    const recommendedUsers = allRecommendedUsers.slice(0,3);
    res.status(StatusCodes.OK).json({ recommendedUsers });
  };
  
  module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getFriends,
  followUser,
  unfollowUser,
  searchUsers,
  sendFriendRequest,
  respondToFriendRequest,
  removeFriend,
  showRequests,
  showNotifications,
  makeNotificationsSeen,
  completeSignup,
  updateTheUser,
  recommendUsers,
  showRecommendedUsers,
  }
