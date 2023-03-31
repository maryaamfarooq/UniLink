const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
    },
    keywords: {
        type: Array,
        default: [],
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    jobDesc: {
      type: String,
      max: 1000,
    },
    // contactType: {
    //   type: String,
    //   enum: ['email', 'phone number', 'link', 'other'],
    //   required: true,
    // },
    contact: {
      type: Array,
      required: true,
    },
    image: {
      type: String,
    },
    // likes: {
    //   type: Array,
    //   default: [],
    // },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);