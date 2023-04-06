const Post = require("../models/Post");
const router = require("express").Router();

const { 
    createPost, 
    updatePost, 
    deletePost, 
    likePost, 
    getPost, 
    getTimeline, 
    getUserPosts
    } = require('../controllers/posts')

const { 
    uploadProductImage 
    } = require('../controllers/uploadsController');
    
router.route('/').post(createPost).get(getUserPosts)
router.route("/:id").get(getPost).put(updatePost).delete(deletePost)
router.get('/', getUserPosts)
router.put('/:id/like', likePost)
router.post('/uploads', uploadProductImage)
router.get('/timeline/all', getTimeline)

module.exports = router
