const express = require("express");
const router = express.Router();
const Land = require("../models/Land");
const upload = require("../controllers/uploadController");
// ADD LAND
router.post("/add", upload.fields([
  { name: "titleDeed" },
  { name: "landImage" }
]), async (req, res) => {
 const land = await Land.create({
    ownerId: req.body.ownerId,
    titleDeed: req.files.titleDeed[0].filename,
    landImage: req.files.landImage[0].filename,
  location:{
      region: req.body.region,
      district: req.body.district,
      street: req.body.street,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
              ...req.body,
      boundary: JSON.parse(req.body.boundary),
      area: req.body.area
    }
  });
   res.json(land);
});;
// GET ALL LANDS
router.get("/", async (req, res) => {
  const lands = await Land.find();
  res.json(lands);
});

const checkFraud = require("../utils/fraudCheck");

router.post("/add", async (req, res) => {

  const fraud = await checkFraud(req.body);

  if (fraud !== "OK") {
    return res.json({ warning: fraud });
  }

  const land = await Land.create(req.body);

  res.json(land);
});
  


// POST LAND (IMAGE + VIDEO)
router.post(
  "/",
  upload.fields([
    { name: "image" },
    { name: "video" }
  ]),
  async (req, res) => {

    const land = await Land.create({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      owner: req.body.owner,

      image: req.files.image ? req.files.image[0].filename : null,
      video: req.files.video ? req.files.video[0].filename : null
    });

    res.json(land);
  }
);


//  GET ALL LANDS
router.get("/", async (req, res) => {
  const lands = await Land.find().sort({ createdAt: -1 });
  res.json(lands);
});


//  ADD COMMENT
router.post("/comment/:id", async (req, res) => {
  const land = await Land.findById(req.params.id);

  land.comments.push({
    user: req.body.user,
    text: req.body.text
  });

  await land.save();

  res.json(land);
});


//  DELETE LAND (OWNER ONLY)
router.delete("/:id", async (req, res) => {
  await Land.findByIdAndDelete(req.params.id);
  res.json({ message: "Land deleted" });
});

module.exports = router;

