const router = require("express").Router();

const { 
  newConversation,
  allUserConversations,
  twoUsersConversation,
  getUserFriends
    } = require('../controllers/conversations')

    
router.post('/', newConversation)
router.get('/:userId', allUserConversations)
router.get('/find/:firstUserId/:secondUserId', twoUsersConversation)
router.get('/',getUserFriends);

module.exports = router
