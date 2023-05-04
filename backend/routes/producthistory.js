const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const SearchResult = require('../models/SearchHistory');
const { query, check, validationResult } = require('express-validator');


// ROUTE:1 Get all the SearchResults using: POST "api/searchhistory/fecthallsearchhistory". Login requried
router.get('/getsearchhistory', fetchuser, async (req, res) => {
    try {
        const notes = await SearchResult.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Some error occured",
            err: err.message
        });
    }
});

module.exports = router;