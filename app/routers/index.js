  
const express = require('express');
const router = express.Router();

const categoryRouter = require('./categoryRouter');
const postRouter = require('./postRouter');

const errorController = require('../controllers/errorController');

/** CRUD */
router.use('/categories', categoryRouter);
router.use('/posts', postRouter);

router.use(errorController.error404);

module.exports = router;