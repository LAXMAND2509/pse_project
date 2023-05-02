const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { query, check, validationResult } = require('express-validator');
const bcrpyt = require('bcryptjs');
const JWT_SECRET = 'good';
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

// ROUTE:1 Create a User using: Post "/api/auth/createUser" No login required
router.post('/createUser', [
    check('name', "Name must be atleast 5 characters").isLength({ min: 3 }),
    check('email', "Enter a valid email").isEmail(),
    check('password', "Password must be atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    //If there are errors, return BadRequest and the error message.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success,errors: errors.array() });
    }
    try {


        let user = await User.findOne({ email: req.body.email });
        // console.log(user);
        if (user) {
            success = false;
            return res.status(400).json({ errors: [{ success,msg: 'User already exists' }] });
        }
        const salt = await bcrpyt.genSalt(10);
        secPass = await bcrpyt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        // .then(user => res.json(user)).catch(err =>{ console.log(err); res.json({error:"Please enter a unique value for email",message:err.message})}); // to send the response message and has catch block.
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        // res.json(user);
        success = true;
        res.json({success, authtoken });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Some error occured",
            err: err.message
        });
    }
});

// ROUTE:2 Authenticate a user using POST 'api/auth/login' No login requiered
router.post('/login', [
    check('email', "Enter a valid email").isEmail(),
    check('password', "Password cant be blank").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let success = false;
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, errors: [{ msg: 'Please try to login with correct credentials' }] });
        }
        console.log(password, user.password);
        const passwordCompare = await bcrpyt.compare(password, user.password);
        console.log(passwordCompare);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, errors: [{ msg: 'Please try to login with correct credentials' }] });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: " Internal Server Error occured",
            err: err.message
        });
    }

})

// ROUTE:3 Get loggedin User Details using: POST "api/auth/getuser". Login requried
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user)
    }
    catch (error) {

        console.error(err.message);
        res.status(500).json({
            error: " Internal Server Error occured",
            err: err.message
        });
    }
});
module.exports = router;