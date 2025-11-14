const router = require("express").Router()

const profileCtrl = require("../controllers/profile")


//Routers/ Call API's

router.get("/",profileCtrl.profile_index_get)

router.get("/:profileId",profileCtrl.profile_show_get)


module.exports = router
