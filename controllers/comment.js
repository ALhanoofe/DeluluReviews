const comment = require("../models/comment");
const post = require("../models/post");




exports.comment_index_get = async (req, res) => {
  const postId = req.params.postId;
  const comments = await comment.find({post: postId}).populate('postOwner');
  res.render('post/index.ejs', { comments });

}

exports.comment_create_post = async (req, res) => {
  const comment = await comment.create({
    description: req.body.description,
    postOwner: req.session.user._id,
    post: req.Params.postId
  });
  res.redirect(`/posts/${req.params.postId}`)
}

exports.comment_edit_get = async (req,res) => {
  const comment = await comment.findById(req.params.id);

  res.render('comment/edit.ejs', { comment });
}

exports.comment_update_put = async (req,res) => {
  const comment = await Comment.findById(req.params.id);
  comment.description = req.body.description;
  await comment.save();
  res.redirect(`/post/${comment.post}`);

}
