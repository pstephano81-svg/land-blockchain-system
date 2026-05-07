const express = require("express");
const router = express.Router();
const Lost = require("../models/LostReport");

// REPORT LOST
router.post("/report", async (req, res) => {
  const r = await Lost.create(req.body);
  res.json(r);
});

// OFFICER RESPONSE
router.post("/respond/:id", async (req, res) => {
  const r = await Lost.findByIdAndUpdate(req.params.id, {
    response: req.body.response,
    status: "resolved"
  });
  res.json(r);
});

module.exports = router;
