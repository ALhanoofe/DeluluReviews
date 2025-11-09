const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    enum: ["book", "movie", "drama"],
  },
  releaseDate: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  Image: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  postOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cast: {
    type: String,
  },
  type: {
    type: String,
    required: true,
    enum: ["fiction", "non-fiction", "thriller", "romance", "sci-fi", "fantasy", "biography", "history", "self-help", "health", "horror", "comedy", "action", "drama", "documentary", "animation"]
  }

})

const Post = mongoose.model("Post", postSchema)
module.exports = Post
