const Comment = require("../models/comment");
const Post = require("../models/post");

exports.post_index_get = async (req, res) => {
  const category = req.query.category;
  let posts;
  posts = await Post.find({ category }).populate('postOwner');
  const comments = await Comment.find().populate("postOwner");
  res.render('comment/index.ejs', { posts, category });
}

exports.comment_index_get = async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findOne({_id: postId}).populate('postOwner');
  const comments = await Comment.find({post:postId}).populate('postOwner');
  res.render('comment/index.ejs', { post, comments });

}

exports.comment_create_post = async (req, res) => {
const postId = req.params.postId;

  await Comment.create({
    description: req.body.description,
    postOwner: req.session.user._id,
    post: req.params.postId
  });

  const post = await Post.findOne({_id: postId}).populate('postOwner');
  const comments = await Comment.find({post:postId}).populate('postOwner');

res.render('comment/index.ejs', { post, comments })
}
