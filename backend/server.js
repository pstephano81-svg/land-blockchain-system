const express = require("express");
const cors = require("cors");
const connectDB= require("./config/db");
const userRoutes = require("./routes/userRoutes");
const landRoutes = require("./routes/landRoutes");
const mongoose= require("mongoose");
const transferRoutes = require("./routes/transferRoutes");
const lostReportRoutes = require("./routes/lostRepportRoutes");
const officerRoutes = require("./routes/officerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const postpageRoutes = require("./routes/postpageRoutes");

const app = express();
// connect database
connectDB();
// middlewares
app.use(cors());
app.use(express.json());
// static folder (uploads)
app.use("/uploads", express.static("uploads"));
// routes
app.use("/api/users", userRoutes);
app.use("/api/lands", landRoutes);
app.use("/api/transfer", transferRoutes);
app.use("-/api/lost", lostReportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/posts", postpageRoutes);


// test route
app.get("/", (req, res) => {
  res.send("Server running...");
});

// start serveronsole.log("Server running on port 5000");
app.listen(5000, () => {
  console.log("Server running on port 5000");
});