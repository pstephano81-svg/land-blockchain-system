const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: String,
  caption: String,

  media: String,
  type: String,

  landId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Land"
  },

  comments: [
    {
      userId: String,
      text: String
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);

