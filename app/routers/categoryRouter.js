const express = require('express');

const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

router.get('/', categoriesController.allCategories);

module.exports = router;