const express = require("express");
const router = express.Router();
const upload = require("../controllers/uploadController");
const Post = require("../models/Postpage");


// CREATE POST

router.post("/", upload.single("media"), async (req, res) => {

  const post = await Post.create({
    userId: req.body.userId,
    caption: req.body.caption,
    media: req.file.filename,
    type: req.file.mimetype.startsWith("video") ? "video" : "image",
    landId: req.body.landId   
  });

  res.json(post);
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});


//  ADD COMMENT
router.post("/comment/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  post.comments.push({
    userId: req.body.userId,
    text: req.body.text
  });

  await post.save();

  res.json(post);
});


//  DELETE POST
router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
});
router.get("/", async (req, res) => {
  const posts = await Post.find()
    .populate("landId") 
    .sort({ createdAt: -1 });

  res.json(posts);
});
router.post("/buy", async (req, res) => {
  try{
const land = await Land.findById(req.body.landId);

if (land.status === "sold") {
  return res.json({ message: "Land already sold" });
}
land.status="sold";
await land.save();
res.json({message:"land purchased  successfully "});
}catch (error){
res.status(500).json({error:error.message});
}
});
module.exports = router;
