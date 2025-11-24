const Post = require("../models/post.js");

exports.post_index_get = async (req, res) => {
  const category = req.query.category;
  let posts;
  posts = await Post.find({ category }).populate('postOwner');
  res.render('post/index.ejs', { posts, category });
}
exports.home_index_get = async (req, res) => {
  const posts = await Post.find()
  res.render("/home", { posts })
}

exports.post_create_get = async (req, res) => {
  res.render('post/new.ejs');

}


exports.post_create_post = async (req, res) => {
  req.body.postOwner = req.session.user._id;
  if (req.file) {
    req.body.image = req.file.filename;
  }
  await Post.create(req.body);
  res.redirect('/post/?category=' + req.body.category);

};

exports.post_edit_get = async (req, res) => {
  const currentPost = await Post.findById(req.params.postId);
  if (!currentPost || !currentPost.postOwner.equals(req.session.user._id)) {
    return res.send("You don't have permission to edit this post.");
  }

  res.render('post/edit.ejs', { post: currentPost });
}

exports.post_update_put = async (req, res) => {
  const currentPost = await Post.findById(req.params.postId);
  if (currentPost.postOwner.equals(req.session.user._id)) {
    if (req.file) {
      req.body.image = req.file.filename;
    }
    await currentPost.updateOne(req.body);
    res.redirect('/post/?category=' + currentPost.category);
  } else {
    res.send("You don't have permission to do that.");
  }

}

exports.post_delete_delete = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (post.postOwner.equals(req.session.user._id)) {

    await post.deleteOne();
    res.redirect('/post/?category=' + post.category);
  } else {
    res.send("You don't have permission to do that.");
  }
}