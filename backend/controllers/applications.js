const Application = require("../models/Application");
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const createApplication = async (req, res) => {
  console.log("hello");
  req.body.createdBy = req.user.userId;
  const jobId = req.params.id;
  const job = await Job.findById(jobId);
  //console.log(req);
  const application = await Application.create(req.body);
  const applicationId = application._id;
  await job.updateOne({
    $push: {
      applications: applicationId.toString(),
    },
  });
  res.status(StatusCodes.CREATED).json({ application });
};

 const viewApplicants = async (req, res) => {
  //console.log("hello");
  const jobId = req.params.id;
  const job = await Job.findById(jobId);

  const applications = await Promise.all(
    job.applications.map((applicationId) => {
      return Application.findById(applicationId);
    })
  );

  res.status(StatusCodes.CREATED).json({ applications });
 };

module.exports = {
  createApplication,
  viewApplicants,
};
