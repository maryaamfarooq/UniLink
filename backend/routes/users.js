const User = require("../models/User");
const router = require("express").Router();

const {
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
  showNotifications
} = require('../controllers/users')

router.route("/:id").put(updateUser).delete(deleteUser)
router.get('/:id', getUser)
router.get("/friends/:userId", getFriends)
router.put("/:id/follow", followUser)
router.put("/:id/unfollow", unfollowUser)
router.get("/:id/getFriends", getFriends)
router.get("/", searchUsers)
router.put("/:id/sendRequest", sendFriendRequest);
router.put("/:id/respondRequest", respondToFriendRequest);
router.put("/:id/removeFriend", removeFriend);
router.get("/showRequests/all", showRequests);
router.get("/showNotifications/all", showNotifications);

module.exports = router