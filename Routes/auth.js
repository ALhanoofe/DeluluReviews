const router = require("express").Router()
const profile = require('../middleware/profile.js');

//auth controller
const authCtrl = require("../controllers/auth")

//Router/ Call API's

router.get("/sign-up", authCtrl.auth_signup_get)
router.post("/sign-up", profile.single('image'), authCtrl.auth_signup_post)

router.get("/sign-in", authCtrl.auth_signin_get)
router.post("/sign-in", profile.single('image'), authCtrl.auth_signin_post)

router.get("/sign-out", authCtrl.auth_signout_get)

module.exports = router
