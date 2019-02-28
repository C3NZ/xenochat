const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const maxAge = 60 * 24 * 60 * 60 * 1000;

// Sign up route
router.post('/signup', async (req, res, next) => {
    const user = new User(req.body);
    
    try {
        const savedUser = await user.save();
        const token = jwt.sign({ 
            _id: savedUser._id, 
            username: user.username,
        }, process.env.SECRET, {
            expiresIn: '60 days',
        });

        // What to send the user for storage
        const xenoUser = {
            username: user.username,
            _id: savedUser._id,
            token
        }

        return res.json(xenoUser);
    } catch(err){
        next(err);
    }
});

module.exports = router;
