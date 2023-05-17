const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    date: {
      type: String,
      max: 100,
    },
    numInterested:{
      type: Number,
      default: 0
    },
    time: {
      type: String,
      max: 100,
    },
    interested: [{ type: Schema.Types.ObjectId, ref: "User" }],
    eventName: {
      type: String,
      max: 100,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    // organizer: {
    //   type: String,
    // },
    // desc: {
    //   type: String,
    //   max: 500,
    // },
    img: {
      type: String,
      default: "",
    },
    // hashtags: {
    //   type: Array,
    //   default: [],
    // },
    isInterested:{
      type: Boolean
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
