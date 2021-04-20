  
const express = require('express');
const router = express.Router();

/** CRUD List */
router.get('/');
router.get('/:postId');
router.get('/category/:categoryId');


/** MW 404, toujours en dernier */
router.use((req, res) => {
    res.status(404).json({error: "not found"});
});

module.exports = router;