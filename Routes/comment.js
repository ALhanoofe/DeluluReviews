const router = require('express').Router();
const commentCtrl = require("../controllers/comment");


router.get('/:postId', commentCtrl.comment_index_get)
router.post('/:postId/create', commentCtrl.comment_create_post)
router.get('/comment/:id/edit', commentCtrl.comment_edit_get)
router.put('/comment/:id', commentCtrl.comment_update_put)











module.exports = router
