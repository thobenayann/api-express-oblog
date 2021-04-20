  
const express = require('express');
const router = express.Router();

const categoryRouter = require('./categoryRouter');
const postRouter = require('./postRouter');

const errorController = require('../controllers/errorController');

/** CRUD */
router.use('/categories', categoryRouter);
router.use('/posts', postRouter);

router.use(errorController.error404);

// un middleware d'erreur se déclare comme les autres
// express vera la différence car il a exactement 4 paramètres déclarés
// en plus, ce sont toujours les derniers
router.use(errorController.error500);

module.exports = router;