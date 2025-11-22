const router = require('express').Router()
const postCtrl = require("../controllers/post.js")
const upload = require('../middleware/upload.js');


router.get('/', postCtrl.post_index_get)
router.get('/home', postCtrl.home_index_get)
router.get('/new', postCtrl.post_create_get)
router.post('/', upload.single('image'), postCtrl.post_create_post)
router.get('/:postId/edit', postCtrl.post_edit_get)
router.put('/:postId', upload.single('image'), postCtrl.post_update_put)
router.delete('/:postId', postCtrl.post_delete_delete)


module.exports = router


