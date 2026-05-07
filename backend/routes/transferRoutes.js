const express = require("express");
const router = express.Router();
const Transfer = require("../models/Transfer");

// REQUEST TRANSFER
router.post("/request", async (req, res) => {
  const t = await Transfer.create(req.body);
  res.json(t);
});

// APPROVE TRANSFER (OFFICER)
router.post("/approve/:id", async (req, res) => {
  const t = await Transfer.findByIdAndUpdate(req.params.id, {
    status: "approved"
  });
  res.json(t);
});

module.exports = router;
