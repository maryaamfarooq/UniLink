const Event = require('../models/Event')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const createEvent = async (req, res) => {
  req.body.createdBy = req.user.userId
  console.log("req " + JSON.stringify(req.body.createdBy));
  const event = await Event.create(req.body)
  res.status(StatusCodes.CREATED).json({ event })
}

const getAllEvents = async (req, res) => {
  const events = await Event.find({});
  const currUserId = req.user.userId;
  events.forEach((event) => {
    event.numInterested = event.interested.length;
    event.isInterested = event.interested.includes(currUserId);
  });
  res.status(StatusCodes.OK).json({ events });
};

const getUserEvents = async (req, res) => {
    const currentUser = req.user.userId;
    const userEvents = await Event.find({ createdBy: currentUser });
    res.status(StatusCodes.CREATED).json({ userEvents });
};

const interestedEvent = async (req, res) => {
  const currUserId = req.user.userId;
  const eventId = req.params.id;
  const event = await Event.findById(eventId);
  //const user = await User.findById(post.createdBy);
  var numInterested = event.interested.length;
  if (!event.interested.includes(currUserId)) {
    await event.updateOne({
      $push: { interested: currUserId },
    });
    numInterested += 1;
    res.status(200).json({ numInterested, isInterested: true });
  } else {
    await event.updateOne({
      $pull: { interested: currUserId },
    });
    numInterested -= 1;
    res.status(200).json({ numInterested, isInterested: false });
  }
};

 module.exports = {
  createEvent,
  getAllEvents,
  getUserEvents,
  interestedEvent
}
