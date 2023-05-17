const router = require("express").Router();

const { 
    createEvent,
    getAllEvents,
    getUserEvents,
    interestedEvent
    } = require('../controllers/events')
    
router.post('/', createEvent)
router.get('/', getAllEvents)
router.get('/getUserJobs', getUserEvents)
router.put("/:id/interestedEvent", interestedEvent);

module.exports = router