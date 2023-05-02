const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { query, check, validationResult } = require('express-validator');


// ROUTE:1 Get all the Notes using: POST "api/notes/fecthallnotes". Login requried
router.get('/fecthallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Some error occured",
            err: err.message
        });
    }
});


// ROUTE:2 Add a new Notes using: POST "api/notes/addnotes. Login requried
router.post('/addnote', fetchuser,
    [
        check('title', "Enter valid tittle").isLength({ min: 3 }),
        check('description', "Description must be atleast 5 characters").isLength({ min: 5 }),
    ], async (req, res) => {

        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            console.log(note);
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "Some error occured",
                err: err.message
            });
        }

    });
// ROUTE:3 Updating the existing Notes using: POST "api/notes/updatenote. Login requried
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //Create a newNode object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //find the node to be updated and update it
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Some error occured",
            error: error.message
        });
    }
});

// ROUTE:4 Deleting the existing Notes using: Delete "api/notes/deletenote. Login requried
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //find the node to be delete and delete it
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id,);
        res.json({ "Success": "Note is successfully deleted", note: note });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Some error occured",
            error: error.message
        });
    }
});
module.exports = router;