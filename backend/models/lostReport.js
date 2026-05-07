const express = require("express");
const router = express.Router();

const LostReport = require("../models/LostReport");
const upload = require("../controllers/uploadController");


//  1. CREATE LOST TITLE REPORT (WITH IMAGE)
router.post(
  "/report",
  upload.single("image"),
  async (req, res) => {
    try {
      const report = await LostReport.create({
        userId: req.body.userId,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
        status: "pending"
      });

      res.json(report);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


//  2. GET ALL REPORTS (FOR OFFICER)
router.get("/", async (req, res) => {
  const reports = await LostReport.find().sort({ createdAt: -1 });
  res.json(reports);
});


//  3. RESPOND TO REPORT (OFFICER ACTION)
router.put("/respond/:id", async (req, res) => {
  const report = await LostReport.findByIdAndUpdate(
    req.params.id,
    {
      response: req.body.response,
      status: "resolved"
    },
    { new: true }
  );

  res.json(report);
});


module.exports = router;

