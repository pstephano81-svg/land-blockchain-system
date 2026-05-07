const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require('bcryptjs');

// REGISTER
router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    ...req.body,
    password: hashed
  });

  res.json(user);
});

// LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.json({ message: "User not found" });

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) return res.json({ message: "Wrong password" });
  
  const token = generateToken(user-id);
 
  res.json(user-d);

});
// ADD / UPDATE PAYMENT METHODS
router.put("/payment-methods/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { paymentMethods: req.body },
    { new: true }
  );

  res.json(user);
});


module.exports = router;
