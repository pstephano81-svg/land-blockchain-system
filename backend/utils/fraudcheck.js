const Land = require("../models/Land");

const checkFraud = async (newLand) => {
  const existing = await Land.findOne({
    "location.latitude": newLand.latitude,
    "location.longitude": newLand.longitude
  });

  if (existing) {
    return "Possible duplicate land detected";
  }

  return "OK";
};

module.exports = checkFraud;
