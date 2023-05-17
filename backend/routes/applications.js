const Application = require("../models/Application");
const router = require("express").Router();

const {
  createApplication,
  viewApplicants,
} = require("../controllers/applications");
router.post("/:id/createApplication", createApplication);
router.get("/:id/viewApplicants", viewApplicants);

module.exports = router;
