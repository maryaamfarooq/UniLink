const router = require("express").Router();

const { 
  newMessage,
  getMessages
    } = require('../controllers/messages')

    
router.post('/', newMessage)
router.get('/:conversationId', getMessages)

module.exports = router
