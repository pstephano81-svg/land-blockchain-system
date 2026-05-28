 const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  image: String,
  region: String,
  district: String,
  street: String,
  mpesa: String,
  halopesa: String,
  crdb: String,
  other: String,
  email: {
    type:String,
    unique:true
  },

  role: {
    type:String, 
    enum:["owner","buyer","officer","admin"],// owner, officer, buyer
    default:"owner"
  }

  

});
module.exports = mongoose.model("User", userSchema);

