const User = require("../models/user")
const bcrypt = require("bcrypt")

exports.auth_signup_get = async (req, res) => {
  res.render("auth/sign-up.ejs")
}

exports.auth_signup_post = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (userInDatabase) {
    return res.send("username already taken")
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("password and confirm password must match")
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  if (req.file) {
    req.body.image = req.file.filename;
  }
  const user = await User.create(req.body)

  res.redirect('../views/index.ejs' + req.body.category);

}

exports.auth_signin_get = async (req, res) => {
  res.render("auth/sign-in.ejs")
}

exports.auth_signin_post = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (!userInDatabase) {
    return res.send("Login failed. please try again later")
  }

  const ValidPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  )
  if (!ValidPassword) {
    return res.send("Login failed. please try again later")
  }
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  }
  req.session.userId = userInDatabase._id;

  res.render("../views/index.ejs")
}

exports.auth_signout_get = async (req, res) => {
  req.session.destroy()
  res.redirect("/auth/sign-in")
}
