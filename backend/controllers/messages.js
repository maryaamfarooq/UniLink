const Message = require("../models/Message");

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

//add

const newMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  const savedMessage = await newMessage.save();
  res.status(200).json(savedMessage);
}

//get

const getMessages = async (req, res) => {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
}

module.exports = {
  newMessage,
  getMessages
}
