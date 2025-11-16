const router = require("express").Router()

const profileCtrl = require("../controllers/profile")


//Routers/ Call API's


router.get("/:profileId",profileCtrl.profile_show_get)

router.get("/:profileId/edit", profileCtrl.profile_edit_get)

router.put("/:profileId", profileCtrl.profile_update_put)



module.exports = router
