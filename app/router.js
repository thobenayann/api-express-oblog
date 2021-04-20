  
const express = require('express');
const router = express.Router();

/** CRUD List */

/** MW 404, toujours en dernier */
router.use((req, res) => {
    res.status(404).json({error: "not found"});
});

module.exports = router;