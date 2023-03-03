const Post = require("../models/Post");
const router = require("express").Router();

const { 
    createPost, 
    updatePost, 
    deletePost, 
    likePost, 
    getPost, 
    getTimeline 
    } = require('../controllers/posts')

const { 
    uploadProductImage 
    } = require('../controllers/uploadsController');

router.route('/uploads').post(uploadProductImage);
    
router.post('/', createPost)
router.route("/:id").get(getPost).put(updatePost).delete(deletePost)
router.put('/:id/like', likePost)
router.get('/timeline/all', getTimeline)

module.exports = router
