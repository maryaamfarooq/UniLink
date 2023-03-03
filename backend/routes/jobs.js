const Post = require("../models/Job");
const router = require("express").Router();

const { 
    createJob,
    getAllJobs
    } = require('../controllers/jobs')
    
router.post('/', createJob)
router.get('/', getAllJobs)

module.exports = router