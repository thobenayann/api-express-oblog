const express = require('express');
const postsController = require('../controllers/postsController');

const router = express.Router();

router.get('/', postsController.allPosts);
router.get('/:postId', postsController.postById);
router.get('/category/:categoryId', postsController.postsByCategoryId);

module.exports = router;