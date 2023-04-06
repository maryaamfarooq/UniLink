const router = require("express").Router();

const { 
    createEvent,
    getAllEvents,
    getUserEvents
    } = require('../controllers/events')
    
router.post('/', createEvent)
router.get('/', getAllEvents)
router.get('/getUserJobs', getUserEvents)

module.exports = router