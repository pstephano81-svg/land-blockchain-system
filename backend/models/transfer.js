const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  landId: String,
  buyerId: String,

  ownerId: String,

  from: String,
  to: String,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Transfer", transferSchema);