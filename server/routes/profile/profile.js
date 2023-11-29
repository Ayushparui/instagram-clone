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

router.post('/follow', async (req, res) => {
    try {
        const followId = req.body.id;
        const userId = req.body.userId;
        console.log("Follow Id: ", followId);

        const followUser = await User.findById(followId);
        if(followUser.followers.includes(userId)){
            return res.status(400).json({ msg: "Already following" });
        }
        followUser.followers.push(userId);
        await followUser.save();

        const followingUser = await User.findById(userId);
        if(followingUser.following.includes(followId)){
            return res.status(400).json({ msg: "Already following" });
        }
        followingUser.following.push(followId);
        await followingUser.save();

        res.status(200).json({ msg: "User followed and following successfully" });


    } catch (error) {
        console.log(error)
    }
})


router.post('/unfollow', async (req, res) => {
    try {
        const followId = req.body.id;
        const userId = req.body.userId;

        const followUser = await User.findById(followId);
        if(!followUser.followers.includes(userId)){
            return res.status(400).json({ msg: "Not following" });
        }
        const index = followUser.followers.indexOf(userId);
        followUser.followers.splice(index, 1);
        await followUser.save();

        const followingUser = await User.findById(userId);
        if(!followingUser.following.includes(followId)){
            return res.status(400).json({ msg: "Not following" });
        }
        const index2 = followingUser.following.indexOf(followId);
        followingUser.following.splice(index2, 1);
        await followingUser.save();

        res.status(200).json({ msg: "User unfollowed and unfollowing successfully" });


    } catch (error) {
        console.log(error)
    }
})

// Add this endpoint to your server code
router.post('/checkFollow', async (req, res) => {
    try {
        const followId = req.body.id;
        const userId = req.body.userId;

        const followUser = await User.findById(followId);
        const followingUser = await User.findById(userId);

        const isFollowing = followUser.followers.includes(userId) && followingUser.following.includes(followId);

        res.status(200).json({ isFollowing });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
    }
});


router.get('/foluserposts', async (req, res) => {
    try{
        const userId = req.query.userId;
        const user = await User.findById(userId);
        const postsByFollwingUsers = user.following
        res.json({ postsByFollwingUsers }).status(200);

    }catch(error){
        console.log(error)
    }
})


// router.get('/id', async (req, res) => {
//     try {
//         const userIds = req.query.id;

//         // Attempt to parse the userIds as an array
//         let userIdsArray;
//         try {
//             userIdsArray = JSON.parse(userIds);
//         } catch (jsonError) {
//             console.error('Error parsing JSON:', jsonError);
//             res.status(400).json({ error: 'Invalid JSON format in user IDs' });
//             return;
//         }

//         const data = await User.find({ _id: { $in: userIdsArray } });
//         res.json({ data }).status(200);
//     } catch (error) {
//         console.error('Server error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });






module.exports = router;