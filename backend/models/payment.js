const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  landId: String,
  buyerId: String,
  sellerId: String,

  method: String,
  amount: Number,

  screenshot: String,

  status: { type: String, default: "pending" } // pending → confirmed → rejected

}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
