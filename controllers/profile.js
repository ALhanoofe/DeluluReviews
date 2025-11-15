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

// exports.profile_edit_get = async (req, res) => {
//   const currentUser = await User.findById(req.session.user._id)
//   const profile = currentUser.profile.id(req.params.profileId)
//   res.render("profile/edit.ejs", { user: currentUser })
// }

// exports.profile_update_put = async (req, res) => {
//   const currentUser = await User.findById(req.session.user._id)
//   const profile = currentUser.profile.id(req.params.profileId)
//   profile.set(req.body)
//   await currentUser.save()
//   res.redirect(
//     `/users/${currentUser._id}/profile/${req.params.profileId}`
//   )
// }

exports.profile_edit_get = async (req, res) => {
  const currentUser = await User.findById(req.params.userId)
  const profile = currentUser.profile.id(req.params.profileId)
  res.render("profile/edit.ejs", { user: currentUser, profile })
}

exports.profile_update_put = async (req, res) => {
  const currentUser = await User.findById(req.session.user._id);
  const profile = currentUser.profile.id(req.params.profileId);
  profile.set(req.body);
  await currentUser.save();
  res.redirect("/profile");
}
