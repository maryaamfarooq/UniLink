const Post = require("../models/Job");
const router = require("express").Router();

const { 
    createJob,
    getAllJobs,
    getUserJobs
    } = require('../controllers/jobs')

const { 
    uploadProductImage 
    } = require('../controllers/uploadsController');

router.post('/', createJob)
router.get('/', getAllJobs)
router.post('/uploads', uploadProductImage)
router.get('/getUserJobs', getUserJobs)

module.exports = router
