const mongoose = require("mongoose");

const trendsSchema = new mongoose.Schema({
  name: String,
  postIds: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
});

module.exports = mongoose.model("Trend", trendsSchema);
