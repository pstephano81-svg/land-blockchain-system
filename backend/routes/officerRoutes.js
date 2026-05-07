const express =require("express");
const router=express.Router();
const Land = require("../models/Land");
const { contract, web3 } = require("../contracts");
//  VERIFY LAND (DATABASE + BLOCKCHAIN)
router.post("/verify/:id", async (req, res) => {
  try {
    // 1. GET ACCOUNT (GANACHE)
    const accounts = await web3.eth.getAccounts();

    // 2. VERIFY ON BLOCKCHAIN
    await contract.methods
      .verifyLand(req.params.id)
      .send({ from: accounts[0] });

    // 3. UPDATE DATABASE
    const land = await Land.findByIdAndUpdate(
      req.params.id,
      { status: "verified" },
      { new: true }
    );

    res.json({
      message: "Land verified on blockchain",
      land
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// APPROVE TRANSFER
router.post("/transfer/approve/:id", async (req, res) => {
  const transfer = await Transfer.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json(transfer);
});

// RESPOND LOST TITLE
router.post("/lost/respond/:id", async (req, res) => {
  const report = await LostReport.findByIdAndUpdate(req.params.id, {
    response: req.body.response,
    status: "resolved"
  });
  res.json(report);
});


module.exports = router;
