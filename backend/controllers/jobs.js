const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  //console.log(req);
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({})
  res.status(StatusCodes.OK).json({ jobs })
}

const getUserJobs = async (req, res) => {
  const currentUser = req.user.userId;
  const userJobs = await Job.find({ createdBy: currentUser }).sort('createdAt');
  res.status(StatusCodes.CREATED).json({ userJobs });
};

 module.exports = {
  createJob,
  getAllJobs,
  getUserJobs
}
