 const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  role: String, // owner, officer, buyer
  image: String,
  region: String,
  district: String,
  street: String,
  mpesa: String,
  halopesa: String,
  crdb: String,
  other: String

});
module.exports = mongoose.model("User", userSchema);

