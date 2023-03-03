const User = require("../models/User");
const router = require("express").Router();

const { register, login } = require('../controllers/auth')
router.post('/register', register)
//router.get('/register', register)
router.post('/login', login);

module.exports = router
