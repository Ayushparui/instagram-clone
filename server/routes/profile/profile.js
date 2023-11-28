const jwt = require('jsonwebtoken');
const config = require('../../utils/config');
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}


router.get('/instagram', authenticate, async (req, res) => {
    try {
        res.json({ user: req.user.user }).status(200);
     
    } catch (error) {
        console.log(error)
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Assuming you are using a mongoose model for MongoDB
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If the user is found, send the user data in the response
        res.json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


router.get('/allusers', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users }).status(200);
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;