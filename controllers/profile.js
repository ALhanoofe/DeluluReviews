const { profile } = require("express")
const User = require("../models/user")

//API's

exports.profile_index_get = async (req, res) => {
  const currentUser = await User.findById(req.session.userId)

  res.render("profile/index.ejs", { user: currentUser })
}

exports.profile_show_get = async (req, res) => {
  const currentUser = await User.findById(req.session.userId)
  res.render("profile/index.ejs", { user: currentUser })
}


exports.profile_edit_get = async (req, res) => {
  const currentUser = await User.findById(req.params.profileId)
  res.render("profile/edit.ejs", { user: currentUser })
}

exports.profile_update_put = async (req, res) => {

  const currentUser = await User.findById(req.params.profileId)
  if (req.file) {
    req.body.image = req.file.filename;
  }
  await currentPost.updateOne(req.body);
  res.redirect("/profile/index.ejs")
}




