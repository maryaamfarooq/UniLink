const Trend = require("../models/Trend");
const router = require("express").Router();

const {
  getTrends
} = require('../controllers/trends')

router.get('/', getTrends)

module.exports = router