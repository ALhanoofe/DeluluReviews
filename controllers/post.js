const Post = require("../models/post")

exports.Post_index_get = async (req, res) => {
  const Post = await post.find().populate("postOwner")
  res.render('/views/post/index.ejs', {Post})
};
exports.Post_create_post = async (req, res) => {
  res.render('/views/post/new.ejs')
}

