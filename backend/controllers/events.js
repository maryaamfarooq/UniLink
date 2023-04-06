const Event = require('../models/Event')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const createEvent = async (req, res) => {
  req.body.createdBy = req.user.userId
  //console.log(req);
  const event = await Event.create(req.body)
  res.status(StatusCodes.CREATED).json({ event })
}

const getAllEvents = async (req, res) => {
  const events = await Event.find({})
  res.status(StatusCodes.OK).json({ events })
}

const getUserEvents = async (req, res) => {
    const currentUser = req.user.userId;
    const userEvents = await Event.find({ createdBy: currentUser });
    res.status(StatusCodes.CREATED).json({ userEvents });
};

 module.exports = {
  createEvent,
  getAllEvents,
  getUserEvents
}
