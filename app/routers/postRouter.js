const express = require('express');
const postsController = require('../controllers/postsController');

const router = express.Router();

router.get('/', postsController.allPosts);
router.get('/:postId(\\d+)', postsController.postById);
router.get('/category/:categoryId(\\d+)', postsController.postsByCategoryId);

module.exports = router;