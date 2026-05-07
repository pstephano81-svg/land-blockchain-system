const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Land = require("../models/Land");
const Transfer = require("../models/Transfer");

router.get("/stats", async (req, res) => {
  const users = await User.countDocuments();
  const lands = await Land.countDocuments();
  const transfers = await Transfer.countDocuments();

  res.json({
    users,
    lands,
    transfers
  });
});

module.exports = router;
