const router = require("express").Router();

const { 
    sendEmail
    } = require('../controllers/SendEmail')
    
router.post('/', sendEmail)

module.exports = router