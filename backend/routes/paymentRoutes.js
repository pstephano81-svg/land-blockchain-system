const express = require("express");
const router = express.Router();

const Payment = require("../models/Payment");
const upload = require("../controllers/uploadController");


// CREATE PAYMENT (UPLOAD SCREENSHOT)
router.post(
  "/",
  upload.single("screenshot"),
  async (req, res) => {

    const payment = await Payment.create({
      landId: req.body.landId,
      buyerId: req.body.buyerId,
      sellerId: req.body.sellerId,

      method: req.body.method,
      amount: req.body.amount,

      screenshot: req.file ? req.file.filename : null
    });

    res.json(payment);
  }
);


//  SELLER CONFIRM PAYMENT
router.put("/confirm/:id", async (req, res) => {
  const payment = await Payment.findByIdAndUpdate(
    req.params.id,
    { status: "confirmed" },
    { new: true }
  );

  res.json(payment);
});


//  GET PAYMENTS FOR SELLER
router.get("/seller/:id", async (req, res) => {
  const payments = await Payment.find({ sellerId: req.params.id });
  res.json(payments);
});

module.exports = router;
