const express = require('express');
const postsController = require('../controllers/postsController');
const postSchema = require('../validation/schema/post');
const { validateBody } = require('../validation/validationMiddleware');

const router = express.Router();

router.get('/', postsController.allPosts);
router.get('/:postId(\\d+)', postsController.postById);
router.get('/category/:categoryId(\\d+)', postsController.postsByCategoryId);
router.post('/', validateBody(postSchema), postsController.createPost);

module.exports = router;