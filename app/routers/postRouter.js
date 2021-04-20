const express = require('express');

const router = express.Router();

router.get('/', postsController.allPosts);
router.get('/:postId');
router.get('/category/:categoryId');

module.exports = router;