const router = require('express').Router();
const commentCtrl = require("../controllers/comment");

router.get('/', commentCtrl.post_index_get)
router.get('/:postId', commentCtrl.comment_index_get)
router.post('/:postId/create', commentCtrl.comment_create_post)

module.exports = router
