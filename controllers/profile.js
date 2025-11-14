const Profile = require("../models/user")

//API's

exports.profile_index_get = async (req, res) => {
  res.render("profile/index.ejs", { Profile })
}

exports.profile_show_get = async (req, res) => {
  const profile = req.session.user._id
  res.render("profile/index.ejs", { profile })
}
