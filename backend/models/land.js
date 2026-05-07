const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
  ownerId: String,
  titleDeed: String,
  landImage: String,
  location: {
    region: String,
    district: String,
    street: String,
    latitude: Number,
    longitude: Number
  },
  status: {
    type: String,
    default: "pending"
  },
  boundary: [
  {
    lat: Number,
    lng: Number
  }
],
area: Number

});

module.exports = mongoose.model("Land", landSchema);
