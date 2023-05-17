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
  showNotifications,
  makeNotificationsSeen,
  completeSignup,
  updateTheUser,
  recommendUsers,
  showRecommendedUsers,
} = require('../controllers/users')

router.route("/updateUser").put(updateUser)
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
router.put("/makeNotificationsSeen/all", makeNotificationsSeen);
router.put("/signup/completeSignup", completeSignup);
router.put("/update/updateTheUser", updateTheUser);
router.get("/recommend/users", recommendUsers);
router.get("/showRecommend/users", showRecommendedUsers);

module.exports = router